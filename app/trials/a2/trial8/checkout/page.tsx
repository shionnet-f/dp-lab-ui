"use client";

import Link from "next/link";
import { use } from "react";
import { useMemo, useState } from "react";
import { products6 } from "@/config/products";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

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

export default function CheckoutPageA2Trial8({ searchParams }: Props) {
  const sp = use(searchParams);

  const productId = sp?.productId;
  const initialShipping = sp?.shipping ?? "";
  const initialOptions = normalizeOptions(sp?.options);

  const selectedProduct =
    products6.find((product) => product.id === productId) ?? products6[0];

  const [shipping, setShipping] = useState<string>(initialShipping);
  const [options, setOptions] = useState<string[]>(initialOptions);

  const shippingPrices: Record<string, number> = {
    standard: 500,
    express: 800,
    scheduled: 700,
  };

  const optionPrices: Record<string, number> = {
    insurance: 300,
    gift: 200,
  };

  const shippingPrice = shipping ? (shippingPrices[shipping] ?? 0) : 0;
  const optionTotal = useMemo(
    () => options.reduce((sum, key) => sum + (optionPrices[key] ?? 0), 0),
    [options],
  );
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
          「ミネラルウォーター 500ml×24」を1つ選んで購入してください
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">購入手続き</h1>
        </header>

        <form
          action="/trials/a2/trial8/confirm"
          method="GET"
          className="grid flex-1 grid-rows-[152px_320px_200px] gap-6"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="shipping" value={shipping} />
          {options.map((o) => (
            <input key={o} type="hidden" name="options" value={o} />
          ))}

          {/* 上部：商品情報 */}
          <section className="rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
            <div className="grid h-full grid-cols-[120px_1fr_auto] items-center gap-6">
              <div className="flex h-24 w-[120px] items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                画像
              </div>

              <div className="min-w-0">
                <div className="truncate text-lg font-medium text-gray-800">
                  {selectedProduct.name}
                </div>
                <div className="mt-3 text-base text-gray-600">
                  商品価格：¥{yen(selectedProduct.priceYen)}
                </div>
                <div className="mt-2 text-sm text-gray-400">ご選択中の商品</div>
              </div>

              <div className="text-sm text-gray-400">注文商品</div>
            </div>
          </section>

          {/* 中央：配送方法 / 追加オプション */}
          <section className="grid h-full grid-cols-2 gap-5">
            <article className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-sm font-medium text-gray-500">
                配送方法
              </h2>

              <div className="space-y-2 text-sm text-gray-600">
                <label className="flex items-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
                  <input
                    type="radio"
                    name="shippingRadio"
                    value="standard"
                    checked={shipping === "standard"}
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  <div>
                    <div className="font-medium text-gray-700">通常配送</div>
                    <div className="text-gray-500">3〜5日でお届け</div>
                    <div className="text-gray-500">¥{yen(500)}</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
                  <input
                    type="radio"
                    name="shippingRadio"
                    value="express"
                    checked={shipping === "express"}
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  <div>
                    <div className="font-medium text-gray-700">お急ぎ便</div>
                    <div className="text-gray-500">最短で翌日にお届け</div>
                    <div className="text-gray-500">¥{yen(800)}</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
                  <input
                    type="radio"
                    name="shippingRadio"
                    value="scheduled"
                    checked={shipping === "scheduled"}
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  <div>
                    <div className="font-medium text-gray-700">日時指定便</div>
                    <div className="text-gray-500">
                      受け取り日時を指定できます
                    </div>
                    <div className="text-gray-500">¥{yen(700)}</div>
                  </div>
                </label>
              </div>
            </article>

            <article className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-sm font-medium text-gray-500">
                追加オプション
              </h2>

              <div className="space-y-2 text-sm text-gray-600">
                <label className="flex items-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
                  <input
                    type="checkbox"
                    checked={options.includes("insurance")}
                    onChange={() => toggleOption("insurance")}
                  />
                  <div>
                    <div className="font-medium text-gray-700">
                      配送補償オプション
                    </div>
                    <div className="text-gray-500">
                      破損・紛失時の補償を追加します
                    </div>
                    <div className="text-gray-500">+¥{yen(300)}</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
                  <input
                    type="checkbox"
                    checked={options.includes("gift")}
                    onChange={() => toggleOption("gift")}
                  />
                  <div>
                    <div className="font-medium text-gray-700">ギフト包装</div>
                    <div className="text-gray-500">
                      プレゼント用に包装します
                    </div>
                    <div className="text-gray-500">+¥{yen(200)}</div>
                  </div>
                </label>
              </div>
            </article>
          </section>

          {/* 下部：金額領域 */}
          <section className="rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
            <div className="grid h-full grid-cols-[1fr_auto] items-center gap-8">
              <div className="space-y-4 text-sm text-gray-900">
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
                  <span className="text-2xl font-bold">¥{yen(total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/trials/a2/trial8/product"
                  className="flex h-11 items-center justify-center rounded-md border border-gray-300 px-5 text-sm font-medium text-gray-700"
                >
                  商品一覧へ戻る
                </Link>

                <button
                  type="submit"
                  className="h-11 rounded-md bg-black px-5 text-sm font-medium text-white"
                >
                  次へ進む
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
