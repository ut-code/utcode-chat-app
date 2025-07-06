<script lang="ts">
  import BufferedTextInput from "$lib/atoms/BufferedTextInput.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import { type Id, type Task } from "@packages/convex";

  type Props = {
    updateTodo: (id: Id<"tasks">, data: Partial<Task>) => void;
    createTodo: () => void;
    todos:
      | { isLoading: true }
      | { isLoading: false; error: Error }
      | { isLoading: false; error: undefined; data: Task[] };
  };
  const { updateTodo, createTodo, todos }: Props = $props();
</script>

<div class="bg-base-200 m-4 rounded-xl p-4">
  <h1 class="p-5 text-center text-3xl">{m["example.taskList"]()}</h1>
  {#if todos.isLoading}
    <p><span class="loading loading-dots"></span>{m["common.loading"]()}</p>
  {:else if todos.error}
    <p>Error: {todos.error.message}</p>
  {:else}
    <ul class="list">
      <li class="list-row">
        <span class="list-col-grow text-center text-xl">
          {m["example.task"]()}
        </span>
        <span class="w-80 text-center text-xl">
          {m["example.assigner"]()}
        </span>
      </li>
      {#each todos.data as todo}
        <li class="list-row">
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            bind:checked={
              () => todo.isCompleted,
              (val) => {
                updateTodo(todo._id, {
                  isCompleted: val,
                });
              }
            }
          />
          <BufferedTextInput
            class="input w-full"
            bind:value={
              () => todo.text,
              (val) => {
                updateTodo(todo._id, {
                  text: val,
                });
              }
            }
          />
          <BufferedTextInput
            class="input input-bordered"
            bind:value={
              () => todo.assigner,
              (val) => {
                updateTodo(todo._id, {
                  assigner: val,
                });
              }
            }
          />
        </li>
      {/each}
    </ul>
  {/if}
  <button class="btn btn-primary" onclick={createTodo}>
    {m["example.new"]()}
  </button>
</div>
