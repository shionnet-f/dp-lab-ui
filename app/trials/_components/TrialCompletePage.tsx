"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { trackAction } from "@/app/actions/track";

type TrialCompletePageProps = {
    set: string;
    nextPath: string;
};

export function TrialCompletePage({
    set,
    nextPath,
}: TrialCompletePageProps) {
    const didTrack = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (didTrack.current) return;
        didTrack.current = true;

        void trackAction({
            page: "complete",
            type: "page_view",
            meta: {},
            payload: {},
        });
    }, []);

    return (
        <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h1 className="text-xl font-bold text-gray-900">試行完了</h1>

                <p className="text-sm text-gray-600">
                    この試行は完了しました。次の試行へ進んでください。
                </p>

                <button
                    className="inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white"
                    onClick={async () => {
                        await trackAction({
                            page: "complete",
                            type: "next_trial",
                            meta: {},
                            payload: {},
                        });

                        router.push(`${nextPath}?set=${set}`);
                    }}
                >
                    次へ進む
                </button>
            </div>
        </main>
    );
}