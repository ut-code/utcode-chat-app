<script lang="ts">
  import "@@/global.css";

  import { setupConvex } from "convex-svelte";
  import type { Snippet } from "svelte";
  import { PUBLIC_CONVEX_URL } from "$lib/env.ts";

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();

  setupConvex(PUBLIC_CONVEX_URL);
</script>

{@render children()}
