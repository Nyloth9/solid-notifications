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
  const { outputFile = "./src/page-data.json" } = options;

  // @ts-ignore
  return (tree, file) => {
    const filePath = file.history[0];
    if (processedFiles.has(filePath)) return;
    processedFiles.add(filePath);

    if (file.data.frontmatter?.title === "404") return;

    // Initialize the page object with frontmatter data
    const page = {
      name:
        file.data.frontmatter?.title === "Solid Notifications"
          ? "Introduction"
          : file.data.frontmatter?.title || "Unknown",
      url: file.data.frontmatter?.slug || "/",
      description: file.data.frontmatter?.description || "",
      order: file.data.frontmatter?.order ?? Infinity,
      tags: file.data.frontmatter?.tags || [],
      items: [],
    };

    // @ts-ignore
    let lastLink = null; // Tracks the most recent "link" item

    visit(tree, "element", (node) => {
      if (node.properties?.["data-nav"]) {
        const item = {
          name: node.children
            // @ts-ignore
            .filter((child) => child.type === "text")
            // @ts-ignore
            .map((child) => child.value)
            .join(" "),
          hash: `#${node.properties.id}`,
          items: [],
        };

        if (node.properties["data-nav"] === "link") {
          // Add to the root-level items and set as the last link
          // @ts-ignore
          page.items.push(item);
          lastLink = item;
          // @ts-ignore
        } else if (node.properties["data-nav"] === "sublink" && lastLink) {
          // Add to the items of the most recent link
          lastLink.items.push(item);
        }
      }
    });

    // Load existing navigation or initialize as an array
    let navigation = [];
    if (fs.existsSync(outputFile)) {
      navigation = JSON.parse(fs.readFileSync(outputFile, "utf-8"));
    }

    // Ensure the navigation array has enough space for the specified `order`
    if (navigation.length <= page.order) {
      // If the order index exceeds the length, simply extend the array
      while (navigation.length <= page.order) {
        navigation.push({}); // Adding empty objects instead of `null`
      }
    }

    navigation[page.order] = page;

    // Write the updated navigation array to the specified file
    fs.writeFileSync(outputFile, JSON.stringify(navigation, null, 2), "utf-8");
  };
}

export { addAnotations, addFrontmatter, generateJson };
