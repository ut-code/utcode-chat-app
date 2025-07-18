<script lang="ts">
  import ChatApp from "$components/chat/ChatApp.svelte";
  import { useAuth } from "@mmailaender/convex-auth-svelte/sveltekit";

  const isAuthenticated = $derived(useAuth().isAuthenticated);
  const isLoading = $derived(useAuth().isLoading);
  const { signIn, signOut } = useAuth();

  // With params (e.g., for email+password)
  function handleEmailSignIn(email: string, password: string) {
    signIn("email", { email, password });
  }
</script>

{#if isLoading}
  <p>Loading authentication state...</p>
{:else if isAuthenticated}
  <h1>Welcome, authenticated user!</h1>
  <button onclick={() => signOut()}>Sign Out</button>
{:else}
  <h1>Please sign in</h1>
  <button onclick={() => signIn("google")}> Sign in with Google </button>
{/if}

<ChatApp />
