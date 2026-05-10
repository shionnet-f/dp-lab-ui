"use server";

import { track } from "@/lib/log/track";
import type { Prisma } from "@/generated/prisma/client";

type TrackActionParams = {
    sessionId?: string;
    participantId?: string;
    phase?: string;

    setIndex?: number;
    taskSetId?: string;
    trialNo?: number;

    page: string;
    type: string;

    meta?: Prisma.InputJsonValue;
    payload?: Prisma.InputJsonValue;
};

export async function trackAction(params: TrackActionParams) {
    await track(params);
}