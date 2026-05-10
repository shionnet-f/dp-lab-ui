"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductById, trial8Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { OptionSection } from "@/app/trials/_components/a1TrialComponents/OptionSection";
import { OrderSummaryPanel } from "@/app/trials/_components/a1TrialComponents/OrderSummaryPanel";
import { getTrialPath } from "@/app/trials/_lib/path";

function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");

  if (trialsIndex >= 0) {
    return segments[trialsIndex + 2] ?? null;
  }

  const a1Index = segments.indexOf("a1");
  return a1Index >= 0 ? segments[a1Index + 1] ?? null : null;
}

const confirmPath = getTrialPath("a1", "trial8", "confirm");
const productPath = getTrialPath("a1", "trial8", "product");

type Props = {
  searchParams: Promise<{
    productId?: string;
    shipping?: string;
    options?: string | string[];
    set?: string;
    trial?: string;
  }>;
};

type ShippingMethod = {
  id: string;
  name: string;
  priceYen: number;
  shortDescription: string;
};

type RelativeShippingMethodSectionProps = {
  shippingMethods: ShippingMethod[];
  selectedShipping: string | null;
  onChangeShipping: (id: string) => void;
  set: string;
  trial: string;
};

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

function normalizeOptions(options?: string | string[]) {
  if (!options) return [];
  return Array.isArray(options) ? options : [options];
}

function getRelativePriceLabel(priceYen: number, basePriceYen: number) {
  const diff = priceYen - basePriceYen;

  if (diff === 0) {
    return "¥0";
  }

  if (diff > 0) {
    return `+¥${yen(diff)}`;
  }

  return `-¥${yen(Math.abs(diff))}`;
}

function RelativeShippingMethodSection({
  shippingMethods,
  selectedShipping,
  onChangeShipping,
  set,
  trial,
}: RelativeShippingMethodSectionProps) {
  // 真ん中の配送方法を基準にする
  // standard: 500円, express: 800円, scheduled: 700円 の場合
  // express が ¥0 表示になる
  const baseIndex = 1;
  const baseShippingMethod = shippingMethods[baseIndex];
  const basePriceYen = baseShippingMethod?.priceYen ?? 0;

  function createLogBase() {
    const logParams = new URLSearchParams();
    logParams.set("set", set);
    logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  return (
    <article className="h-[438px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="h-[15px]" />

      <div className="flex h-[30px] items-center px-5">
        <h2 className="text-base font-semibold text-gray-900">配送方法</h2>
      </div>

      <div className="h-[60px]" />

      {shippingMethods.map((method, index) => {
        const relativePriceYen = method.priceYen - basePriceYen;
        const relativePriceLabel = getRelativePriceLabel(
          method.priceYen,
          basePriceYen,
        );

        return (
          <div key={method.id}>
            <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
              <input
                type="radio"
                name="shippingRadio"
                checked={selectedShipping === method.id}
                onChange={() => {
                  onChangeShipping(method.id);

                  const baseLog = createLogBase();

                  void trackAction({
                    ...baseLog,
                    phase: "main",
                    page: "checkout",
                    type: "shipping_select",
                    meta: { implTrialId: getImplTrialId() },
                    payload: {
                      shippingId: method.id,

                      // 実際の金額
                      actualPriceYen: method.priceYen,

                      // 相対表示の基準
                      relativeBaseShippingId: baseShippingMethod?.id ?? null,
                      relativeBasePriceYen: basePriceYen,

                      // 表示上の差分
                      relativePriceYen,
                      relativePriceLabel,
                    },
                  });
                }}
              />

              <div className="min-w-0 leading-tight">
                <div className="truncate font-medium text-gray-900">
                  {method.name}
                </div>

                <div className="truncate text-gray-600">
                  {method.shortDescription}
                </div>

                <div className="text-gray-700">{relativePriceLabel}</div>
              </div>
            </label>

            {index < shippingMethods.length - 1 && <div className="h-[60px]" />}
          </div>
        );
      })}

      <div className="h-[15px]" />
    </article>
  );
}

export default function CheckoutPageA1Trial8({ searchParams }: Props) {
  const sp = use(searchParams);

  const selectedProduct = getProductById(sp?.productId);
  const set = sp?.set;
  const trial = sp?.trial;

  const [shipping, setShipping] = useState<string | null>(sp?.shipping ?? null);
  const [options, setOptions] = useState<string[]>(
    normalizeOptions(sp?.options),
  );

  const didTrack = useRef(false);
  const router = useRouter();

  function createLogBase() {
    const logParams = new URLSearchParams();

    if (set) logParams.set("set", set);
    if (trial) logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    const baseLog = createLogBase();

    void trackAction({
      ...baseLog,
      phase: "main",
      page: "checkout",
      type: "page_view",
      meta: { implTrialId: getImplTrialId() },
      payload: {},
    });
  }, []);

  function toggleOption(value: string) {
    setOptions((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value],
    );
  }

  const selectedShippingMethod =
    trial8Data.shippingMethods.find((method) => method.id === shipping) ?? null;

  const selectedOptionItems = trial8Data.options.filter((option) =>
    options.includes(option.id),
  );

  const productPrice = selectedProduct.priceYen;

  // 表示は相対価格だが、計算は必ず実価格 priceYen を使う
  const shippingPrice = selectedShippingMethod?.priceYen ?? 0;

  const optionTotalPrice = selectedOptionItems.reduce(
    (sum, option) => sum + option.priceYen,
    0,
  );

  const totalPrice = productPrice + shippingPrice + optionTotalPrice;

  if (!set || !trial) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set または trial がありません。
        </div>
      </main>
    );
  }

  return (
    <main className="h-[1080px] overflow-hidden bg-gray-50">
      <div className="mx-auto h-[1080px] w-[1160px] bg-gray-50">
        <TrialPageHeader
          purchaseConditions={trial8Data.purchaseConditions}
          title="購入手続き"
        />

        {/* 810pxのメイン領域 */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const baseLog = createLogBase();

            await trackAction({
              ...baseLog,
              phase: "main",
              page: "checkout",
              type: "checkout_submit",
              meta: { implTrialId: getImplTrialId() },
              payload: {
                productId: selectedProduct.id,
                productPrice,

                shippingId: shipping,
                shippingPrice,

                optionIds: options,
                optionTotalPrice,

                totalPrice,
              },
            });

            const params = new URLSearchParams();
            params.set("productId", selectedProduct.id);
            params.set("set", set);
            params.set("trial", trial);
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
          <input type="hidden" name="trial" value={trial} />
          <input type="hidden" name="shipping" value={shipping ?? ""} />

          {options.map((o) => (
            <input key={o} type="hidden" name="options" value={o} />
          ))}

          {/* 左側 */}
          <div className="h-[810px] w-[720px]">
            {/* 配送方法領域：438px */}
            <RelativeShippingMethodSection
              shippingMethods={trial8Data.shippingMethods}
              selectedShipping={shipping}
              onChangeShipping={setShipping}
              set={set}
              trial={trial}
            />

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* オプション領域：312px */}
            <OptionSection
              options={trial8Data.options}
              selectedOptions={options}
              onToggleOption={toggleOption}
              set={set}
              trial={trial}
            />
          </div>

          {/* 右側：810pxのご注文商品領域 */}
          <OrderSummaryPanel
            product={selectedProduct}
            set={set}
            trial={trial}
            backPath={productPath}
          />
        </form>

        {/* 105pxの空間 */}
        <div className="h-[105px]" />
      </div>
    </main>
  );
}