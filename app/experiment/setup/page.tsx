"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGatePath } from "../_lib/flow";
import { saveExperimentSetup } from "../_lib/storage";
import type { SetOrder } from "../_lib/types";

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

function getFirstGateKind(setOrder: SetOrder) {
    switch (setOrder) {
        case "A_Ap_B":
            return "set1" as const;
        case "B_Bp_A":
            return "set1" as const;
        default:
            return "set1" as const;
    }
}

export default function ExperimentSetupPage() {
    const router = useRouter();

    const [participantId, setParticipantId] = useState("");
    const [setOrder, setSetOrder] = useState<SetOrder>("A_Ap_B");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isDisabled = participantId.trim() === "";

    const handleOpenDialog = () => {
        if (isDisabled) return;
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleConfirm = () => {
        saveExperimentSetup({
            participantId: participantId.trim(),
            setOrder,
        });

        setIsDialogOpen(false);
        router.push(getGatePath(getFirstGateKind(setOrder)));
    };

    return (
        <main className="min-h-screen bg-white px-6 py-10">
            <div className="mx-auto flex max-w-3xl flex-col gap-8">
                <header className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900">実験課題の設定</h1>
                    <p className="text-base leading-7 text-gray-600">
                        被験者IDとセット順を入力してください。
                    </p>
                </header>

                <section className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="participantId"
                                className="block text-sm font-medium text-gray-800"
                            >
                                被験者ID
                            </label>
                            <input
                                id="participantId"
                                type="text"
                                value={participantId}
                                onChange={(e) => setParticipantId(e.target.value)}
                                placeholder="例: s001"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="setOrder"
                                className="block text-sm font-medium text-gray-800"
                            >
                                セット順
                            </label>
                            <select
                                id="setOrder"
                                value={setOrder}
                                onChange={(e) => setSetOrder(e.target.value as SetOrder)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                            >
                                <option value="A_Ap_B">A → A&apos; → B</option>
                                <option value="B_Bp_A">B → B&apos; → A</option>
                            </select>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={handleOpenDialog}
                                disabled={isDisabled}
                                className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                開始確認
                            </button>

                            <Link
                                href="/"
                                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                戻る
                            </Link>
                        </div>
                    </div>
                </section>

                {isDialogOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-gray-900">入力内容の確認</h2>
                                    <p className="text-sm leading-6 text-gray-600">
                                        以下の内容で実験課題を開始します。
                                    </p>
                                </div>

                                <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-700">被験者ID</p>
                                        <p className="text-base text-gray-900">{participantId.trim()}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-700">セット順</p>
                                        <p className="text-base text-gray-900">{formatSetOrder(setOrder)}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseDialog}
                                        className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        修正する
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleConfirm}
                                        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                                    >
                                        この内容で進む
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}