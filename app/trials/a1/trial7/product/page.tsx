"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/app/trials/_components/a1TrialComponents/ProductCard";
import { trial7Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";

const checkoutPath = getTrialPath("a1", "trial7", "checkout");

export default function ProductPageA1Trial7() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");

  const didTrack = useRef(false);

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    trackAction({
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

  const products = trial7Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial7Data.purchaseConditions}
          title="商品一覧"
        />

        <section className="mx-auto grid h-[816px] w-[1160px] grid-cols-2 grid-rows-[378px_378px] gap-x-[60px] gap-y-[60px] overflow-hidden">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              set={set}
              checkoutPath={checkoutPath}
              dpArea={
                product.dpDisplay ? (
                  <div className="flex h-full items-center justify-center overflow-hidden">
                    <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
                      {product.dpDisplay.rankingLabel ? (
                        <span className="rounded bg-sky-100 px-2 py-1 text-[13px] font-semibold leading-none text-sky-700">
                          {product.dpDisplay.rankingLabel}
                        </span>
                      ) : null}

                      {product.dpDisplay.awardLabel ? (
                        <span className="rounded bg-violet-100 px-2 py-1 text-[13px] font-semibold leading-none text-violet-700">
                          {product.dpDisplay.awardLabel}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ) : null
              }
            />
          ))}
        </section>

        <div className="h-[99px]" />
      </div>
    </main>
  );
}