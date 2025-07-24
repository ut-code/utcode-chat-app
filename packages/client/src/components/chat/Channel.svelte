<script lang="ts">
  import { api, type Id } from "@packages/convex";
  import { useQuery } from "convex-svelte";
  import MessageInput from "./MessageInput.svelte";
  import MessageList from "./MessageList.svelte";

  interface Props {
    selectedChannelId: Id<"channels">;
  }

  let { selectedChannelId }: Props = $props();

  const selectedChannel = useQuery(api.channels.get, () => ({
    id: selectedChannelId,
  }));
</script>

<div class="border-base-300 bg-base-200 border-b p-4">
  <h1 class="text-xl font-semibold">
    # {selectedChannel.data?.name}
  </h1>
  {#if selectedChannel.data?.description}
    <p class="text-base-content/70 mt-1 text-sm">
      {selectedChannel.data?.description}
    </p>
  {/if}
</div>

<MessageList channelId={selectedChannelId} />
<MessageInput channelId={selectedChannelId} />
