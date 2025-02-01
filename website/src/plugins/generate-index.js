import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { promisify } from "util";
import Fuse from "fuse.js"

const routesDir = "./src/routes";
const fuseIndexFile = "./src/search/fuse-index.json";
const outputFile = "./src/search/search-data.json";

// Recursively get all Markdown/MDX files
async function getFiles(dir) {
  const entries = await promisify(fs.readdir)(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? getFiles(fullPath) : fullPath;
    })
  );
  return files.flat().filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

// Function to clean headings (remove {{ ... }})
function cleanString(text) {
  return text.replace(/\{\{.*?\}\}/g, "").trim();
}


function generateSlug(text) {
  const clean = cleanString(text);

  return clean
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^\w\s-]/g, "") // Remove non-alphanumeric characters (except spaces and hyphens)
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

// Extract headings and their content
async function extractHeadingsAndContent(markdown, pageUrl, pageName) {
  if (pageName === "404") return []; // Skip 404 page


  const tree = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .parse(markdown);


  const result = [];
  let currentHeading = null;
  let currentContent = [];
  let url = ""; // Track the id of the heading

  visit(tree, (node) => {
    if (node.type === "heading") {
      const headingText = toString(node); // Get the heading text as string
      const headingUrl = `${pageUrl}#${generateSlug(headingText)}`;

      // If we already have a heading, save it before moving to a new one

      if (pageName === headingText) return;

      if (currentHeading !== null) {
        result.push({
          page: pageName,
          heading: cleanString(currentHeading),
          content: cleanString(currentContent.join(" ").trim()),
          url: url,
        });
      }

      // Set new heading
      currentHeading = toString(node);
      currentContent = []; // Reset content
      url = headingUrl; // Set the id of the heading
    }

    if (currentHeading && (node.type === "paragraph")) {
      // Only collect content if there's an active heading
      if (pageName === "Props") {
        if (currentContent.length > 0) return;
      }
      currentContent.push(toString(node));
    }

    if (node.type === "listItem") {
      if (pageName === "Props") {
        let heading = null;
        let content = null;
        let extractedId = null;


        for (const child of node.children) {
          if (child.type === "paragraph") {
            const strongTag = child.children.find(c => c.type === "strong");

            if (strongTag) {
              heading = toString(strongTag); // Use <strong> as heading

              // Extract the text immediately following <strong>
              const strongIndex = child.children.indexOf(strongTag);
              if (strongIndex !== -1 && child.children[strongIndex + 1]) {
                content = toString(child.children.slice(strongIndex + 1));
              }
            }


            const match = toString(child).match(/"id"\s*:\s*"([^"]+)"/);
            if (match) {
              extractedId = match[1];
            }

          }
        }

        if (heading && content) {
          result.push({
            page: pageName,
            heading: cleanString(heading),
            content: cleanString(content).trim(),
            url: `${pageUrl}#${extractedId}`,
          });
        }
      }
    }
  });


  // Push last heading's content
  if (currentHeading !== null) {
    result.push({
      page: pageName,
      heading: cleanString(currentHeading),
      content: cleanString(currentContent.join(" ").trim()),
      url: url,
    });
  }

  return result;
}


// Extract content from a single file
async function extractContent(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  const extractedData = await extractHeadingsAndContent(content, frontmatter.slug || "", frontmatter.title || "");

  return extractedData
}

// Process all files and generate search index
async function processFiles() {
  const files = await getFiles(routesDir);
  const results = await Promise.all(files.map(extractContent));
  const flattenedResults = results.flat();

  const options = { keys: ["heading", "content", "page"] };

  const index = Fuse.createIndex(options.keys, flattenedResults);

  fs.writeFileSync(outputFile, JSON.stringify(flattenedResults, null, 2), "utf-8");
  console.log(`Search index written to ${outputFile}`);

  fs.writeFileSync(fuseIndexFile, JSON.stringify(index, null, 2), "utf-8");
  console.log(`Fuse index written to ${fuseIndexFile}`);
}

// Run the process
processFiles();
