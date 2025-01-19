import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    solidPlugin(),
    dts({ rollupTypes: true, tsconfigPath: "../tsconfig.json" }),
  ],
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
