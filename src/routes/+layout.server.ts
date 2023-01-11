import { prisma } from "$lib/server/prisma";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  if (!locals.authed) {
    return {
      panic: [],
      daily: [],
      now: new Date(),
      authed: locals.authed
    }
  }
	const panic = await prisma.panicRecord.findMany();
	const daily = await prisma.dailyRecord.findMany();

	return {
		panic,
		daily,
    now: new Date(),
    authed: locals.authed
	};
}) satisfies LayoutServerLoad;