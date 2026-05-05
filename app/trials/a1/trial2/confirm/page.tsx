"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  getOptionsByIds,
  getProductById,
  getShippingById,
  trial2Data,
} from "../data";
import { trackAction } from "@/app/actions/track";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

export default function ConfirmPageA1Trial2() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState(false);

  const productId = searchParams.get("productId") ?? undefined;
  const shipping = searchParams.get("shipping") ?? undefined;
  const optionKeys = searchParams.getAll("options");
  const set = searchParams.get("set");

  if (!set) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-sm text-red-700">
          URLに set がありません。
        </div>
      </main>
    );
  }

  const selectedProduct = getProductById(productId);
  const shippingInfo = getShippingById(shipping);
  const selectedOptions = getOptionsByIds(optionKeys);

  const shippingPrice = shippingInfo?.priceYen ?? 0;
  const optionTotal = selectedOptions.reduce(
    (sum, option) => sum + option.priceYen,
    0,
  );
  const total = selectedProduct.priceYen + shippingPrice + optionTotal;

  const backParams = new URLSearchParams();
  backParams.set("productId", selectedProduct.id);
  backParams.set("set", set);
  if (shipping) backParams.set("shipping", shipping);
  optionKeys.forEach((option) => backParams.append("options", option));

  const completeParams = new URLSearchParams();
  completeParams.set("productId", selectedProduct.id);
  completeParams.set("set", set);
  if (shipping) completeParams.set("shipping", shipping);
  optionKeys.forEach((option) => completeParams.append("options", option));

  const handleSubmit = () => {
    if (!shippingInfo) {
      setError(true);

      window.setTimeout(() => {
        setError(false);
      }, 2500);

      return;
    }

    router.push(`/trials/a1/trial2/complete?${completeParams.toString()}`);
  };


  const didTrack = useRef(false);

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    trackAction({
      page: "confirm",
      type: "page_view",
      meta: {},
      payload: {},
    });
  }, []);

  return (
    <main className="h-screen overflow-hidden bg-gray-50">
      <div className="mx-auto h-[1080px] w-[1200px] overflow-hidden">
        <div className="h-[60px]" />

        <div className="h-[45px] rounded-lg border border-blue-200 bg-blue-50 px-4 text-sm text-blue-800 flex items-center">
          <span className="font-semibold">購入条件：</span>
          予算{trial2Data.purchaseConditions.budgetYen}円以内、
          {trial2Data.purchaseConditions.quantityCondition}、
          {trial2Data.purchaseConditions.specificCondition}
        </div>

        <header className="h-[60px] flex items-center">
          <h1 className="text-xl font-bold text-gray-900">最終確認</h1>
        </header>

        {error && (
          <div className="fixed left-1/2 top-6 z-50 w-[420px] -translate-x-1/2 rounded-lg border border-red-300 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-lg">
            配送方法を選択してください
          </div>
        )}

        <section className="flex h-[915px] gap-[60px]">
          {/* 左側 */}
          <div className="h-[915px] w-[620px]">
            {/* ご注文商品 */}
            {/* ご注文商品 */}
            <article className="h-[275px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <h2 className="h-[30px] px-5 text-base font-semibold text-gray-900 flex items-center">
                ご注文商品
              </h2>

              <div className="h-[15px]" />

              <div className="flex h-[200px] px-5">
                {/* 左列：画像 */}
                <div className="h-[200px] w-[200px] shrink-0 rounded-lg bg-gray-100 text-sm text-gray-400 flex items-center justify-center">
                  画像エリア
                </div>

                {/* 列間：60px */}
                <div className="w-[60px]" />

                {/* 右列：商品名 + 価格 */}
                <div className="h-[200px] flex-1">
                  <div className="h-[70px] flex items-center text-sm font-medium leading-5 text-gray-900">
                    {selectedProduct.name}
                  </div>

                  <div className="h-[60px]" />

                  <div className="h-[70px] flex items-center text-base font-semibold text-gray-900">
                    ¥{yen(selectedProduct.priceYen)}
                  </div>
                </div>
              </div>
            </article>

            <div className="h-[60px]" />

            {/* 配送方法 */}
            <article className="h-[145px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <h2 className="h-[30px] px-5 text-base font-semibold text-gray-900 flex items-center">
                配送方法
              </h2>

              <div className="h-[15px]" />

              <div className="h-[70px] px-5">
                {shippingInfo ? (
                  <div className="flex h-full border border-gray-200 px-4 items-center justify-between text-sm text-gray-700">
                    <span className="truncate pr-4">{shippingInfo.name}</span>
                    <span className="shrink-0">
                      ¥{yen(shippingInfo.priceYen)}
                    </span>
                  </div>
                ) : (
                  <div className="flex h-full border border-gray-200 px-4 items-center text-gray-500">
                    未選択
                  </div>
                )}
              </div>

              <div className="h-[15px]" />
            </article>

            <div className="h-[60px]" />

            {/* 選択したオプション */}
            <article className="h-[275px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <h2 className="h-[30px] px-5 text-base font-semibold text-gray-900 flex items-center">
                選択したオプション
              </h2>

              <div className="h-[15px]" />

              <div className="h-[200px] px-5">
                <div className="flex flex-col gap-[60px]">
                  {selectedOptions.length > 0 ? (
                    selectedOptions.slice(0, 2).map((option) => (
                      <div
                        key={option.id}
                        className="h-[70px] rounded-md border border-gray-200 px-4 text-sm text-gray-700 flex items-center justify-between"
                      >
                        <span className="truncate pr-4">{option.name}</span>
                        <span className="shrink-0">
                          +¥{yen(option.priceYen)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="h-[70px] rounded-md border border-gray-200 px-4 text-sm text-gray-500 flex items-center">
                      選択されたオプションはありません
                    </div>
                  )}
                </div>
              </div>

              <div className="h-[15px]" />
            </article>

            <div className="h-[100px]" />
          </div>

          {/* 右側 */}
          <article className="h-[805px] w-[520px] overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col">
            <div className="flex-1">
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                お支払い金額
              </h2>

              <div className="rounded-md border border-gray-200 p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">商品価格</span>
                    <span className="text-gray-900">
                      ¥{yen(selectedProduct.priceYen)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">送料</span>
                    <span className="text-gray-900">¥{yen(shippingPrice)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">オプション料金</span>
                    <span className="text-gray-900">¥{yen(optionTotal)}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                    <span className="font-semibold text-gray-900">合計</span>
                    <span className="text-3xl font-bold text-gray-900">
                      ¥{yen(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[60px] pb-[15px]">
              <button
                type="button"
                onClick={async () => {
                  await trackAction({
                    page: "confirm",
                    type: "confirm_submit",
                    payload: {
                      productId,
                      shippingId: shipping,
                      optionIds: optionKeys,
                      totalYen: total,
                    },
                  });

                  handleSubmit();
                }}
                className="h-[50px] w-full rounded-md bg-black px-4 text-sm font-medium text-white"
              >
                購入を確定する
              </button>

              <button
                type="button"
                onClick={async () => {
                  await trackAction({
                    page: "confirm",
                    type: "confirm_back",
                    payload: {
                      productId,
                      shippingId: shipping,
                      optionIds: optionKeys,
                      totalYen: total,
                    },
                  });

                  router.push(`/trials/a1/trial2/checkout?${backParams.toString()}`);
                }}
                className="flex h-[50px] w-full items-center justify-center rounded-md border border-gray-300 px-4 text-center text-sm text-gray-700"
              >
                戻る
              </button>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}