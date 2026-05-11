"use client";

type ProductForOrderItem = {
    id: string;
    name: string;
    priceYen: number;
    imageSrc: string;
};

type OrderItemPanelProps = {
    product: ProductForOrderItem;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function OrderItemPanel({ product }: OrderItemPanelProps) {
    return (
        <article className="h-[160px] w-[1160px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="grid h-full grid-cols-[200px_1fr]">
                {/* 左：画像領域 */}
                <div className="flex h-full items-center justify-center">
                    <div className="flex h-[120px] w-[160px] items-center justify-center overflow-hidden rounded-md bg-gray-50">
                        <img
                            src={product.imageSrc}
                            alt=""
                            className="max-h-[80px] max-w-[110px] object-contain"
                        />
                    </div>
                </div>

                {/* 右：商品名・価格 */}
                <div className="h-full min-w-0 pl-[20px] pr-[40px]">
                    <div className="h-[10px]" />

                    <div className="flex h-[30px] min-w-0 items-center overflow-hidden">
                        <h2 className="truncate text-[22px] font-bold text-gray-900">
                            {product.name}
                        </h2>
                    </div>

                    <div className="h-[10px]" />

                    <div className="h-[60px]" />

                    <div className="h-[10px]" />

                    <div className="flex h-[30px] items-center overflow-hidden">
                        <p className="truncate text-[28px] font-bold text-gray-900">
                            ¥{yen(product.priceYen)}
                        </p>
                    </div>

                    <div className="h-[10px]" />
                </div>
            </div>
        </article>
    );
}
