"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { TrialPageHeader } from "@/app/practice/_components/TrialPageHeader";
import { getPracticePath } from "@/app/trials/_lib/path";
import { ConfirmOrderItemPanel } from "@/app/practice/_components/a2TrialComponents/ConfirmOrderItemPanel";
import { ConfirmShippingSection } from "@/app/practice/_components/a2TrialComponents/ConfirmShippingSection";
import { ConfirmOptionSection } from "@/app/practice/_components/a2TrialComponents/ConfirmOptionSection";
import { ConfirmSummaryPanel } from "@/app/practice/_components/a2TrialComponents/ConfirmSummaryPanel";
import {
  getOptionsByIds,
  getProductById,
  getShippingById,
  practice1_4Data,
} from "../data";

const completePath = getPracticePath("trial1-4", "complete");
const checkoutPath = getPracticePath("trial1-4", "checkout");

type Props = {
  searchParams: Promise<{
    productId?: string;
    shipping?: string;
    options?: string | string[];
    set?: string;
  }>;
};

function normalizeOptions(options?: string | string[]) {
  if (!options) return [];
  return Array.isArray(options) ? options : [options];
}

export default function ConfirmPagePracticeTrial1_3({ searchParams }: Props) {
  const sp = use(searchParams);
  const router = useRouter();

  const [error, setError] = useState(false);

  const productId = sp?.productId;
  const shippingId = sp?.shipping;
  const optionIds = normalizeOptions(sp?.options);
  const set = sp?.set;

  if (!set) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set がありません。
        </div>
      </main>
    );
  }

  const selectedProduct = getProductById(productId);
  const shippingInfo = getShippingById(shippingId);
  const selectedOptions = getOptionsByIds(optionIds);

  const productPriceYen = selectedProduct.priceYen;
  const shippingPriceYen = shippingInfo?.priceYen ?? 0;
  const optionTotalYen = selectedOptions.reduce(
    (sum, option) => sum + option.priceYen,
    0,
  );
  const totalYen = productPriceYen + shippingPriceYen + optionTotalYen;

  const backParams = new URLSearchParams();
  backParams.set("productId", selectedProduct.id);
  backParams.set("set", set);
  backParams.set("shipping", shippingId ?? "");
  optionIds.forEach((id) => {
    backParams.append("options", id);
  });

  const completeParams = new URLSearchParams();
  completeParams.set("productId", selectedProduct.id);
  completeParams.set("set", set);
  completeParams.set("shipping", shippingId ?? "");
  optionIds.forEach((id) => {
    completeParams.append("options", id);
  });

  function handleConfirmSubmit() {
    if (!shippingInfo) {
      setError(true);

      window.setTimeout(() => {
        setError(false);
      }, 2500);

      return;
    }

    router.push(`${completePath}?${completeParams.toString()}`);
  }

  function handleBack() {
    router.push(`${checkoutPath}?${backParams.toString()}`);
  }

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={practice1_4Data.purchaseConditions}
          title="最終確認"
        />

        {error && (
          <div className="fixed left-1/2 top-6 z-50 w-[420px] -translate-x-1/2 rounded-lg border border-red-300 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-lg">
            配送方法を選択してください
          </div>
        )}

        {/* 810px メイン領域 */}
        <div className="mx-auto h-[810px] w-[1160px] overflow-hidden">
          {/* 160px：ご注文商品 */}
          <ConfirmOrderItemPanel product={selectedProduct} />

          {/* 60px 空間 */}
          <div className="h-[60px]" />

          {/* 145px：配送方法・オプション */}
          <section className="grid h-[145px] w-[1160px] grid-cols-[550px_550px] gap-[60px] overflow-hidden">
            <ConfirmShippingSection shippingInfo={shippingInfo} />

            <ConfirmOptionSection
              selectedOptions={selectedOptions}
              optionTotalYen={optionTotalYen}
            />
          </section>

          {/* 60px 空間 */}
          <div className="h-[60px]" />

          {/* 250px：お支払い金額 */}
          <ConfirmSummaryPanel
            productPriceYen={productPriceYen}
            shippingPriceYen={shippingPriceYen}
            optionTotalYen={optionTotalYen}
            totalYen={totalYen}
          />

          {/* 60px 空間 */}
          <div className="h-[60px]" />

          {/* 60px：ボタン */}
          <div className="flex h-[60px] w-[1160px] items-center gap-[60px]">
            <button
              type="button"
              onClick={handleBack}
              className="flex h-[50px] w-[550px] items-center justify-center border border-gray-300 bg-white text-[16px] font-semibold text-gray-700"
            >
              戻る
            </button>

            <button
              type="button"
              onClick={handleConfirmSubmit}
              className="flex h-[50px] w-[550px] items-center justify-center bg-black text-[16px] font-semibold text-white"
            >
              購入を確定する
            </button>
          </div>
        </div>

        {/* 105px 下余白 */}
        <div className="h-[105px]" />
      </div>
    </main>
  );
}
