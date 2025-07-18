<script lang="ts">
  import { api, type Id } from "@packages/convex";
  import { useConvexClient } from "convex-svelte";

  interface Props {
    channelId: Id<"channels">;
  }

  const { channelId }: Props = $props();

  const convex = useConvexClient();
  let messageContent = $state("");
  let authorName = $state("ユーザー");

  async function sendMessage() {
    if (!messageContent.trim()) return;

    await convex.mutation(api.messages.send, {
      channelId,
      content: messageContent.trim(),
      author: authorName.trim() || "匿名",
    });

    messageContent = "";
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="border-base-300 bg-base-100 border-t p-4">
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
  </div>
</div>
