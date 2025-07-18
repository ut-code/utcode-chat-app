<script lang="ts">
  import { api, type Id } from "@packages/convex";
  import { useQuery } from "convex-svelte";
  import { onMount } from "svelte";

  interface Props {
    channelId: Id<"channels">;
  }

  const { channelId }: Props = $props();

  const messages = useQuery(api.messages.list, () => ({
    channelId,
  }));
  let messagesContainer: HTMLDivElement;

  function formatTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  $effect(() => {
    if (messages.data) {
      setTimeout(scrollToBottom, 0);
    }
  });

  onMount(() => {
    scrollToBottom();
  });
</script>

<div bind:this={messagesContainer} class="flex-1 space-y-2 overflow-y-auto p-4">
  {#if messages.data}
    {#each messages.data as message (message._id)}
      <div class="flex flex-col">
        <div class="flex items-baseline gap-2">
          <span class="text-primary font-semibold">{message.author}</span>
          <span class="text-base-content/60 text-xs">
            {formatTime(message.createdAt)}
          </span>
        </div>
        <div class="text-base-content ml-0 whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    {:else}
      <div class="text-center text-base-content/60 py-8">
        まだメッセージがありません
      </div>
    {/each}
  {:else}
    <div class="text-base-content/60 py-8 text-center">
      メッセージを読み込み中...
    </div>
  {/if}
</div>
