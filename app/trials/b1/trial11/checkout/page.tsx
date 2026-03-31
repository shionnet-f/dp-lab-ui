"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { products6 } from "@/config/products";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Product = (typeof products6)[number];

type TrialDetail = {
  waterTypeLabel: string;
  packLabel: string;
  hardnessLabel: string;
  checkoutSummaryText: string;
};

const trial11Details: TrialDetail[] = [
  {
    waterTypeLabel: "天然水",
    packLabel: "500ml × 24本",
    hardnessLabel: "軟水",
    checkoutSummaryText:
      "硬度区分は軟水です。やわらかい飲み口で日常の飲用を想定しています。",
  },
  {
    waterTypeLabel: "天然水",
    packLabel: "500ml × 24本",
    hardnessLabel: "中硬水",
    checkoutSummaryText:
      "硬度区分は中硬水です。購入前に飲み口の好みに合うか確認してください。",
  },
  {
    waterTypeLabel: "飲用水（処理水）",
    packLabel: "500ml × 24本",
    hardnessLabel: "軟水",
    checkoutSummaryText: "硬度区分は軟水です。やわらかい口当たりのタイプです。",
  },
  {
    waterTypeLabel: "天然水",
    packLabel: "2L × 6本",
    hardnessLabel: "軟水",
    checkoutSummaryText:
      "硬度区分は軟水です。用途に合う容量か確認してください。",
  },
  {
    waterTypeLabel: "飲用水（処理水）",
    packLabel: "500ml × 24本",
    hardnessLabel: "中硬水",
    checkoutSummaryText:
      "硬度区分は中硬水です。飲み口はややしっかりしています。",
  },
  {
    waterTypeLabel: "天然水",
    packLabel: "350ml × 24本",
    hardnessLabel: "軟水",
    checkoutSummaryText:
      "硬度区分は軟水です。容量条件を確認してから購入してください。",
  },
];

type Props = {
  searchParams: Promise<{
    productId?: string;
    shipping?: string;
    options?: string | string[];
  }>;
};

function normalizeOptions(options?: string | string[]) {
  if (!options) return [];
  return Array.isArray(options) ? options : [options];
}

function getDetailByProduct(product: Product): TrialDetail {
  const index = products6.findIndex((p) => p.id === product.id);
  return trial11Details[index] ?? trial11Details[0];
}

export default function CheckoutPageB1Trial11({ searchParams }: Props) {
  const sp = use(searchParams);

  const productId = sp?.productId;
  const initialShipping =
    sp?.shipping === "standard" ||
    sp?.shipping === "express" ||
    sp?.shipping === "scheduled"
      ? sp.shipping
      : null;

  const initialOptions = normalizeOptions(sp?.options);

  const selectedProduct =
    products6.find((product) => product.id === productId) ?? products6[0];

  const detail = useMemo(
    () => getDetailByProduct(selectedProduct),
    [selectedProduct],
  );

  const [shipping, setShipping] = useState<string | null>(initialShipping);
  const [options, setOptions] = useState<string[]>(initialOptions);

  const shippingPrices = {
    standard: 480,
    express: 820,
    scheduled: 760,
  };

  const optionPrices: Record<string, number> = {
    insurance: 300,
    gift: 200,
  };

  const shippingPrice =
    shipping && shipping in shippingPrices
      ? shippingPrices[shipping as keyof typeof shippingPrices]
      : 0;

  const optionTotal = options.reduce((sum, key) => {
    return sum + (optionPrices[key] ?? 0);
  }, 0);

  const total = selectedProduct.priceYen + shippingPrice + optionTotal;

  function toggleOption(value: string) {
    setOptions((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value],
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          「天然水」「500ml ×
          24本」「軟水」を満たす商品を1つ選んで購入してください
        </div>

        <header className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">ご注文内容の確認</h1>
        </header>

        <form
          action="/trials/b1/trial11/confirm"
          method="GET"
          className="grid flex-1 grid-cols-[1.5fr_1fr] gap-6"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="shipping" value={shipping ?? ""} />
          {options.map((o) => (
            <input key={o} type="hidden" name="options" value={o} />
          ))}

          <div className="space-y-10">
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                配送方法
              </h2>

              <div className="space-y-4 text-sm text-gray-700">
                <label className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3">
                  <input
                    type="radio"
                    name="shippingRadio"
                    checked={shipping === "standard"}
                    onChange={() => setShipping("standard")}
                  />
                  <div>
                    <div className="font-medium text-gray-900">通常配送</div>
                    <div className="text-gray-600">3〜5日でお届け</div>
                    <div className="text-gray-700">
                      ¥{yen(shippingPrices.standard)}
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3">
                  <input
                    type="radio"
                    name="shippingRadio"
                    checked={shipping === "express"}
                    onChange={() => setShipping("express")}
                  />
                  <div>
                    <div className="font-medium text-gray-900">お急ぎ便</div>
                    <div className="text-gray-600">最短で翌日にお届け</div>
                    <div className="text-gray-700">
                      ¥{yen(shippingPrices.express)}
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3">
                  <input
                    type="radio"
                    name="shippingRadio"
                    checked={shipping === "scheduled"}
                    onChange={() => setShipping("scheduled")}
                  />
                  <div>
                    <div className="font-medium text-gray-900">当日便</div>
                    <div className="text-gray-600">
                      受け取り日時を指定できます
                    </div>
                    <div className="text-gray-700">
                      ¥{yen(shippingPrices.scheduled)}
                    </div>
                  </div>
                </label>
              </div>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                追加オプション
              </h2>

              <div className="space-y-4 text-sm text-gray-700">
                <label className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={options.includes("insurance")}
                    onChange={() => toggleOption("insurance")}
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      配送補償オプション
                    </div>
                    <div className="text-gray-600">
                      破損・紛失時の補償を追加します
                    </div>
                    <div className="text-gray-700">+¥{yen(300)}</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={options.includes("gift")}
                    onChange={() => toggleOption("gift")}
                  />
                  <div>
                    <div className="font-medium text-gray-900">ギフト包装</div>
                    <div className="text-gray-600">
                      プレゼント用に包装します
                    </div>
                    <div className="text-gray-700">+¥{yen(200)}</div>
                  </div>
                </label>
              </div>
            </article>
          </div>

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

              <div className="h-[124px] overflow-hidden rounded-md border border-gray-200 p-3 text-sm text-gray-600">
                <div className="space-y-2">
                  <p>{detail.checkoutSummaryText}</p>
                  <p>硬度区分：{detail.hardnessLabel}</p>
                </div>
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
                  href="/trials/b1/trial11/product"
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
