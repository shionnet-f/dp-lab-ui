import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

type TrackParams = {
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

export async function track({
    sessionId,
    participantId,
    phase,
    setIndex,
    taskSetId,
    trialNo,
    page,
    type,
    meta = {},
    payload = {},
}: TrackParams) {
    await prisma.eventLog.create({
        data: {
            sessionId,
            participantId,
            phase,

            setIndex,
            taskSetId,
            trialNo,

            ts: BigInt(Date.now()),
            page,
            type,
            meta,
            payload,
        },
    });
}