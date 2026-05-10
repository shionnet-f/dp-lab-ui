"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/app/trials/_components/a2TrialComponents/ProductCard";
import { trial8Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getClientLogBase } from "@/lib/log/clientLogBase";
function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");

  if (trialsIndex >= 0) {
    return segments[trialsIndex + 2] ?? null;
  }

  const setIdIndex = segments.findIndex((segment) => ["a1", "a2", "b1", "b2"].includes(segment));
  return setIdIndex >= 0 ? segments[setIdIndex + 1] ?? null : null;
}

const checkoutPath = getTrialPath("b2", "trial8", "checkout");

export default function ProductPageB2Trial8() {
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

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial8Data.purchaseConditions}
          title="商品一覧"
        />
        <section className="mx-auto flex h-[820px] w-[1160px] flex-col gap-[60px] overflow-hidden">
          {trial8Data.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              set={set}
              trial={trial}
              checkoutPath={checkoutPath}
              dpArea={
                (product.dpDisplay as { label?: string } | null)?.label ? (
                  <div className="flex h-full w-full min-w-0 items-center justify-center overflow-hidden border border-orange-400 bg-orange-100 px-3 text-[16px] font-semibold text-orange-700">
                    <p className="truncate">{((product.dpDisplay as unknown) as { label?: string }).label}</p>
                  </div>
                ) : undefined
              }
            />
          ))}
        </section>
        <div className="h-[95px]" />
      </div>
    </main>
  );
}
