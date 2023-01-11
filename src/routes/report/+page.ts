import { redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types";

export const load = (async ({ parent }) => {
  const { authed } = await parent();
  if (!authed) {
    throw redirect(302, '/authorize')
  }
  
}) satisfies PageLoad;