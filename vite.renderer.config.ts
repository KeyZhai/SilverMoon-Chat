import { defineConfig, type CSSOptions } from "vite";
import { resolve } from "node:path";

// https://vitejs.dev/config
export default defineConfig(async () => {
  const vue = (await import("@vitejs/plugin-vue")).default;
  const tailwindcss = (await import("@tailwindcss/vite")).default;
  const autoImport = (await import("unplugin-auto-import/vite")).default;

  return {
    plugins: [
      vue(),
      tailwindcss(),
      //auto import vue, vue-router, pinia, vue-i18n, @vueuse/core,
      //dont need to import dependencies explicit
      autoImport({
        imports: ["vue", "vue-router", "pinia", "vue-i18n", "@vueuse/core"],
        dts: "renderer/auto.imports.d.ts",
      }),
    ],
    css: {
      transformer: "lightningcss" as CSSOptions["transformer"],
    },
    build: {
      target: "es2022",
      publicDir: "public",
      rollupOptions: {
        input: [
          resolve(__dirname, "html/index.html"),
          resolve(__dirname, "html/dialog.html"),
          resolve(__dirname, "html/settings.html"),
        ],
      },
    },
    resolve: {
      alias: {
        "@common": resolve(__dirname, "common"),
        "@renderer": resolve(__dirname, "renderer"),
        "@main": resolve(__dirname, "main"),
        "@locales": resolve(__dirname, "locales"),
      },
    },
  };
});
