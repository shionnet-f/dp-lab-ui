"use client";

type ProductForConfirmOrderItem = {
    id: string;
    name: string;
    priceYen: number;
    description: string;
};

type ConfirmOrderItemPanelProps = {
    product: ProductForConfirmOrderItem;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function ConfirmOrderItemPanel({
    product,
}: ConfirmOrderItemPanelProps) {
    return (
        <section className="h-[160px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="grid h-full grid-cols-[200px_1fr_180px] px-5">
                {/* 左：画像 */}
                <div className="flex h-full items-center justify-center">
                    <div className="flex h-[120px] w-[160px] items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                        画像エリア
                    </div>
                </div>

                {/* 中央：商品名・説明 */}
                <div className="h-full min-w-0 pl-[20px] pr-[20px]">
                    <div className="h-[15px]" />

                    <div className="flex h-[30px] items-center">
                        <h2 className="text-base font-semibold text-gray-900">
                            ご注文商品
                        </h2>
                    </div>

                    <div className="h-[10px]" />

                    <div className="h-[36px] overflow-hidden text-[16px] font-medium leading-[18px] text-gray-900">
                        {product.name}
                    </div>

                    <div className="h-[10px]" />

                    <div className="h-[34px] overflow-hidden text-[14px] leading-[17px] text-gray-600">
                        {product.description}
                    </div>

                    <div className="h-[15px]" />
                </div>

                {/* 右：価格 */}
                <div className="flex h-full items-center justify-center">
                    <div className="text-[24px] font-semibold text-gray-900">
                        ¥{yen(product.priceYen)}
                    </div>
                </div>
            </div>
        </section>
    );
}