import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "ext-app/dist",
    emptyOutDir: true,
    minify: false,
    //sourcemap: true,
    rollupOptions: {
      input: {
        index: "src/index.ts",
        //back: "src/back-index.ts",
        popup: "src/popup.html",
       // toolPanel: "src/tool-panel.html",
        style: "src/style.css"
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      }
    }
  }
});
