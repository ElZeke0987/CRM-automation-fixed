import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "ext-app/dist",
    emptyOutDir: true,
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        content: "src/inyect/index.ts",
        background: "src/background/index.ts",
        popup: "src/popup/popup.html",
        popupjs: "src/popup/popup.ts"
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]"
      }
    }
  }
});
