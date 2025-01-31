import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import { remark } from "remark";
import remarkStringify from "remark-stringify";
import strip from "strip-markdown";

// Function to extract plain text from MDX content
async function extractPlainText(mdxContent) {
  const result = await remark().use(remarkStringify).process(mdxContent);
  return result.toString();
}

// Function to extract content from an MDX file
async function extractContent(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  // Extract plain text from MDX content
  const plainText = await extractPlainText(content);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    slug: frontmatter.slug,
    content: plainText, // Plain text content for search
  };
}

// Example: Extract content from all MDX files in a directory
async function processMdxFiles() {
  const mdxDir = path.join(process.cwd(), "./src/routes/");
  const files = fs.readdirSync(mdxDir);

  // Extract content from all MDX files
  const allContent = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(mdxDir, file);
      return extractContent(filePath);
    }),
  );

  // Save the extracted content to a JSON file
  const outputPath = path.join(process.cwd(), "./src/search-index.json");
  fs.writeFileSync(outputPath, JSON.stringify(allContent, null, 2));

  console.log(`Search index saved to ${outputPath}`);
}

// Run the function
processMdxFiles().catch((error) => {
  console.error("Error processing MDX files:", error);
});

export default processMdxFiles;
