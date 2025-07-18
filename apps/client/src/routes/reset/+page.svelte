<script lang="ts">
  import { useAuth } from "@mmailaender/convex-auth-svelte/sveltekit";

  const { signIn } = useAuth();

  let step = $state<"forgot" | { email: string }>("forgot");
</script>

{#if step === "forgot"}
  <form
    onsubmit={(event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      void signIn("password", formData).then(
        () => (step = { email: formData.get("email") as string }),
      );
    }}
  >
    <input name="email" placeholder="Email" type="text" />
    <input name="flow" type="hidden" value="reset" />
    <button type="submit">Send code</button>
  </form>
{:else}
  <form
    onsubmit={(event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      void signIn("password", formData);
    }}
  >
    <input name="code" placeholder="Code" type="text" />
    <input name="newPassword" placeholder="New password" type="password" />
    <input name="email" value={step.email} type="hidden" />
    <input name="flow" value="reset-verification" type="hidden" />
    <button type="submit">Continue</button>
    <button type="button" onclick={() => (step = "forgot")}> Cancel </button>
  </form>
{/if}
