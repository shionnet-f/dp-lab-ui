"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ProductDetailModal } from "@/app/practice/_components/a2TrialComponents/ProductDetailModal";

type ProductForCard = {
    id: string;
    name: string;
    priceYen: number;
    description: string;
    specsAndNotes: string[];
    prePurchaseCheck: string[];
    deliveryInfo: string[];
    imageSrc: string;
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
        <article className="h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="grid h-full grid-cols-[520px_280px_360px]">
                <div className="h-full min-w-0 pl-[60px] pr-[20px]">
                    <div className="h-[10px]" />

                    <div className="flex h-[36px] min-w-0 items-center overflow-hidden">
                        <h2 className="truncate text-[22px] font-bold text-gray-900">
                            {product.name}
                        </h2>
                    </div>

                    <div className="h-[54px]" />

                    <div className="flex h-[40px] items-center overflow-hidden">
                        <p className="truncate text-[28px] font-bold text-gray-900">
                            ¥{yen(product.priceYen)}
                        </p>
                    </div>

                    <div className="h-[20px]" />
                </div>

                <div className="flex h-full min-w-0 items-center justify-center px-[20px]">
                    <div className="h-[50px] w-full min-w-0 overflow-hidden">
                        {dpArea ?? <div className="h-full w-full" aria-hidden="true" />}
                    </div>
                </div>

                <div className="flex h-full items-center justify-center">
                    <div className="flex items-center gap-[60px]">
                        <ProductDetailModal
                            product={product}
                            set={set}
                            nextPath={checkoutPath}
                            dpArea={dpArea}
                        />

                        <button
                            type="button"
                            className="flex h-[40px] w-[110px] items-center justify-center rounded-md bg-black text-[18px] font-bold text-white"
                            onClick={() => {
                                router.push(`${checkoutPath}?set=${set}&productId=${product.id}`);
                            }}
                        >
                            購入へ
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
