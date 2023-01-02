import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { env } from "$env/dynamic/private";
import { dev } from '$app/environment';
import * as bcrypt from 'bcrypt';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
    const fd = await request.formData();
    const password = fd.get('password') as string;
    if (password === env.PRIVATE_SITE_PASSWORD) {
      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(password, salt);
      cookies.set('session', hash, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: !dev,
        maxAge: 60 * 60 * 24 * 30
      })
      throw redirect(307, '/')
    }
    else {
      return fail(301, {incorrect: true});
    }
  }
};
