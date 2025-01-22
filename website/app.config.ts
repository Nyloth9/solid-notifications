import { defineConfig } from "@solidjs/start/config";
/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx";
// @ts-ignore
import { mdxAnnotations } from "mdx-annotations";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import remarkFrontmatter from "remark-frontmatter";
import grayMatter from "gray-matter";
import { addAnotations, addFrontmatter } from "./src/plugins/plugins";

const { default: mdx } = pkg;
export default defineConfig({
  server: {
    compatibilityDate: "2025-01-22",
  },
  extensions: ["mdx", "md"],
  vite: {
    plugins: [
      mdx.withImports({})({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        rehypePlugins: [
          mdxAnnotations.rehype,
          addAnotations,
          rehypeSlug,
          rehypeAutolinkHeadings,
          [rehypeShiki, { theme: "material-theme-darker" }],
        ],
        remarkPlugins: [
          mdxAnnotations.remark,
          remarkFrontmatter,
          addFrontmatter,
        ],
        recmaPlugins: [mdxAnnotations.recma],
        enforce: "pre",
      }),
    ],
  },
});
