import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ url, parent }) => {
  const { authed } = await parent();
  if (!authed) {
    throw redirect(302, '/authorize')
  }
  return {
    showDaily: !(url.searchParams.get('showDaily') === 'false')
  }
}) satisfies PageLoad;