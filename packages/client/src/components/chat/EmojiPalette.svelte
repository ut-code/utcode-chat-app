<script lang="ts">
  interface Props {
    onClose: () => void;
    toggleButtonRef: HTMLElement | null;
  }
  let { onClose, toggleButtonRef }: Props = $props();
  let paletteRef: HTMLElement;

  $effect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paletteRef &&
        !paletteRef.contains(event.target as Node) &&
        !toggleButtonRef?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
</script>

<div
  bind:this={paletteRef}
  class="absolute right-4 bottom-24 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
>
  <div class="flex justify-between">
    <h3 class="text-lg font-semibold">絵文字パレット (仮)</h3>
    <button onclick={onClose} class="btn btn-sm btn-circle btn-ghost">✕</button>
  </div>
  <div class="mt-4 grid grid-cols-5 gap-2">
    <span>😀</span>
    <span>😂</span>
    <span>😍</span>
    <span>🤔</span>
    <span>👍</span>
  </div>
</div>
