import { defineConfig } from "vite";
import { resolve } from "node:path";
// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@common": resolve(__dirname, "common"),
      "@renderer": resolve(__dirname, "renderer"),
      "@main": resolve(__dirname, "main"),
      "@locales": resolve(__dirname, "locales"),
    },
  },
});
