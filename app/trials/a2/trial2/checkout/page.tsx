"use client";

import Link from "next/link";
import { use } from "react";
import { useState } from "react";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Product = {
  id: string;
  name: string;
  priceYen: number;
};

const products: Product[] = [
  { id: "hdmi-1", name: "ベーシック HDMIケーブル 2.0m 4K対応", priceYen: 780 },
  { id: "hdmi-2", name: "高耐久 HDMIケーブル 2.5m 4K対応", priceYen: 980 },
  { id: "hdmi-3", name: "コンパクト HDMIケーブル 1.5m 4K対応", priceYen: 650 },
  { id: "hdmi-4", name: "スタンダード HDMIケーブル 2.0m フルHD対応", priceYen: 720 },
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

export default function CheckoutPageA2Trial2({ searchParams }: Props) {
  const sp = use(searchParams);

  const productId = sp?.productId;
  const initialShipping = sp?.shipping ?? "";
  const initialOptions = normalizeOptions(sp?.options);

  const selectedProduct = products.find((product) => product.id === productId) ?? products[0];

  const [shipping, setShipping] = useState<string>(initialShipping);
  const [options, setOptions] = useState<string[]>(initialOptions);

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
          「HDMIケーブル」を1つ選んで購入してください（2m以上、4K対応、予算1,000円以内）
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">購入手続き</h1>
        </header>

        <form
          action="/trials/a2/trial2/confirm"
          method="GET"
          className="grid min-h-0 flex-1 grid-rows-[172px_minmax(0,1fr)_auto] gap-6"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="shipping" value={shipping} />
          {options.map((o) => (
            <input key={o} type="hidden" name="options" value={o} />
          ))}

          <section className="rounded-xl border border-gray-200 bg-white px-6 py-7 shadow-sm">
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

          <section className="grid min-h-0 grid-cols-2 gap-5">
            <article className="min-h-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-gray-900">配送方法</h2>

              <div className="space-y-3 text-sm text-gray-600">
                <label className="flex items-start gap-3 rounded-lg border border-gray-200 px-4 py-3">
                  <input
                    type="radio"
                    name="shipping-select"
                    value="standard"
                    checked={shipping === "standard"}
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  <div>
                    <div className="font-medium text-gray-700">通常配送</div>
                    <div className="text-gray-500">3〜5日でお届け予定</div>
                    <div className="text-gray-500">+¥0</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-lg border border-gray-200 px-4 py-3">
                  <input
                    type="radio"
                    name="shipping-select"
                    value="express"
                    checked={shipping === "express"}
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  <div>
                    <div className="font-medium text-gray-700">お急ぎ便</div>
                    <div className="text-gray-500">翌日〜2日でお届け予定</div>
                    <div className="text-gray-500">+¥300</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-lg border border-gray-200 px-4 py-3">
                  <input
                    type="radio"
                    name="shipping-select"
                    value="scheduled"
                    checked={shipping === "scheduled"}
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  <div>
                    <div className="font-medium text-gray-700">日時指定便</div>
                    <div className="text-gray-500">日時指定が可能です</div>
                    <div className="text-gray-500">+¥200</div>
                  </div>
                </label>
              </div>
            </article>

            <article className="min-h-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-gray-900">追加オプション</h2>

              <div className="space-y-3 text-sm text-gray-600">
                <label className="flex items-start gap-3 rounded-lg border border-gray-200 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={options.includes("insurance")}
                    onChange={() => toggleOption("insurance")}
                  />
                  <div>
                    <div className="font-medium text-gray-700">配送補償オプション</div>
                    <div className="text-gray-500">輸送時の破損・故障に備えます</div>
                    <div className="text-gray-500">+¥100</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-lg border border-gray-200 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={options.includes("gift")}
                    onChange={() => toggleOption("gift")}
                  />
                  <div>
                    <div className="font-medium text-gray-700">簡易ラッピング</div>
                    <div className="text-gray-500">簡易包装でお届けします</div>
                    <div className="text-gray-500">+¥50</div>
                  </div>
                </label>
              </div>
            </article>
          </section>

          <section className="shrink-0 px-2 py-4">
            <div className="grid h-full grid-cols-2 gap-3">
              <Link
                href="/trials/a2/trial2/product"
                className="flex h-11 items-center justify-center rounded-md border border-gray-300 bg-white px-5 text-sm font-medium text-gray-700 shadow-sm"
              >
                商品一覧へ戻る
              </Link>

              <button
                type="submit"
                className="h-11 rounded-md bg-black px-5 text-sm font-medium text-white shadow-sm"
              >
                次へ進む
              </button>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
