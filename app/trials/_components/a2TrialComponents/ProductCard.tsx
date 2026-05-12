"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ProductDetailModal } from "@/app/trials/_components/a2TrialComponents/ProductDetailModal";
import { trackAction } from "@/app/actions/track";
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

type ProductDpDisplay = {
    label?: string;
    subLabel?: string;
    highlight?: string;
    rating?: number;
    reviewCount?: number;
    rankingLabel?: string;
    awardLabel?: string;
    subscriptionPriceYen?: number;
    displayPriceYen?: number;
    originalPriceYen?: number;
    relativeDeltaYen?: number;
    showFreeShipping?: boolean;
    showCountdown?: boolean;
    kind?: string;
    initialSeconds?: number;
    isDiscountTarget?: boolean;
    isDpTarget?: boolean;
    actualVolumeText?: string;
    emphasizedVolumeText?: string;
    boldPackText?: string;
    specLead?: string;
    specTail?: string;
};

type ProductForCard = {
    id: string;
    name: string;
    priceYen: number;
    description: string;
    specsAndNotes: readonly string[] | string;
    prePurchaseCheck: readonly string[];
    deliveryInfo: readonly string[];
    imageSrc: string;
    dpDisplay?: ProductDpDisplay | null;
};

type ProductCardProps = {
    product: ProductForCard;
    set: string;
    trial: string;
    checkoutPath: string;
    dpArea?: ReactNode;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

function getDisplayPriceYen(product: ProductForCard) {
    return product.dpDisplay?.subscriptionPriceYen ?? product.priceYen;
}

export function ProductCard({
    product,
    set,
    trial,
    checkoutPath,
    dpArea,
}: ProductCardProps) {
    const router = useRouter();

    function createLogBase() {
        const logParams = new URLSearchParams();
        logParams.set("set", set);
        logParams.set("trial", trial);

        return getClientLogBase({ searchParams: logParams });
    }

    return (
        <article className="h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="grid h-full grid-cols-[520px_280px_360px]">
                {/* 左側：商品名・価格 */}
                <div className="h-full min-w-0 pl-[60px] pr-[20px]">
                    <div className="h-[10px]" />

                    <div className="flex h-[30px] min-w-0 items-center overflow-hidden">
                        <h2 className="truncate text-[22px] font-bold leading-[42px] text-gray-900">
                            {product.name}
                        </h2>
                    </div>

                    <div className="h-[10px]" />

                    <div className="h-[60px]" />

                    <div className="h-[10px]" />

                    <div className="flex h-[30px] items-center overflow-hidden">
                        <p className="truncate text-[28px] font-bold text-gray-900">
                            ¥{yen(getDisplayPriceYen(product))}
                        </p>
                    </div>

                    <div className="h-[10px]" />
                </div>

                {/* 中央：DP領域 */}
                <div className="flex h-full min-w-0 items-center justify-center px-[20px]">
                    <div className="h-[50px] w-full min-w-0 overflow-hidden">
                        {dpArea ?? <div className="h-full w-full" aria-hidden="true" />}
                    </div>
                </div>

                {/* 右側：ボタン2つ */}
                <div className="flex h-full items-center justify-center">
                    <div className="flex items-center gap-[60px]">
                        <ProductDetailModal
                            product={product}
                            set={set}
                            trial={trial}
                            nextPath={checkoutPath}
                            dpArea={dpArea}
                        />

                        <button
                            type="button"
                            className="flex h-[40px] w-[110px] items-center justify-center rounded-md bg-black text-[18px] font-bold text-white"
                            onClick={async () => {
                                const baseLog = createLogBase();

                                await trackAction({
                                    ...baseLog,
                                    phase: "main",
                                    page: "product",
                                    type: "product_select",
                                    meta: { implTrialId: getImplTrialId() },
                                    payload: {
                                        productId: product.id,
                                        source: "card",
                                    },
                                });

                                router.push(
                                    `${checkoutPath}?set=${set}&trial=${trial}&productId=${product.id}`,
                                );
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