"use client";

import { use, useState } from "react";
import Link from "next/link";
import { products6 } from "@/config/products";

type Props = {
  searchParams: Promise<{
    productId?: string;
  }>;
};

export default function CheckoutPageB1Trial3({ searchParams }: Props) {
  const sp = use(searchParams);

  const productId = sp?.productId;

  const selectedProduct =
    products6.find((product) => product.id === productId) ?? products6[0];

  const [shipping, setShipping] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);

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

        <header className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">ご注文内容の確認</h1>
        </header>

        <form
          action="/trials/b1/trial3/confirm"
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
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                配送方法
              </h2>

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

              <div className="mt-4 rounded-md bg-gray-50 px-4 py-3 text-xs text-gray-500">
                料金は最終確認ページで表示
              </div>
            </article>

            {/* オプション */}
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                追加オプション
              </h2>

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
                    <div className="text-xs text-gray-500">
                      料金は最終確認ページで表示されます
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
                    <div className="text-xs text-gray-500">
                      料金は最終確認ページで表示されます
                    </div>
                  </div>
                </label>
              </div>
            </article>
          </div>

          {/* 右側 */}
          <aside className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              ご注文内容
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
              <div className="rounded-md border border-dashed border-gray-300 px-4 py-6 text-center text-xs text-gray-500">
                料金は最終確認ページで表示
              </div>

              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-md bg-black px-4 py-3 text-sm font-medium text-white"
                >
                  次へ進む
                </button>

                <Link
                  href="/trials/b1/trial3/product"
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
