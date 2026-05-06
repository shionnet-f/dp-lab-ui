"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  getOptionsByIds,
  getProductById,
  getShippingById,
  trial1_3Data,
} from "../data";
import { trackAction } from "@/app/actions/track";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { OrderItemPanel } from "@/app/trials/_components/aTrialComponents/OrderItemPanel";
import { ConfirmShippingSection } from "@/app/trials/_components/aTrialComponents/ConfirmShippingSection";
import { ConfirmOptionSection } from "@/app/trials/_components/aTrialComponents/ConfirmOptionSection";
import { ConfirmSummaryPanel } from "@/app/trials/_components/aTrialComponents/ConfirmSummaryPanel";
import { getTrialPath } from "@/app/trials/_lib/path";

const completePath = getTrialPath("a1", "trial1-3", "complete");
const checkoutPath = getTrialPath("a1", "trial1-3", "checkout")

export default function ConfirmPageA1Trial2() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState(false);

  const productId = searchParams.get("productId") ?? undefined;
  const shipping = searchParams.get("shipping") ?? undefined;
  const optionKeys = searchParams.getAll("options");
  const set = searchParams.get("set");


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
  const selectedShipping = getShippingById(shipping);
  const selectedOptions = getOptionsByIds(optionKeys);

  const shippingPrice = selectedShipping?.priceYen ?? 0;
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
    if (!selectedShipping) {
      setError(true);

      window.setTimeout(() => {
        setError(false);
      }, 2500);

      return;
    }

    router.push(`${completePath}?${completeParams.toString()}`);
  };

  return (
    <main className="h-screen overflow-hidden bg-gray-50">
      <div className="mx-auto h-[1080px] w-[1200px] overflow-hidden">
        <TrialPageHeader
          purchaseConditions={trial1_3Data.purchaseConditions}
          title="購入手続き"
        />

        {error && (
          <div className="fixed left-1/2 top-6 z-50 w-[420px] -translate-x-1/2 rounded-lg border border-red-300 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-lg">
            配送方法を選択してください
          </div>
        )}

        <section className="flex h-[915px] gap-[60px]">
          {/* 左側 */}
          <div className="h-[915px] w-[620px]">
            <OrderItemPanel product={selectedProduct} />

            <div className="h-[60px]" />

            {/* 配送方法 */}
            <ConfirmShippingSection shippingMethod={selectedShipping} />

            <div className="h-[60px]" />

            {/* 選択したオプション */}
            <ConfirmOptionSection selectedOptions={selectedOptions} />

            <div className="h-[100px]" />
          </div>

          {/* 右側 */}
          <ConfirmSummaryPanel
            productId={productId}
            shippingId={shipping}
            optionIds={optionKeys}
            productPriceYen={selectedProduct.priceYen}
            shippingPriceYen={shippingPrice}
            optionTotalYen={optionTotal}
            totalYen={total}
            completePath={`${completePath}?${completeParams.toString()}`}
            backPath={`${checkoutPath}?${backParams.toString()}`}
            onSubmit={handleSubmit}
          />
        </section>
      </div>
    </main>
  );
}