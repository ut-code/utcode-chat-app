import type { Handle } from "@sveltejs/kit";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { createConvexAuthHooks } from "@mmailaender/convex-auth-svelte/sveltekit/server";
import { sequence } from "@sveltejs/kit/hooks";
import { PUBLIC_CONVEX_URL } from "$lib/env";

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) =>
        html.replace("%paraglide.lang%", locale),
    });
  });

const { handleAuth } = createConvexAuthHooks({ convexUrl: PUBLIC_CONVEX_URL });

export const handle: Handle = sequence(handleParaglide, handleAuth);
