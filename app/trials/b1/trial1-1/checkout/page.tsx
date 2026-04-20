"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getProductById, trial1_1Data } from "../data";

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

export default function CheckoutPageB1Trial1_1({ searchParams }: Props) {
  const sp = use(searchParams);

  const selectedProduct = getProductById(sp?.productId);
  const [shipping, setShipping] = useState<string | null>(sp?.shipping ?? null);
  const [options, setOptions] = useState<string[]>(normalizeOptions(sp?.options));

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
          予算{trial1_1Data.purchaseConditions.budgetYen}円以内、
          {trial1_1Data.purchaseConditions.quantityCondition}、
          {trial1_1Data.purchaseConditions.specificCondition}
        </div>

        <header className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">ご注文内容の確認</h1>
        </header>

        <form
          action="/trials/b1/trial1-1/confirm"
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
              <h2 className="mb-4 text-base font-semibold text-gray-900">配送方法</h2>

              <div className="space-y-4 text-sm text-gray-700">
                {trial1_1Data.shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3"
                  >
                    <input
                      type="radio"
                      name="shippingRadio"
                      checked={shipping === method.id}
                      onChange={() => setShipping(method.id)}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{method.name}</div>
                      <div className="text-gray-600">{method.shortDescription}</div>
                      <div className="text-gray-700">¥{yen(method.priceYen)}</div>
                    </div>
                  </label>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-gray-900">追加オプション</h2>

              <div className="space-y-4 text-sm text-gray-700">
                {trial1_1Data.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3"
                  >
                    <input
                      type="checkbox"
                      checked={options.includes(option.id)}
                      onChange={() => toggleOption(option.id)}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.name}</div>
                      <div className="text-gray-600">{option.shortDescription}</div>
                      <div className="text-gray-700">+¥{yen(option.priceYen)}</div>
                    </div>
                  </label>
                ))}
              </div>
            </article>
          </div>

          <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">ご注文商品</h2>

            <div className="space-y-4">
              <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                画像エリア
              </div>

              <div className="min-h-[44px] overflow-hidden text-base font-semibold leading-6 text-gray-900">
                {selectedProduct.name}
              </div>

              <div className="text-base font-medium text-gray-800">
                ¥{yen(selectedProduct.priceYen)}
              </div>

              <div className="min-h-[96px] overflow-hidden rounded-md border border-gray-200 p-3 text-sm leading-6 text-gray-600">
                {selectedProduct.description}
              </div>
            </div>

            <div className="mt-auto space-y-6 text-gray-900">

              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-md bg-black px-4 py-3 text-sm font-medium text-white"
                >
                  次へ進む
                </button>

                <Link
                  href="/trials/b1/trial1-1/product"
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  商品一覧へ戻る
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
