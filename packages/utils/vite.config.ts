/// <reference types="vitest/config" />
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

export default defineConfig({
  plugins: [tailwindcss() as Plugin[], sveltekit()],
  test: {
    projects: [
      {
        extends: "./vite.config.ts",
        test: {
          name: "browser",
          environment: "happy-dom",
          include: ["{src,tests}/**/*.{test,spec}.{js,ts}"],
        },
      },
    ],
  },
});
