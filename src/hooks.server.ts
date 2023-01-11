import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';

export const handle = (async ({ event, resolve }) => {
  // Allow access to authorize page
  if (event.url.pathname.startsWith('/authorize')) {
    const response = await resolve(event);
    event.locals.authed = false;
    return response;
  }
  // Else check session cookie
  else {
    const session = await event.cookies.get('session');
    if (session) {
      const valid = await bcrypt.compare(env.PRIVATE_SITE_PASSWORD, session)
      if (valid) {
        event.locals.authed = true;
        const response = await resolve(event);
        return response;
      }
      else {
        event.locals.authed = false;
        return Response.redirect(`${event.url.origin}/authorize`, 302)
      }
    }
    else {
      event.locals.authed = false;
      return Response.redirect(`${event.url.origin}/authorize`, 302)
    }
  }
}) satisfies Handle;