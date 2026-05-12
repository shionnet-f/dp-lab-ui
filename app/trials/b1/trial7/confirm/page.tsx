"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getOptionsByIds,
  getProductById,
  getShippingById,
  trial7Data,
} from "../data";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { OrderItemPanel } from "@/app/trials/_components/a1TrialComponents/OrderItemPanel";
import { ConfirmShippingSection } from "@/app/trials/_components/a1TrialComponents/ConfirmShippingSection";
import { ConfirmOptionSection } from "@/app/trials/_components/a1TrialComponents/ConfirmOptionSection";

const checkoutPath = getTrialPath("b1", "trial7", "checkout");
const completePath = getTrialPath("b1", "trial7", "complete");

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

export default function ConfirmPageB1Trial7() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [error, setError] = useState(false);
  const didTrack = useRef(false);

  const productId = searchParams.get("productId") ?? undefined;
  const shippingId = searchParams.get("shipping") ?? undefined;
  const optionIds = searchParams.getAll("options");
  const set = searchParams.get("set");
  const trial = searchParams.get("trial");

  const selectedProduct = getProductById(productId);
  const selectedShipping = getShippingById(shippingId);
  const selectedOptions = getOptionsByIds(optionIds);

  /*
    trial7のDP：
    - 商品ページでは priceYen を表示価格として提示
    - priceYen は定期お届けコース適用時の価格
    - confirmで actualPriceYen を通常購入価格として提示
    - 合計金額は actualPriceYen で計算する
  */
  const displayedPriceYen = selectedProduct.priceYen;

  const productPriceYen =
    selectedProduct.actualPriceYen ?? selectedProduct.priceYen;

  const isSubscriptionDisplay =
    selectedProduct.actualPriceYen !== undefined;

  const shippingPriceYen = selectedShipping?.priceYen ?? 0;

  const optionTotalYen = selectedOptions.reduce(
    (sum, option) => sum + option.priceYen,
    0,
  );

  const totalYen = productPriceYen + shippingPriceYen + optionTotalYen;

  function createLogBase() {
    const logParams = new URLSearchParams();

    if (set) logParams.set("set", set);
    if (trial) logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    void trackAction({
      ...createLogBase(),
      phase: "main",
      page: "confirm",
      type: "page_view",
      meta: { implTrialId: "trial7" },
      payload: {
        productId,
        shippingId,
        optionIds,
        displayedPriceYen,
        productPriceYen,
        shippingPriceYen,
        optionTotalYen,
        totalYen,
        isSubscriptionDisplay,
      },
    });
  }, [
    productId,
    shippingId,
    optionIds,
    displayedPriceYen,
    productPriceYen,
    shippingPriceYen,
    optionTotalYen,
    totalYen,
    isSubscriptionDisplay,
  ]);

  if (!set || !trial) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set または trial がありません。
        </div>
      </main>
    );
  }

  const backParams = new URLSearchParams();
  backParams.set("productId", selectedProduct.id);
  backParams.set("set", set);
  backParams.set("trial", trial);
  backParams.set("shipping", shippingId ?? "");

  optionIds.forEach((optionId) => {
    backParams.append("options", optionId);
  });

  const completeParams = new URLSearchParams();
  completeParams.set("productId", selectedProduct.id);
  completeParams.set("set", set);
  completeParams.set("trial", trial);
  completeParams.set("shipping", shippingId ?? "");

  optionIds.forEach((optionId) => {
    completeParams.append("options", optionId);
  });

  async function handleSubmit() {
    if (!selectedShipping) {
      setError(true);

      void trackAction({
        ...createLogBase(),
        phase: "main",
        page: "confirm",
        type: "confirm_submit_missing_shipping",
        meta: { implTrialId: "trial7" },
        payload: {
          productId,
          shippingId,
          optionIds,
          displayedPriceYen,
          productPriceYen,
          shippingPriceYen,
          optionTotalYen,
          totalYen,
          isSubscriptionDisplay,
        },
      });

      window.setTimeout(() => {
        setError(false);
      }, 1800);

      return;
    }

    await trackAction({
      ...createLogBase(),
      phase: "main",
      page: "confirm",
      type: "confirm_submit",
      meta: { implTrialId: "trial7" },
      payload: {
        productId,
        shippingId,
        optionIds,
        displayedPriceYen,
        productPriceYen,
        shippingPriceYen,
        optionTotalYen,
        totalYen,
        isSubscriptionDisplay,
      },
    });

    router.push(`${completePath}?${completeParams.toString()}`);
  }

  async function handleBack() {
    await trackAction({
      ...createLogBase(),
      phase: "main",
      page: "confirm",
      type: "confirm_back",
      meta: { implTrialId: "trial7" },
      payload: {
        productId,
        shippingId,
        optionIds,
        displayedPriceYen,
        productPriceYen,
        shippingPriceYen,
        optionTotalYen,
        totalYen,
        isSubscriptionDisplay,
      },
    });

    router.push(`${checkoutPath}?${backParams.toString()}`);
  }

  return (
    <main className="h-[1080px] overflow-hidden bg-gray-50">
      {error && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-lg border border-red-300 bg-red-50 px-6 py-3 text-sm font-semibold text-red-700 shadow-lg">
          配送方法を選択してください
        </div>
      )}

      <div className="mx-auto h-[1080px] w-[1200px] bg-gray-50">
        <TrialPageHeader
          purchaseConditions={trial7Data.purchaseConditions}
          title="最終確認"
        />

        {/* 915pxのメイン領域 */}
        <div className="flex h-[915px] w-[1200px] gap-[60px]">
          {/* 左側 */}
          <div className="h-[805px] w-[620px]">
            {/* ご注文商品：275px */}
            <OrderItemPanel
              product={{
                ...selectedProduct,
                priceYen: productPriceYen,
              }}
            />

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* 配送方法：145px */}
            <ConfirmShippingSection shippingMethod={selectedShipping} />

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* 選択したオプション：275px */}
            <ConfirmOptionSection selectedOptions={selectedOptions} />
          </div>

          {/* 右側：支払い金額 */}
          <article className="flex h-[805px] w-[520px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex-1">
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                お支払い金額
              </h2>

              <div className="rounded-md border border-gray-200 p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">商品価格</span>
                    <span className="text-gray-900">
                      ¥{yen(productPriceYen)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">送料</span>
                    <span className="text-gray-900">
                      ¥{yen(shippingPriceYen)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">オプション料金</span>
                    <span className="text-gray-900">
                      ¥{yen(optionTotalYen)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                    <span className="font-semibold text-gray-900">合計</span>
                    <span className="text-3xl font-bold text-gray-900">
                      ¥{yen(totalYen)}
                    </span>
                  </div>
                </div>
              </div>

              {isSubscriptionDisplay && (
                <>
                  <div className="h-[60px]" />

                  <div className="h-[120px] overflow-hidden rounded-md border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                    <p>
                      商品ページで表示されていた価格 ¥
                      {yen(displayedPriceYen)} は、定期お届けコースを利用した場合の価格です。
                    </p>
                    <p>
                      今回の通常購入価格は ¥{yen(productPriceYen)} です。
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col gap-[60px] pb-[15px]">
              <button
                type="button"
                onClick={handleSubmit}
                className="h-[50px] w-full rounded-md bg-black px-4 text-sm font-medium text-white"
              >
                購入を確定する
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="flex h-[50px] w-full items-center justify-center rounded-md border border-gray-300 px-4 text-center text-sm text-gray-700"
              >
                戻る
              </button>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}