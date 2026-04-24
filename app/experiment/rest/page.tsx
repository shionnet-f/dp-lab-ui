"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getNextGatePathAfterRest } from "../_lib/flow";
import { loadExperimentSetup } from "../_lib/storage";
import type { ExperimentSetup, RestAfter } from "../_lib/types";

const DURATION_SECONDS = 180;

function isRestAfter(value: string | null): value is RestAfter {
    return value === "set1" || value === "education" || value === "set2";
}

function getRestTitle(after: RestAfter) {
    switch (after) {
        case "set1":
            return "実験課題1後の休憩";
        case "education":
            return "教育後の休憩";
        case "set2":
            return "実験課題2後の休憩";
        default:
            return "休憩";
    }
}

function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function ExperimentRestPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [setup, setSetup] = useState<ExperimentSetup | null | undefined>(undefined);
    const [remainingSeconds, setRemainingSeconds] = useState(DURATION_SECONDS);

    const afterParam = searchParams.get("after");
    const after = isRestAfter(afterParam) ? afterParam : null;

    useEffect(() => {
        const data = loadExperimentSetup();
        setSetup(data);
    }, []);

    const nextPath = useMemo(() => {
        if (!after) return "/";
        return getNextGatePathAfterRest(after);
    }, [after]);

    useEffect(() => {
        if (!setup || !after) return;

        if (remainingSeconds <= 0) {
            router.push(nextPath);
            return;
        }

        const timer = window.setTimeout(() => {
            setRemainingSeconds((prev) => prev - 1);
        }, 1000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [after, nextPath, remainingSeconds, router, setup]);

    if (setup === undefined) {
        return (
            <main className="min-h-screen bg-white px-6 py-10">
                <div className="mx-auto max-w-3xl">
                    <p className="text-base text-gray-700">読み込み中です...</p>
                </div>
            </main>
        );
    }

    if (setup === null) {
        return (
            <main className="min-h-screen bg-white px-6 py-10">
                <div className="mx-auto flex max-w-3xl flex-col gap-6">
                    <header className="space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">休憩</h1>
                        <p className="text-base leading-7 text-gray-600">
                            設定情報が見つかりませんでした。先に実験課題の設定を行ってください。
                        </p>
                    </header>

                    <div>
                        <Link
                            href="/experiment/setup"
                            className="inline-flex rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            設定ページへ戻る
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    if (!after) {
        return (
            <main className="min-h-screen bg-white px-6 py-10">
                <div className="mx-auto flex max-w-3xl flex-col gap-6">
                    <header className="space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">休憩</h1>
                        <p className="text-base leading-7 text-gray-600">
                            休憩区間の指定が不正です。前のページからやり直してください。
                        </p>
                    </header>

                    <div>
                        <Link
                            href="/experiment/setup"
                            className="inline-flex rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            設定ページへ戻る
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-6 py-10">
            <div className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900">{getRestTitle(after)}</h1>
                    <p className="text-base leading-7 text-gray-600">
                        休憩してください。時間が来ると次の開始ページへ進みます。
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-10 py-8 shadow-sm">
                    <p className="text-5xl font-bold tracking-wider text-gray-900">
                        {formatTime(remainingSeconds)}
                    </p>
                </div>

                <p className="text-sm text-gray-500">
                    カウント終了後、次の gate へ自動で移動します。
                </p>
            </div>
        </main>
    );
}