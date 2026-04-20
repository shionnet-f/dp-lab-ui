"use client";

import { use } from "react";
import { useState } from "react";
import Link from "next/link";
import { getProductById, trial8Data } from "../data";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Props = {
  searchParams: Promise<{
    productId?: string;
  }>;
};

export default function CheckoutPageB1Trial8({ searchParams }: Props) {
  const sp = use(searchParams);
  const selectedProduct = getProductById(sp?.productId);

  const [shipping, setShipping] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  const shippingPrice = shipping
    ? (trial8Data.shippingMethods.find((method) => method.id === shipping)
        ?.priceYen ?? 0)
    : 0;
  const optionTotal = options.reduce((sum, key) => {
    const optionPrice =
      trial8Data.options.find((option) => option.id === key)?.priceYen ?? 0;
    return sum + optionPrice;
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
          予算{trial8Data.purchaseConditions.budgetYen}円以内、
          {trial8Data.purchaseConditions.quantityCondition}、
          {trial8Data.purchaseConditions.specificCondition}
        </div>

        <header className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">ご注文内容の確認</h1>
        </header>

        <form
          action="/trials/b1/trial8/confirm"
          method="GET"
          className="grid flex-1 grid-cols-[1.6fr_1fr] gap-6"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />

          <div className="grid grid-rows-[1fr_1fr] gap-6">
            <article className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                配送方法
              </h2>

              <div className="space-y-3">
                {trial8Data.shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 px-4 py-3"
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={method.id}
                      checked={shipping === method.id}
                      onChange={() => setShipping(method.id)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {method.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {method.shortDescription}
                      </div>
                      <div className="text-sm text-gray-700">
                        +¥{yen(method.priceYen)}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </article>

            <article className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                追加オプション
              </h2>

              <div className="space-y-3">
                {trial8Data.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 px-4 py-3"
                  >
                    <input
                      type="checkbox"
                      name="options"
                      value={option.id}
                      checked={options.includes(option.id)}
                      onChange={() => toggleOption(option.id)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {option.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {option.shortDescription}
                      </div>
                      <div className="text-sm text-gray-700">
                        +¥{yen(option.priceYen)}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </article>
          </div>

          <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              ご注文商品
            </h2>

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
                  href="/trials/b1/trial8/product"
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
