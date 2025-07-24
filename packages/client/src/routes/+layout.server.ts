import { createConvexAuthHandlers } from "@mmailaender/convex-auth-svelte/sveltekit/server";
import type { LayoutServerLoad } from "./$types";
import { PUBLIC_CONVEX_URL } from "$lib/env.ts";

const { getAuthState } = createConvexAuthHandlers({
  convexUrl: PUBLIC_CONVEX_URL,
});

export const load: LayoutServerLoad = async (event) => {
  const authState = await getAuthState(event);

  return { authState };
};
