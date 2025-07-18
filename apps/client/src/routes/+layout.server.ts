import { createConvexAuthHandlers } from "@mmailaender/convex-auth-svelte/sveltekit/server";
import type { LayoutServerLoad } from "./$types";
import { PUBLIC_CONVEX_URL } from "$lib/env.ts";

// Create auth handlers - convexUrl is automatically detected from environment
const { getAuthState } = createConvexAuthHandlers({
  convexUrl: PUBLIC_CONVEX_URL,
});

// Export load function to provide auth state to layout
export const load: LayoutServerLoad = async (event) => {
  return { authState: await getAuthState(event) };
};
