/// <reference types="vitest/config" />
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss() as any, sveltekit()],
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
