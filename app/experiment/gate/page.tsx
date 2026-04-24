"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getFixationPath } from "../_lib/flow";
import { loadExperimentSetup } from "../_lib/storage";
import type { ExperimentSetup, GateKind, SetOrder } from "../_lib/types";

function formatSetOrder(setOrder: SetOrder) {
    switch (setOrder) {
        case "A_Ap_B":
            return "A → A' → B";
        case "B_Bp_A":
            return "B → B' → A";
        default:
            return setOrder;
    }
}

function isGateKind(value: string | null): value is GateKind {
    return value === "set1" || value === "education" || value === "set2" || value === "set3";
}

function getGateTitle(kind: GateKind) {
    switch (kind) {
        case "set1":
            return "実験課題1の開始前";
        case "education":
            return "教育の開始前";
        case "set2":
            return "実験課題2の開始前";
        case "set3":
            return "実験課題3の開始前";
        default:
            return "開始前";
    }
}

function getGateDescription(kind: GateKind) {
    switch (kind) {
        case "set1":
            return "これから実験課題1を開始します。準備ができたら開始してください。";
        case "education":
            return "これから教育を開始します。準備ができたら開始してください。";
        case "set2":
            return "これから実験課題2を開始します。準備ができたら開始してください。";
        case "set3":
            return "これから実験課題3を開始します。準備ができたら開始してください。";
        default:
            return "準備ができたら開始してください。";
    }
}

function getNextPath(kind: GateKind) {
    switch (kind) {
        case "set1":
            return getFixationPath(1, "before");
        case "education":
            return "/education";
        case "set2":
            return getFixationPath(2, "before");
        case "set3":
            return getFixationPath(3, "before");
        default:
            return "/";
    }
}

export default function ExperimentGatePage() {
    const searchParams = useSearchParams();
    const [setup, setSetup] = useState<ExperimentSetup | null | undefined>(undefined);

    const kindParam = searchParams.get("kind");
    const kind = isGateKind(kindParam) ? kindParam : null;

    useEffect(() => {
        const data = loadExperimentSetup();
        setSetup(data);
    }, []);

    const nextPath = useMemo(() => {
        if (!kind) return "/";
        return getNextPath(kind);
    }, [kind]);

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
                        <h1 className="text-3xl font-bold text-gray-900">実験開始前</h1>
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

    if (!kind) {
        return (
            <main className="min-h-screen bg-white px-6 py-10">
                <div className="mx-auto flex max-w-3xl flex-col gap-6">
                    <header className="space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">実験開始前</h1>
                        <p className="text-base leading-7 text-gray-600">
                            開始区間の指定が不正です。もう一度設定から進めてください。
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
        <main className="min-h-screen bg-white px-6 py-10">
            <div className="mx-auto flex max-w-3xl flex-col gap-8">
                <header className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900">{getGateTitle(kind)}</h1>
                    <p className="text-base leading-7 text-gray-600">
                        {getGateDescription(kind)}
                    </p>
                </header>

                <section className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700">被験者ID</p>
                            <p className="text-base text-gray-900">{setup.participantId}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700">セット順</p>
                            <p className="text-base text-gray-900">{formatSetOrder(setup.setOrder)}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700">開始区間</p>
                            <p className="text-base text-gray-900">{getGateTitle(kind)}</p>
                        </div>
                    </div>
                </section>

                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/experiment/setup"
                        className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        設定をやり直す
                    </Link>

                    <Link
                        href={nextPath}
                        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        開始する
                    </Link>
                </div>
            </div>
        </main>
    );
}