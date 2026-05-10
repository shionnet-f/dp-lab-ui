"use client";
import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getProductById, trial1_1Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { ShippingMethodSection } from "@/app/trials/_components/a1TrialComponents/ShippingMethodSection";
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

const confirmPath = getTrialPath("a1", "trial1-1", "confirm");
const productPath = getTrialPath("a1", "trial1-1", "product");

type Props = {
  searchParams: Promise<{
    productId?: string;
    shipping?: string;
    options?: string | string[];
    set?: string;
    trial?: string;
  }>;
};

function normalizeOptions(options?: string | string[]) {
  if (!options) return [];
  return Array.isArray(options) ? options : [options];
}

export default function CheckoutPageA1Trial1_1({ searchParams }: Props) {
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
  }, [set, trial]);

  function toggleOption(value: string) {
    setOptions((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value],
    );
  }

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
          purchaseConditions={trial1_1Data.purchaseConditions}
          title="購入手続き"
        />

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
                shippingId: shipping,
                optionIds: options,
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

          <div className="h-[810px] w-[720px]">
            <ShippingMethodSection
              shippingMethods={trial1_1Data.shippingMethods}
              selectedShipping={shipping}
              onChangeShipping={setShipping}
              set={set}
              trial={trial}
            />

            <div className="h-[60px]" />

            <OptionSection
              options={trial1_1Data.options}
              selectedOptions={options}
              onToggleOption={toggleOption}
              set={set}
              trial={trial}
            />
          </div>

          <OrderSummaryPanel
            product={selectedProduct}
            set={set}
            trial={trial}
            backPath={productPath}
          />
        </form>

        <div className="h-[105px]" />
      </div>
    </main>
  );
}