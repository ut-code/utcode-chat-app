<script lang="ts">
  import { api, type Id } from "@packages/convex";
  import type { Doc } from "@packages/convex/src/convex/_generated/dataModel";
  import { useConvexClient, useQuery } from "convex-svelte";
  import EmojiPalette from "./EmojiPalette.svelte";

  interface Props {
    channelId: Id<"channels">;
    replyingTo: Doc<"messages"> | null;
  }

  let { channelId, replyingTo = $bindable() }: Props = $props();

  const convex = useConvexClient();
  const identity = useQuery(api.users.me, {});

  let messageContent = $state("");
  let authorName = $state("");
  let showEmojiPalette = $state(false);
  let emojiButtonRef = $state<HTMLElement | null>(null);

  $effect(() => {
    if (identity?.data && !authorName) {
      authorName = identity.data.name ?? identity.data.email ?? "匿名";
    }
  });

  async function sendMessage() {
    if (!messageContent.trim()) return;

    await convex.mutation(api.messages.send, {
      channelId,
      content: messageContent.trim(),
      author: authorName.trim() || "匿名",
      parentId: replyingTo?._id ?? undefined,
    });

    messageContent = "";
    replyingTo = null;
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="border-base-300 bg-base-100 border-t p-4">
  {#if replyingTo}
    <div class="text-base-content/70 mb-2 text-sm">
      <span class="font-semibold">返信先:</span>
      <span class="text-primary font-semibold">{replyingTo.author}</span>
      <span>{replyingTo.content}</span>
    </div>
  {/if}

  <div class="mb-2 flex gap-2">
    <input
      type="text"
      placeholder="ユーザー名"
      class="input input-sm input-bordered w-32"
      bind:value={authorName}
    />
  </div>

  <div class="flex gap-2">
    <textarea
      placeholder="メッセージを入力... (Enterで送信、Shift+Enterで改行)"
      class="textarea textarea-bordered flex-1 resize-none"
      rows="2"
      bind:value={messageContent}
      onkeydown={handleKeyPress}
    ></textarea>
    <button
      class="btn btn-primary self-end"
      onclick={sendMessage}
      disabled={!messageContent.trim()}
    >
      送信
    </button>
    <button
      bind:this={emojiButtonRef}
      class="btn btn-secondary self-end"
      onclick={() => (showEmojiPalette = !showEmojiPalette)}
    >
      😀
    </button>
  </div>
  {#if showEmojiPalette}
    <EmojiPalette
      onClose={() => (showEmojiPalette = false)}
      toggleButtonRef={emojiButtonRef}
    />
  {/if}
</div>
