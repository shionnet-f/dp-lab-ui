"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/app/trials/_components/a2TrialComponents/ProductCard";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getTrialPath } from "@/app/trials/_lib/path";
import { trackAction } from "@/app/actions/track";
import trial7Data from "../data";
import { getClientLogBase } from "@/lib/log/clientLogBase";
function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");

  if (trialsIndex >= 0) {
    return segments[trialsIndex + 2] ?? null;
  }

  const a2Index = segments.indexOf("a2");
  return a2Index >= 0 ? segments[a2Index + 1] ?? null : null;
}

const checkoutPath = getTrialPath("a2", "trial7", "checkout");

type RankingAwardDisplay = {
  rankingLabel?: string;
  awardLabel?: string;
};

function RankingAwardBadge({
  dpDisplay,
}: {
  dpDisplay: RankingAwardDisplay;
}) {
  return (
    <div className="flex h-full w-full min-w-0 flex-col justify-center overflow-hidden px-3 text-[14px] font-semibold leading-[22px] text-orange-700">
      {dpDisplay.rankingLabel ? (
        <span className="rounded bg-sky-100 px-2 py-1 text-[13px] font-semibold leading-none text-sky-700">
          {dpDisplay.rankingLabel}
        </span>
      ) : null}

      {dpDisplay.awardLabel ? (
        <span className="rounded bg-violet-100 px-2 py-1 text-[13px] font-semibold leading-none text-violet-700">
          {dpDisplay.awardLabel}
        </span>
      ) : null}
    </div>
  );
}

export default function ProductPageA2Trial7() {
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
        <div className="rounded-xl border border-red-200 bg-white p-6 text-sm text-red-700">
          URLに set または trial がありません。
        </div>
      </main>
    );
  }

  const products = trial7Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial7Data.purchaseConditions}
          title="商品一覧"
        />

        {/* 商品カード領域：160px * 4 + 60px * 3 = 820px */}
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
                  <RankingAwardBadge dpDisplay={product.dpDisplay} />
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