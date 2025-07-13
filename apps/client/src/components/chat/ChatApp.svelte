<script lang="ts">
  import { type Id } from "@apps/convex";
  import Channel from "./Channel.svelte";
  import ChannelList from "./ChannelList.svelte";

  let selectedChannelId = $state<Id<"channels"> | undefined>(undefined);
</script>

<div class="bg-base-100 flex h-screen">
  <ChannelList bind:selectedChannelId />

  <div class="flex flex-1 flex-col">
    {#if selectedChannelId}
      <Channel {selectedChannelId} />
    {:else}
      <div class="bg-base-200 flex flex-1 items-center justify-center">
        <div class="text-center">
          <h2 class="text-base-content/60 mb-2 text-2xl font-semibold">
            チャットアプリへようこそ
          </h2>
          <p class="text-base-content/50">
            左からチャンネルを選択して会話を始めましょう
          </p>
        </div>
      </div>
    {/if}
  </div>
</div>
