import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { promisify } from "util";

const routesDir = "./src/routes";
const outputFile = "./src/search-index.json";

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

// Extract headings and their content
async function extractHeadingsAndContent(markdown) {
  const tree = unified().use(remarkParse).use(remarkFrontmatter).parse(markdown);

  const result = [];
  let currentHeading = null;
  let currentContent = [];

  visit(tree, (node) => {
    if (node.type === "heading") {
      // If we already have a heading, save it before moving to a new one
      if (currentHeading !== null) {
        result.push({
          heading: cleanString(currentHeading),
          content: cleanString(currentContent.join(" ").trim()),
        });
      }

      // Set new heading
      currentHeading = toString(node);
      currentContent = []; // Reset content
    } else if (currentHeading && (node.type === "paragraph")) {
      // Only collect content if there's an active heading
      console.log(node);
      currentContent.push(toString(node));
    }
  });

  // Push last heading's content
  if (currentHeading !== null) {
    result.push({
      heading: cleanString(currentHeading),
      content: currentContent.join(" ").trim(),
    });
  }

  return result;
}

// Extract content from a single file
async function extractContent(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  const extractedData = await extractHeadingsAndContent(content);

  return {
    title: frontmatter.title || "",
    description: frontmatter.description || "",
    slug: frontmatter.slug || path.basename(filePath, path.extname(filePath)),
    filePath,
    extractedData,
  };
}

// Process all files and generate search index
async function processFiles() {
  const files = await getFiles(routesDir);
  const results = await Promise.all(files.map(extractContent));

  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), "utf-8");
  console.log(`Search index written to ${outputFile}`);
}

// Run the process
processFiles();
