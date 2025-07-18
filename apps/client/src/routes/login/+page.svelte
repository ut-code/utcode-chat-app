<script lang="ts">
  import { useAuth } from "@mmailaender/convex-auth-svelte/sveltekit";

  const isAuthenticated = $derived(useAuth().isAuthenticated);
  const isLoading = $derived(useAuth().isLoading);
  const { signIn, signOut } = useAuth();

  let step = $state<"signUp" | "signIn">("signIn");
</script>

<!-- {#if isLoading}
  <p>Loading authentication state...</p>
{:else if isAuthenticated}
  <h1>Welcome, authenticated user!</h1>
  <button onclick={() => signOut()}>Sign Out</button>
{:else}
  <h1>Please sign in</h1>
  <button onclick={() => signIn("google")}> Sign in with Google </button>
{/if} -->

<form
  onsubmit={(event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    signIn("password", formData);
  }}
>
  <input name="email" placeholder="Email" type="text" />
  <input name="password" placeholder="Password" type="password" />
  <input name="flow" type="hidden" bind:value={step} />
  <button type="submit">{step === "signIn" ? "Sign in" : "Sign up"}</button>
  <button
    type="button"
    onclick={() => {
      step = step === "signIn" ? "signUp" : "signIn";
    }}
  >
    {step === "signIn" ? "Sign up instead" : "Sign in instead"}
  </button>
</form>
