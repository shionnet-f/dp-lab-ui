"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/app/trials/_components/a2TrialComponents/ProductCard";
import { trial2Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";

const checkoutPath = getTrialPath("a2", "trial2", "checkout");

export default function ProductPageA2Trial2() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");
  const trial = searchParams.get("trial");

  const didTrack = useRef(false);

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    void trackAction({
      page: "product",
      type: "page_view",
      meta: {},
      payload: {},
    });
  }, []);

  if (!set || !trial) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set または trial がありません。
        </div>
      </main>
    );
  }

  const products = trial2Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial2Data.purchaseConditions}
          title="商品一覧"
        />

        {/* 商品カード領域：160px + 60px + 160px + 60px + 160px + 60px + 160px */}
        <section className="mx-auto flex h-[820px] w-[1160px] flex-col gap-[60px] overflow-hidden">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              set={set}
              trial={trial}
              checkoutPath={checkoutPath}
              dpArea={
                product.dpDisplay ? (
                  <div className="flex h-full w-full min-w-0 items-center justify-center overflow-hidden border border-orange-400 bg-orange-100 px-3 text-[16px] font-semibold text-orange-700">
                    <p className="truncate">{product.dpDisplay.label}</p>
                  </div>
                ) : undefined
              }
            />
          ))}
        </section>

        {/* 95pxの空間 */}
        <div className="h-[95px]" />
      </div>
    </main>
  );
}