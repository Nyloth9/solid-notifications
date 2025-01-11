import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    lib: {
      entry: "./index.ts",
      name: "SolidNotifications",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["solid-js"],
      output: {
        globals: {
          "solid-js": "solid",
        },
      },
    },
  },
});
