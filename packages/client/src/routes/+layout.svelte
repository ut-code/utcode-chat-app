<script lang="ts">
  import "../app.css";

  import { PUBLIC_CONVEX_URL } from "$env/static/public";
  import { setupConvex } from "convex-svelte";
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();

  setupConvex(PUBLIC_CONVEX_URL);
</script>

{@render children()}
