<script lang="ts">
  import CoreEditor from "./EditorCore.svelte";

  interface Props {
    doc?: string;
  }
  let { doc = $bindable("") }: Props = $props();
</script>

<!-- TODO: add some styling and additional controls-->
<CoreEditor bind:doc />
