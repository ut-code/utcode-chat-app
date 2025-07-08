<script lang="ts">
  import "@@/global.css";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }
  const { children }: Props = $props();
</script>

{@render children()}
