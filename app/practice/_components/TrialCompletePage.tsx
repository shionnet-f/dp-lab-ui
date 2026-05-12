"use client";

import { useRouter } from "next/navigation";

type TrialCompletePageProps = {
    set: string;
    nextPath: string;
};

export function TrialCompletePage({
    set,
    nextPath,
}: TrialCompletePageProps) {
    const router = useRouter();

    return (
        <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-xl space-y-8 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h1 className="text-[32px] font-bold text-gray-900">試行完了</h1>

                <p className="text-[20px] font-semibold leading-[32px] text-gray-700">
                    この試行は完了しました。次の試行へ進んでください。
                </p>

                <button
                    className="inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white"
                    onClick={() => {
                        const params = new URLSearchParams();
                        params.set("set", set);


                        router.push(`${nextPath}?${params.toString()}`);
                    }}
                >
                    次へ進む
                </button>
            </div>
        </main>
    );
}