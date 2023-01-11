import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
  return {
    showDaily: !(url.searchParams.get('showDaily') === 'false')
  }
}) satisfies PageLoad;