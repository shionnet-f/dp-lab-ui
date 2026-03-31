"use client";

import { use, useId, useState } from "react";
import Link from "next/link";
import { products6 } from "@/config/products";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Props = {
  searchParams: Promise<{
    productId?: string;
  }>;
};

type DetailDialogButtonProps = {
  title: string;
  rows: Array<{
    label: string;
    value: string;
  }>;
};

function DetailDialogButton({ title, rows }: DetailDialogButtonProps) {
  const dialogId = useId();

  return (
    <>
      <button
        type="button"
        className="rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-700"
        onClick={() => {
          const el = document.getElementById(
            dialogId,
          ) as HTMLDialogElement | null;
          el?.showModal();
        }}
      >
        料金詳細を見る
      </button>

      <dialog
        id={dialogId}
        className="m-auto w-full max-w-lg rounded-2xl p-0 backdrop:bg-black/30"
      >
        <div className="rounded-2xl bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
              onClick={() => {
                const el = document.getElementById(
                  dialogId,
                ) as HTMLDialogElement | null;
                el?.close();
              }}
            >
              閉じる
            </button>
          </div>

          <div className="space-y-3 px-6 py-6 text-sm text-gray-700">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3"
              >
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}

export default function CheckoutPageB1Trial4({ searchParams }: Props) {
  const sp = use(searchParams);

  const productId = sp?.productId;

  const selectedProduct =
    products6.find((product) => product.id === productId) ?? products6[0];

  const [shipping, setShipping] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  const shippingPrices: Record<string, number> = {
    standard: 500,
    express: 800,
    scheduled: 700,
  };

  const optionPrices: Record<string, number> = {
    insurance: 300,
    gift: 200,
  };

  const shippingPrice = shipping ? shippingPrices[shipping] : 0;

  const optionTotal = options.reduce((sum, key) => {
    return sum + optionPrices[key];
  }, 0);

  const total = selectedProduct.priceYen + shippingPrice + optionTotal;

  function toggleOption(value: string) {
    setOptions((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value],
    );
  }

  const shippingDetailRows = [
    { label: "通常配送", value: `¥${yen(500)}` },
    { label: "お急ぎ便", value: `¥${yen(800)}` },
    { label: "当日便", value: `¥${yen(700)}` },
  ];

  const optionDetailRows = [
    { label: "配送補償オプション", value: `+¥${yen(300)}` },
    { label: "ギフト包装", value: `+¥${yen(200)}` },
  ];

  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          「ミネラルウォーター 500ml×24」を1つ選んで購入してください
        </div>

        <header className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">ご注文内容の確認</h1>
        </header>

        <form
          action="/trials/b1/trial4/confirm"
          method="GET"
          className="grid flex-1 grid-cols-[1.5fr_1fr] gap-6"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="shipping" value={shipping ?? ""} />
          {options.map((o) => (
            <input key={o} type="hidden" name="options" value={o} />
          ))}

          {/* 左側 */}
          <div className="space-y-10">
            {/* 配送方法 */}
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">
                  配送方法
                </h2>
                <DetailDialogButton
                  title="配送方法の料金詳細"
                  rows={shippingDetailRows}
                />
              </div>

              <div className="space-y-4 text-sm text-gray-700">
                <label className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3">
                  <input
                    type="radio"
                    name="shippingRadio"
                    onChange={() => setShipping("standard")}
                  />
                  <div>
                    <div className="font-medium text-gray-900">通常配送</div>
                    <div className="text-gray-600">3〜5日でお届け</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3">
                  <input
                    type="radio"
                    name="shippingRadio"
                    onChange={() => setShipping("express")}
                  />
                  <div>
                    <div className="font-medium text-gray-900">お急ぎ便</div>
                    <div className="text-gray-600">最短で翌日にお届け</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3">
                  <input
                    type="radio"
                    name="shippingRadio"
                    onChange={() => setShipping("scheduled")}
                  />
                  <div>
                    <div className="font-medium text-gray-900">当日便</div>
                    <div className="text-gray-600">
                      受け取り日時を指定できます
                    </div>
                  </div>
                </label>
              </div>
            </article>

            {/* オプション */}
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">
                  追加オプション
                </h2>
                <DetailDialogButton
                  title="追加オプションの料金詳細"
                  rows={optionDetailRows}
                />
              </div>

              <div className="space-y-4 text-sm text-gray-700">
                <label className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3">
                  <input
                    type="checkbox"
                    onChange={() => toggleOption("insurance")}
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      配送補償オプション
                    </div>
                    <div className="text-gray-600">
                      破損・紛失時の補償を追加します
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3">
                  <input
                    type="checkbox"
                    onChange={() => toggleOption("gift")}
                  />
                  <div>
                    <div className="font-medium text-gray-900">ギフト包装</div>
                    <div className="text-gray-600">
                      プレゼント用に包装します
                    </div>
                  </div>
                </label>
              </div>
            </article>
          </div>

          {/* 右側 */}
          <aside className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              金額詳細
            </h2>

            <div className="space-y-4">
              <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                画像エリア
              </div>

              <div className="h-16 overflow-hidden text-sm font-medium leading-5 text-gray-900">
                {selectedProduct.name}
              </div>

              <div className="h-24 overflow-hidden rounded-md border border-gray-200 p-3 text-sm text-gray-600">
                {selectedProduct.description}
              </div>
            </div>

            <div className="mt-auto space-y-6 text-gray-900">
              <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <span>商品価格</span>
                  <span>¥{yen(selectedProduct.priceYen)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>送料</span>
                  <span>¥{yen(shippingPrice)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>オプション料金</span>
                  <span>¥{yen(optionTotal)}</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                  <span className="font-semibold">合計</span>
                  <span className="text-xl font-bold">¥{yen(total)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-md bg-black px-4 py-3 text-sm font-medium text-white"
                >
                  次へ進む
                </button>

                <Link
                  href="/trials/b1/trial4/product"
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  商品一覧へ戻る
                </Link>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
