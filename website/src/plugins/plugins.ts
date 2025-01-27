import { visit } from "unist-util-visit";
import fs from "fs";
import grayMatter from "gray-matter";

const processedFiles = new Set();

const addAnotations = () => (tree: any, file: any) => {
  visit(tree, (node) => {
    if (node.properties && node.properties.annotation) {
      try {
        const annotation = JSON.parse(node.properties.annotation);

        Object.keys(annotation).forEach((key) => {
          node.properties[key] = annotation[key];
        });

        delete node.properties.annotation;
      } catch (err) {
        console.error(
          "Failed to parse annotation:",
          node.properties.annotation,
        );
      }
    }
  });
};

const addFrontmatter = () => (_tree: any, file: any) => {
  const content = file.value;
  const { data } = grayMatter(content);

  console.log("Page data: ", data);

  file.data = {
    ...file.data,
    frontmatter: data,
  };
};

function generateJson(options = {}) {
  // @ts-ignore
  const { outputFile = "page-data.json" } = options;

  // @ts-ignore
  return (tree, file) => {
    const filePath = file.history[0];
    if (processedFiles.has(filePath)) return;
    processedFiles.add(filePath);

    // Initialize the page object with frontmatter data
    const page = {
      name:
        file.data.frontmatter?.title === "Solid Notifications"
          ? "Introduction"
          : file.data.frontmatter?.title || "Unknown",
      url: file.data.frontmatter?.slug || "/",
      description: file.data.frontmatter?.description || "",
      tags: file.data.frontmatter?.tags || [],
      items: [],
    };

    const itemsStack = [page.items];

    visit(tree, "element", (node) => {
      if (node.properties?.["data-nav"]) {
        const item = {
          name: node.children
            .filter((child: any) => child.type === "text")
            .map((child: any) => child.value)
            .join(" "),
          hash: `#${node.properties.id}`,
          items: [],
        };

        if (node.properties["data-nav"] === "link") {
          // Add to root-level items
          // @ts-ignore
          itemsStack[0].push(item);
          // Push new item for sublinks
          itemsStack.unshift(item.items);
        } else if (node.properties["data-nav"] === "sublink") {
          // Add to the current sublink stack
          // @ts-ignore
          itemsStack[0].push(item);
        }
      }
    });

    // Load existing navigation or initialize as an array
    let navigation = [];
    if (fs.existsSync(outputFile)) {
      navigation = JSON.parse(fs.readFileSync(outputFile, "utf-8"));
    }

    // Check if a page with the same name exists and replace it, otherwise push the new page
    const existingIndex = navigation.findIndex(
      (item: any) => item.name === page.name,
    );
    if (existingIndex !== -1) {
      // Replace the existing page
      navigation[existingIndex] = page;
    } else {
      // Push the new page
      navigation.push(page);
    }

    // Write the updated navigation array to the specified file
    fs.writeFileSync(outputFile, JSON.stringify(navigation, null, 2), "utf-8");
  };
}

export { addAnotations, addFrontmatter, generateJson };
