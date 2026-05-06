"use client";

type ProductForOrder = {
    name: string;
    priceYen: number;
};

type OrderItemPanelProps = {
    product: ProductForOrder;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function OrderItemPanel({ product }: OrderItemPanelProps) {
    return (
        <section className="h-[275px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="h-[15px]" />

            <h2 className="h-[30px] px-5 text-base font-semibold text-gray-900 flex items-center">
                ご注文商品
            </h2>

            <div className="h-[15px]" />

            <div className="flex h-[200px] px-5">
                {/* 左列：画像 */}
                <div className="h-[200px] w-[200px] shrink-0 rounded-lg bg-gray-100 text-sm text-gray-400 flex items-center justify-center">
                    画像エリア
                </div>

                {/* 列間：60px */}
                <div className="w-[60px]" />

                {/* 右列：商品名 + 価格 */}
                <div className="h-[200px] flex-1">
                    <div className="h-[70px] flex items-center text-sm font-medium leading-5 text-gray-900">
                        {product.name}
                    </div>

                    <div className="h-[60px]" />

                    <div className="h-[70px] flex items-center text-base font-semibold text-gray-900">
                        ¥{yen(product.priceYen)}
                    </div>
                </div>
            </div>
        </section>
    );
}




