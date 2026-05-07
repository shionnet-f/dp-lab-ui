"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/app/trials/_components/a2TrialComponents/ProductCard";
import { trial11Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";

const checkoutPath = getTrialPath("a2", "trial11", "checkout");

export default function ProductPageA2Trial11() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");

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

  if (!set) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set がありません。
        </div>
      </main>
    );
  }

  const products = trial11Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial11Data.purchaseConditions}
          title="商品一覧"
        />

        {/* 商品カード領域：160px * 4 + 60px * 3 = 820px */}
        <section className="mx-auto flex h-[820px] w-[1160px] flex-col gap-[60px] overflow-hidden">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              set={set}
              checkoutPath={checkoutPath}
              dpArea={
                product.dpDisplay?.showFreeShipping ? (
                  <div className="flex h-full w-full min-w-0 items-center justify-center overflow-hidden px-3 text-[16px] font-bold text-red-600">
                    <p className="truncate">送料無料</p>
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