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
        <article className="h-[250px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="h-[15px]" />

            <div className="flex h-[30px] items-center px-5">
                <h2 className="text-base font-semibold text-gray-900">
                    お支払い金額
                </h2>
            </div>

            <div className="h-[15px]" />

            <div className="px-5">
                <div className="rounded-md border border-gray-200 p-4">
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">商品価格</span>
                            <span className="text-gray-900">
                                ¥{yen(productPriceYen)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">送料</span>
                            <span className="text-gray-900">
                                ¥{yen(shippingPriceYen)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">オプション料金</span>
                            <span className="text-gray-900">
                                ¥{yen(optionTotalYen)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                            <span className="font-semibold text-gray-900">合計</span>
                            <span className="text-3xl font-bold text-gray-900">
                                ¥{yen(totalYen)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}