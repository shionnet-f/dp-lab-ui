"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ProductDetailModal } from "@/app/trials/_components/a2TrialComponents/ProductDetailModal";
import { trial5Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getClientLogBase } from "@/lib/log/clientLogBase";
function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");
  if (trialsIndex >= 0) return segments[trialsIndex + 2] ?? null;
  const setIdIndex = segments.findIndex((segment) => ["a1", "a2", "b1", "b2"].includes(segment));
  return setIdIndex >= 0 ? segments[setIdIndex + 1] ?? null : null;
}

const checkoutPath = getTrialPath("b2", "trial5", "checkout");

export default function ProductPageB2Trial5() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");
  const trial = searchParams.get("trial");
  const didTrack = useRef(false);

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;
    const baseLog = getClientLogBase({ searchParams });
    void trackAction({ ...baseLog, phase: "main", page: "product", type: "page_view", meta: { implTrialId: getImplTrialId() }, payload: {} });
  }, []);

  if (!set || !trial) return <main className="flex h-screen items-center justify-center bg-gray-50"><div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">URLに set または trial がありません。</div></main>;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader purchaseConditions={trial5Data.purchaseConditions} title="商品一覧" />
        <section className="mx-auto flex h-[820px] w-[1160px] flex-col gap-[60px] overflow-hidden">
          {trial5Data.products.map((product) => (
            <article key={product.id} className="h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="grid h-full grid-cols-[220px_580px_360px]">
                <div className="flex h-full items-center justify-center pl-[60px]">
                  <div className="flex h-[120px] w-[160px] items-center justify-center overflow-hidden rounded-md bg-gray-50"><img src={product.imageSrc} alt="" className="max-h-[80px] max-w-[110px] object-contain" /></div>
                </div>
                <div className="flex h-full min-w-0 items-center px-[20px]">
                  <h2 className="truncate text-[22px] font-bold leading-[42px] text-gray-900">{product.name}</h2>
                </div>
                <div className="flex h-full items-center justify-center">
                  <ProductDetailModal product={product} set={set} trial={trial} nextPath={checkoutPath} />
                </div>
              </div>
            </article>
          ))}
        </section>
        <div className="h-[95px]" />
      </div>
    </main>
  );
}
