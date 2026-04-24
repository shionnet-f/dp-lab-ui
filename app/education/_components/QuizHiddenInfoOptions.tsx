"use client";

import { WheelEvent } from "react";

type QuizHiddenInfoOptionsProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

type Card = {
  id: string;
  productName: string;
  price: string;
  variant: "clean" | "embedded";
};

const cards: Card[] = [
  {
    id: "A",
    productName: "天然水 500ml × 24本",
    price: "¥1,980",
    variant: "clean",
  },
  {
    id: "B",
    productName: "天然水 500ml × 24本",
    price: "¥1,980",
    variant: "embedded",
  },
  {
    id: "C",
    productName: "天然水 500ml × 24本",
    price: "¥1,980",
    variant: "clean",
  },
];

function stopScrollPropagation(event: WheelEvent<HTMLDivElement>) {
  event.stopPropagation();
}

function DetailsPanel({ variant }: { variant: Card["variant"] }) {
  if (variant === "embedded") {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-2">
        <div className="mb-2 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
          仕様・補足
        </div>
        <div
          className="h-24 overflow-y-auto rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs leading-6 text-gray-600"
          onWheel={stopScrollPropagation}
          onClick={(e) => e.stopPropagation()}
        >
          <p>
            この商品は日常使いに適した飲料です。通常配送に対応しており、購入後の変更はマイページから設定できます。初回注文時には通常価格で表示されますが、ご利用条件をご確認ください。本商品は2回目以降自動更新の定期お届け対象商品であり、解約は次回決済日の前日までに手続きが必要です。内容量、配送条件、契約の更新、支払方法、解約条件、配送頻度などの詳細は本欄をご確認ください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white p-2">
      <div className="mb-2 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
        仕様・補足
      </div>
      <div className="space-y-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs leading-5 text-gray-700">
        <p>内容量：500ml × 24本</p>
        <p>配送：通常配送</p>
        <p>購入形態：単品購入</p>
        <p>追加の継続契約なし</p>
      </div>
    </div>
  );
}

export default function QuizHiddenInfoOptions({
  selectedId,
  onSelect,
}: QuizHiddenInfoOptionsProps) {
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
                <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                  画像エリア
                </div>

                <div className="min-h-[40px]">
                  <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
                    {card.productName}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-gray-800">{card.price}</p>
                </div>

                <DetailsPanel variant={card.variant} />

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
