"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/app/trials/_components/a1TrialComponents/ProductCard";
import { trial1_5Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";

function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");

  if (trialsIndex >= 0) {
    return segments[trialsIndex + 2] ?? null;
  }

  const a1Index = segments.indexOf("a1");
  return a1Index >= 0 ? segments[a1Index + 1] ?? null : null;
}

const checkoutPath = getTrialPath("a1", "trial1-5", "checkout");

export default function ProductPageA1Trial1_5() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");
  const trial = searchParams.get("trial");

  const didTrack = useRef(false);
  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    const baseLog = getClientLogBase({ searchParams });

    void trackAction({
      ...baseLog,
      phase: "main",
      page: "product",
      type: "page_view",
      meta: { implTrialId: getImplTrialId() },
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

  const products = trial1_5Data.products;
  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial1_5Data.purchaseConditions}
          title="商品一覧"
        />

        {/* 商品カード領域：378px + 60px + 378px */}
        <section className="mx-auto grid h-[816px] w-[1160px] grid-cols-2 grid-rows-[378px_378px] gap-x-[60px] gap-y-[60px] overflow-hidden">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              set={set}
              trial={trial}
              checkoutPath={checkoutPath}
              dpArea={product.dpDisplay}
            />
          ))}
        </section>

        {/* 99pxの空間 */}
        <div className="h-[99px]" />
      </div>
    </main>
  );
}
