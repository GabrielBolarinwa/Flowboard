import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "search",
        },
      },
    }),
    tailwindcss(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    pool: "forks",
    testTimeout: 10000000,
    hookTimeout: 10000000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
