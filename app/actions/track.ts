"use server";

import { track } from "@/lib/log/track";
import type { Prisma } from "@/generated/prisma/client";

export async function trackAction(params: {
    page: string;
    type: string;
    meta?: Prisma.InputJsonValue;
    payload?: Prisma.InputJsonValue;
}) {
    await track(params);
}