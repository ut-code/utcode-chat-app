<script lang="ts">
  import "@@/global.css";

  import { setupConvex } from "convex-svelte";
  import type { Snippet } from "svelte";
  import { PUBLIC_CONVEX_URL } from "$lib/env.ts";
  import { setupConvexAuth } from "@mmailaender/convex-auth-svelte/sveltekit";

  type Props = {
    children: Snippet;
  };

  const { children, data } = $props();

  setupConvex(PUBLIC_CONVEX_URL);

  setupConvexAuth({
    getServerState: () => data.authState,
    convexUrl: PUBLIC_CONVEX_URL,
  });
</script>

{@render children()}
