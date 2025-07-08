<script lang="ts">
  import { Debounced } from "runed";
  import Editor from "@/lib/Editor.svelte";

  let doc = $state("");

  // example for saving on the network (it should be debounced)
  const lazyDoc = new Debounced(() => doc, 500);
</script>

<section data-theme="light">
  <h1>Light Theme</h1>
  <Editor bind:doc />
</section>

<section data-theme="dark">
  <h1>Dark Theme</h1>
  <Editor bind:doc />
</section>

<div>{lazyDoc.current}</div>
