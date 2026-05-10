"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getOptionsByIds,
  getProductById,
  getShippingById,
  getShippingPrice,
  trial9Data,
} from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { OrderItemPanel } from "@/app/trials/_components/a1TrialComponents/OrderItemPanel";
import { ConfirmShippingSection } from "@/app/trials/_components/a1TrialComponents/ConfirmShippingSection";
import { ConfirmOptionSection } from "@/app/trials/_components/a1TrialComponents/ConfirmOptionSection";
import { ConfirmSummaryPanel } from "@/app/trials/_components/a1TrialComponents/ConfirmSummaryPanel";

const checkoutPath = getTrialPath("b1", "trial9", "checkout");
const completePath = getTrialPath("b1", "trial9", "complete");

export default function ConfirmPageB1Trial9() {
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
  const selectedShippingBase = getShippingById(shippingId);
  const selectedOptions = getOptionsByIds(optionIds);

  const shippingPriceYen = selectedShippingBase
    ? getShippingPrice(selectedProduct.id, shippingId)
    : 0;

  const selectedShipping = selectedShippingBase
    ? {
        ...selectedShippingBase,
        priceYen: shippingPriceYen,
      }
    : null;

  const productPriceYen = selectedProduct.priceYen;
  const optionTotalYen = selectedOptions.reduce(
    (sum, option) => sum + option.priceYen,
    0,
  );
  const totalYen = productPriceYen + shippingPriceYen + optionTotalYen;

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    trackAction({
      page: "confirm",
      type: "page_view",
      meta: {},
      payload: {
        productId,
        shippingId,
        optionIds,
        productPriceYen,
        shippingPriceYen,
        optionTotalYen,
        totalYen,
      },
    });
  }, [
    productId,
    shippingId,
    optionIds,
    productPriceYen,
    shippingPriceYen,
    optionTotalYen,
    totalYen,
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
  if (trial) backParams.set("trial", trial);
  backParams.set("shipping", shippingId ?? "");

  optionIds.forEach((optionId) => {
    backParams.append("options", optionId);
  });

  const completeParams = new URLSearchParams();
  completeParams.set("productId", selectedProduct.id);
  completeParams.set("set", set);
  if (trial) completeParams.set("trial", trial);
  completeParams.set("shipping", shippingId ?? "");

  optionIds.forEach((optionId) => {
    completeParams.append("options", optionId);
  });

  return (
    <main className="h-[1080px] overflow-hidden bg-gray-50">
      {error && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-lg border border-red-300 bg-red-50 px-6 py-3 text-sm font-semibold text-red-700 shadow-lg">
          配送方法を選択してください
        </div>
      )}

      <div className="mx-auto h-[1080px] w-[1200px] bg-gray-50">
        <TrialPageHeader
          purchaseConditions={trial9Data.purchaseConditions}
          title="最終確認"
        />

        {/* 915pxのメイン領域 */}
        <div className="flex h-[915px] w-[1200px] gap-[60px]">
          {/* 左側 */}
          <div className="h-[805px] w-[620px]">
            {/* ご注文商品：275px */}
            <OrderItemPanel product={selectedProduct} />

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* 配送方法：145px */}
            <ConfirmShippingSection shippingMethod={selectedShipping} />

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* 選択したオプション：275px */}
            <ConfirmOptionSection selectedOptions={selectedOptions} />
          </div>

          {/* 右側：805pxのお支払い金額領域 */}
          <ConfirmSummaryPanel
            productId={productId}
            shippingId={shippingId}
            optionIds={optionIds}
            productPriceYen={productPriceYen}
            shippingPriceYen={shippingPriceYen}
            optionTotalYen={optionTotalYen}
            totalYen={totalYen}
            completePath={`${completePath}?${completeParams.toString()}`}
            backPath={`${checkoutPath}?${backParams.toString()}`}
            onSubmit={() => {
              if (!selectedShipping) {
                setError(true);

                window.setTimeout(() => {
                  setError(false);
                }, 1800);

                return;
              }

              router.push(`${completePath}?${completeParams.toString()}`);
            }}
          />
        </div>
      </div>
    </main>
  );
}
