/// <reference types="vitest/config" />
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // @ts-expect-error: why?
  plugins: [sveltekit(), tailwindcss()],
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
