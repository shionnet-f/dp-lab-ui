"use client";

import { useEffect, useState } from "react";

type QuizCountdownOptionsProps = {
    selectedId: string | null;
    onSelect: (id: string) => void;
};

type CountdownCard = {
    id: string;
    productName: string;
    price: string;
    hasDpTimer: boolean;
};

const cards: CountdownCard[] = [
    {
        id: "A",
        productName: "ワイヤレスイヤホン Pro",
        price: "¥7,980",
        hasDpTimer: false,
    },
    {
        id: "B",
        productName: "ワイヤレスイヤホン Pro",
        price: "¥7,980",
        hasDpTimer: true,
    },
    {
        id: "C",
        productName: "ワイヤレスイヤホン Pro",
        price: "¥7,980",
        hasDpTimer: false,
    },
];

function CountdownInfo({ enabled }: { enabled: boolean }) {
    const [secondsLeft, setSecondsLeft] = useState(180);

    useEffect(() => {
        if (!enabled) return;

        const timer = window.setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 0) return 0;
                return prev - 1;
            });
        }, 1000);

        return () => window.clearInterval(timer);
    }, [enabled]);

    if (!enabled) {
        return <div className="h-9 w-full" aria-hidden="true" />;
    }

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div className="flex h-9 items-center rounded-md bg-rose-100 px-3 text-sm text-rose-700">
            <p className="font-semibold">
                残り{" "}
                <span className="font-mono text-base font-bold tabular-nums text-rose-800">
                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}
                </span>
            </p>
        </div>
    );
}

export default function QuizCountdownOptions({
    selectedId,
    onSelect,
}: QuizCountdownOptionsProps) {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            {cards.map((card) => {
                const isSelected = selectedId === card.id;

                return (
                    <button
                        key={card.id}
                        type="button"
                        onClick={() => onSelect(card.id)}
                        className={[
                            "relative w-full rounded-xl border bg-white p-3 text-left shadow-sm transition",
                            "focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
                            isSelected
                                ? "border-gray-900 ring-2 ring-gray-900/10"
                                : "border-gray-200 hover:border-gray-400",
                        ].join(" ")}
                    >
                        <span
                            className={[
                                "absolute left-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold",
                                isSelected
                                    ? "border-gray-900 bg-gray-900 text-white"
                                    : "border-gray-300 bg-white text-gray-700",
                            ].join(" ")}
                        >
                            {card.id}
                        </span>

                        <article className="rounded-xl border border-gray-200 bg-white p-3 pt-8">
                            <div className="grid gap-3">
                                <div className="flex h-28 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                                    画像エリア
                                </div>

                                <div className="min-h-[48px]">
                                    <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
                                        {card.productName}
                                    </h2>
                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        {card.price}
                                    </p>
                                </div>

                                <CountdownInfo enabled={card.hasDpTimer} />

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex h-9 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-700">
                                        詳細を見る
                                    </div>

                                    <div className="flex h-9 items-center justify-center rounded-md bg-black text-sm font-medium text-white">
                                        購入へ
                                    </div>
                                </div>
                            </div>
                        </article>
                    </button>
                );
            })}
        </div>
    );
}