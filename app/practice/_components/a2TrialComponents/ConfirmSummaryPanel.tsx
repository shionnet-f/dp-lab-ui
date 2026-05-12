"use client";

type ConfirmSummaryPanelProps = {
    productPriceYen: number;
    shippingPriceYen: number;
    optionTotalYen: number;
    totalYen: number;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function ConfirmSummaryPanel({
    productPriceYen,
    shippingPriceYen,
    optionTotalYen,
    totalYen,
}: ConfirmSummaryPanelProps) {
    return (
        <article className="h-[250px] overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-[20px] font-bold leading-[28px] text-gray-900">
                お支払い金額
            </h2>

            <div className="mt-4 rounded-md border border-gray-200 px-4 py-3">
                <div className="space-y-2 text-[15px] font-semibold text-gray-600">
                    <div className="flex items-center justify-between">
                        <span>商品価格</span>
                        <span className="text-[18px] font-bold leading-none text-gray-900">
                            ¥{yen(productPriceYen)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span>送料</span>
                        <span className="text-[18px] font-bold leading-none text-gray-900">
                            ¥{yen(shippingPriceYen)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span>オプション料金</span>
                        <span className="text-[18px] font-bold leading-none text-gray-900">
                            ¥{yen(optionTotalYen)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                        <span className="text-[18px] font-bold text-gray-900">
                            合計
                        </span>
                        <span className="text-[26px] font-bold leading-none text-gray-900">
                            ¥{yen(totalYen)}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}
