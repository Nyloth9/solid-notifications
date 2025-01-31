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
      currentContent.push(toString(node));
    }
  });


  // Push last heading's content
  if (currentHeading !== null) {
    result.push({
      page: pageName,
      heading: cleanString(currentHeading),
      content: currentContent.join(" ").trim(),
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

  fs.writeFileSync(outputFile, JSON.stringify(flattenedResults, null, 2), "utf-8");
  console.log(`Search index written to ${outputFile}`);
}

// Run the process
processFiles();
