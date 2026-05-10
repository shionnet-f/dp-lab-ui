"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductById, practice1_1Data } from "../data";
import { TrialPageHeader } from "@/app/practice/_components/TrialPageHeader";
import { ShippingMethodSection } from "@/app/practice/_components/a1TrialComponents/ShippingMethodSection";
import { OptionSection } from "@/app/practice/_components/a1TrialComponents/OptionSection";
import { OrderSummaryPanel } from "@/app/practice/_components/a1TrialComponents/OrderSummaryPanel";
import { getPracticePath } from "@/app/trials/_lib/path";

const confirmPath = getPracticePath("trial1-1", "confirm");
const productPath = getPracticePath("trial1-1", "product");

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

export default function CheckoutPagePracticeTrial1_1({ searchParams }: Props) {
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
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value],
    );
  }

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
    <main className="h-[1080px] overflow-hidden bg-gray-50">
      <div className="mx-auto h-[1080px] w-[1160px] bg-gray-50">
        <TrialPageHeader
          purchaseConditions={practice1_1Data.purchaseConditions}
          title="購入手続き"
        />

        {/* 810pxのメイン領域 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const params = new URLSearchParams();
            params.set("productId", selectedProduct.id);
            params.set("set", set);
            params.set("shipping", shipping ?? "");

            options.forEach((o) => {
              params.append("options", o);
            });

            router.push(`${confirmPath}?${params.toString()}`);
          }}
          className="flex h-[810px] w-[1160px] gap-[60px]"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="set" value={set} />
          <input type="hidden" name="shipping" value={shipping ?? ""} />
          {options.map((o) => (
            <input key={o} type="hidden" name="options" value={o} />
          ))}

          {/* 左側 */}
          <div className="h-[810px] w-[720px]">
            {/* 配送方法領域：438px */}
            <ShippingMethodSection
              shippingMethods={practice1_1Data.shippingMethods}
              selectedShipping={shipping}
              onChangeShipping={setShipping}
            />

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* オプション領域：312px */}
            <OptionSection
              options={practice1_1Data.options}
              selectedOptions={options}
              onToggleOption={toggleOption}
            />
          </div>

          {/* 右側：810pxのご注文商品領域 */}
          <OrderSummaryPanel
            product={selectedProduct}
            set={set}
            backPath={productPath}
          />
        </form>

        {/* 105pxの空間 */}
        <div className="h-[105px]" />
      </div>
    </main>
  );
}
