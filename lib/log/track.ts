import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

type TrackParams = {
    page: string;
    type: string;
    meta?: Prisma.InputJsonValue;
    payload?: Prisma.InputJsonValue;
};

export async function track({
    page,
    type,
    meta = {},
    payload = {},
}: TrackParams) {
    await prisma.eventLog.create({
        data: {
            ts: BigInt(Date.now()),
            page,
            type,
            meta,
            payload,
        },
    });
}