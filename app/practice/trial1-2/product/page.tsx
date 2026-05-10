"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/app/practice/_components/a1TrialComponents/ProductCard";
import { practice1_2Data } from "../data";
import { getPracticePath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/practice/_components/TrialPageHeader";

const checkoutPath = getPracticePath("trial1-2", "checkout");

export default function ProductPagePracticeTrial1_1() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");

  if (!set) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set がありません。
        </div>
      </main>
    );
  }

  const products = practice1_2Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={practice1_2Data.purchaseConditions}
          title="商品一覧"
        />

        {/* 商品カード領域：378px + 60px + 378px */}
        <section className="mx-auto grid h-[816px] w-[1160px] grid-cols-2 grid-rows-[378px_378px] gap-x-[60px] gap-y-[60px] overflow-hidden">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              set={set}
              checkoutPath={checkoutPath}
              dpArea={
                product.dpDisplay ? (
                  <div className="flex h-full items-center justify-center border border-orange-400 bg-orange-100 px-3 text-[16px] font-semibold leading-[42px] text-orange-700">
                    <p className="truncate">{product.dpDisplay}</p>
                  </div>
                ) : undefined
              }
            />
          ))}
        </section>

        {/* 99pxの空間 */}
        <div className="h-[99px]" />
      </div>
    </main>
  );
}
