import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // @ts-expect-error: why?
  plugins: [tailwindcss(), sveltekit()],
});
