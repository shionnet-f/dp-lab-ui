"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ProductDetailModal } from "@/app/practice/_components/a1TrialComponents/ProductDetailModal";

type ProductForCard = {
  id: string;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  imageSrc?: string;
};

type ProductCardProps = {
  product: ProductForCard;
  set: string;
  checkoutPath: string;
  dpArea?: ReactNode;
};

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

export function ProductCard({
  product,
  set,
  checkoutPath,
  dpArea,
}: ProductCardProps) {
  const router = useRouter();

  return (
    <article className="h-[378px] w-[550px] rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex h-full flex-col px-[60px]">
        <div className="h-[15px]" />

        <h2 className="h-[42px] overflow-hidden text-[22px] font-bold leading-[42px] text-gray-900">
          {product.name}
        </h2>

        <div className="h-[60px]" />

        <p className="h-[42px] overflow-hidden text-[28px] font-bold leading-[42px] text-gray-900">
          ¥{yen(product.priceYen)}
        </p>

        <div className="h-[60px]" />

        <div className="h-[42px] overflow-hidden">
          {dpArea ?? <div className="h-full w-full" aria-hidden="true" />}
        </div>

        <div className="h-[60px]" />

        <div className="grid h-[42px] grid-cols-2 gap-[60px]">
          <ProductDetailModal
            product={product}
            set={set}
            nextPath={checkoutPath}
            dpArea={dpArea}
          />

          <button
            className="flex items-center justify-center rounded-md bg-black text-[18px] font-bold text-white"
            onClick={() => {
              router.push(`${checkoutPath}?set=${set}&productId=${product.id}`);
            }}
          >
            購入へ
          </button>
        </div>

        <div className="h-[15px]" />
      </div>
    </article>
  );
}
