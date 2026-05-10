"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { TrialPageHeader } from "@/app/practice/_components/TrialPageHeader";
import { getPracticePath } from "@/app/trials/_lib/path";
import { OrderItemPanel } from "@/app/practice/_components/a2TrialComponents/CheckoutOrderItemPanel";
import { ShippingMethodSection } from "@/app/practice/_components/a2TrialComponents/ShippingMethodSection";
import { OptionSection } from "@/app/practice/_components/a2TrialComponents/OptionSection";
import { getProductById, practice1_4Data } from "../data";

const confirmPath = getPracticePath("trial1-4", "confirm");
const productPath = getPracticePath("trial1-4", "product");

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

export default function CheckoutPagePracticeTrial1_3({ searchParams }: Props) {
  const sp = use(searchParams);

  const selectedProduct = getProductById(sp?.productId);
  const set = sp?.set;

  const [shipping, setShipping] = useState<string | null>(sp?.shipping ?? null);
  const [options, setOptions] = useState<string[]>(
    normalizeOptions(sp?.options),
  );

  const router = useRouter();

  function toggleOption(value: string) {
    setOptions((prev) =>
      prev.includes(value)
        ? prev.filter((optionId) => optionId !== value)
        : [...prev, value],
    );
  }

  const selectedShippingMethod =
    practice1_4Data.shippingMethods.find((method) => method.id === shipping) ??
    null;

  const selectedOptionItems = practice1_4Data.options.filter((option) =>
    options.includes(option.id),
  );

  const productPrice = selectedProduct.priceYen;
  const shippingPrice = selectedShippingMethod?.priceYen ?? 0;
  const optionTotalPrice = selectedOptionItems.reduce(
    (sum, option) => sum + option.priceYen,
    0,
  );
  const totalPrice = productPrice + shippingPrice + optionTotalPrice;

  if (!set) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set がありません。
        </div>
      </main>
    );
  }

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={practice1_4Data.purchaseConditions}
          title="購入手続き"
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();

            const params = new URLSearchParams();
            params.set("productId", selectedProduct.id);
            params.set("set", set);
            params.set("shipping", shipping ?? "");

            options.forEach((optionId) => {
              params.append("options", optionId);
            });

            router.push(`${confirmPath}?${params.toString()}`);
          }}
          className="mx-auto h-[915px] w-[1160px] overflow-hidden"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="set" value={set} />
          <input type="hidden" name="shipping" value={shipping ?? ""} />

          {options.map((optionId) => (
            <input
              key={optionId}
              type="hidden"
              name="options"
              value={optionId}
            />
          ))}

          {/* 160px：商品情報パネル */}
          <OrderItemPanel product={selectedProduct} />

          {/* 60px：空間 */}
          <div className="h-[60px]" />

          {/* 438px：配送方法・追加オプション */}
          <section className="grid h-[438px] w-[1160px] grid-cols-[550px_550px] gap-[60px] overflow-hidden">
            <ShippingMethodSection
              shippingMethods={practice1_4Data.shippingMethods}
              selectedShipping={shipping}
              onChangeShipping={setShipping}
            />

            <OptionSection
              options={practice1_4Data.options}
              selectedOptions={options}
              onToggleOption={toggleOption}
            />
          </section>

          {/* 60px：空間 */}
          <div className="h-[60px]" />

          {/* 60px：ボタン領域 */}
          <div className="flex h-[60px] w-[1160px] items-center gap-[60px]">
            <button
              type="button"
              onClick={() => {
                router.push(`${productPath}?set=${set}`);
              }}
              className="flex h-[50px] w-[550px] items-center justify-center border border-gray-300 bg-white text-[16px] font-semibold text-gray-700"
            >
              商品一覧へ戻る
            </button>

            <button
              type="submit"
              className="flex h-[50px] w-[550px] items-center justify-center bg-black text-[16px] font-semibold text-white"
            >
              次へ進む
            </button>
          </div>

          {/* 137px：下部余白 */}
          <div className="h-[137px]" />
        </form>
      </div>
    </main>
  );
}
