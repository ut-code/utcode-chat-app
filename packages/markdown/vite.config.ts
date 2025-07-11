import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

export default defineConfig({
  // TODO: remove as Plugin[] when tailwindcss is ready to migrate to latest vite
  plugins: [tailwindcss() as Plugin[], sveltekit()],
});
