<script lang="ts">
  import { api, type Id, type Task } from "@packages/convex";
  import { useConvexClient, useQuery } from "convex-svelte";
  import TaskListSkin from "./TaskListSkin.svelte";

  const convex = useConvexClient();

  const todos = useQuery(api.tasks.get, () => ({}));
  async function updateTodo(id: Id<"tasks">, data: Partial<Task>) {
    console.log("mutation start");
    await convex.mutation(api.tasks.update, { id, ...data });
    console.log("mutation end");
  }
  async function createTodo() {
    await convex.mutation(api.tasks.create, { text: "", assigner: "" });
  }
</script>

<TaskListSkin {updateTodo} {createTodo} {todos} />
