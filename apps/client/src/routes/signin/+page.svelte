<script lang="ts">
  import { goto } from "$app/navigation";
  import { useAuth } from "@mmailaender/convex-auth-svelte/sveltekit";

  const { isAuthenticated, isLoading, signIn } = useAuth();

  type Step =
    | "signIn"
    | "signUp"
    | { email: string; flow: "signUp-verification" };

  let step = $state<Step>("signIn");

  $effect(() => {
    if (isAuthenticated) {
      goto("/", { replaceState: true });
    }
  });
</script>

<div class="hero bg-base-200 min-h-screen">
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    {#if typeof step === "object"}
      <form
        class="card-body"
        onsubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          signIn("password", formData);
          goto("/", { replaceState: true });
        }}
      >
        <h1 class="text-2xl font-bold">Enter Code</h1>
        <p class="text-base-content/70 text-sm">
          A code has been sent to <strong>{step.email}</strong>.
        </p>
        <div class="form-control">
          <label class="label" for="code">
            <span class="label-text">Verification Code</span>
          </label>
          <input
            id="code"
            name="code"
            placeholder="123456"
            class="input input-bordered"
            required
          />
          <input name="flow" type="hidden" value="email-verification" />
          <input name="email" value={step.email} type="hidden" />
        </div>
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary" disabled={isLoading}>
            {#if isLoading}<span class="loading loading-spinner"></span>{/if}
            Confirm & Sign Up
          </button>
        </div>
      </form>
    {:else}
      <form
        class="card-body"
        onsubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          if (step === "signUp") {
            if (formData.get("password") !== formData.get("confirmPassword")) {
              alert("Passwords do not match!");
              return;
            }
            signIn("password", formData).then(() => {
              step = {
                email: formData.get("email") as string,
                flow: "signUp-verification",
              };
            });
          } else {
            signIn("password", formData);
          }
        }}
      >
        <h1 class="text-2xl font-bold">
          {step === "signIn" ? "Sign In to Prism" : "Create an Account"}
        </h1>
        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input
            id="email"
            name="email"
            placeholder="email"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            class="input input-bordered"
            required
          />
        </div>
        {#if step === "signUp"}
          <div class="form-control">
            <label class="label" for="confirmPassword">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              class="input input-bordered"
              required
            />
          </div>
        {/if}
        <div class="form-control mt-6">
          <input name="flow" type="hidden" bind:value={step} />
          <button type="submit" class="btn btn-primary" disabled={isLoading}>
            {#if isLoading}<span class="loading loading-spinner"></span>{/if}
            {step === "signIn" ? "Sign In" : "Continue"}
          </button>
        </div>
        <div class="divider text-sm">OR</div>
        <div class="text-center">
          <button
            type="button"
            class="link-hover link"
            onclick={() => {
              step = step === "signIn" ? "signUp" : "signIn";
            }}
          >
            {step === "signIn"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
        {#if step === "signIn"}
          <div class="mt-4 text-center">
            <a href="/reset" class="link-hover link text-sm">Forgot password?</a
            >
          </div>
        {/if}
      </form>
    {/if}
  </div>
</div>
