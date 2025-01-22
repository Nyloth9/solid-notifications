import { visit } from "unist-util-visit";
import grayMatter from "gray-matter";

const addAnotations = () => (tree: any) => {
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

export { addAnotations, addFrontmatter };
