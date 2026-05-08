"use client";

type ShippingInfo = {
    id: string;
    name: string;
    priceYen: number;
    shortDescription: string;
};

type ConfirmShippingSectionProps = {
    shippingInfo: ShippingInfo | null;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function ConfirmShippingSection({
    shippingInfo,
}: ConfirmShippingSectionProps) {
    return (
        <section className="h-[145px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="h-[15px]" />

            <h2 className="flex h-[30px] items-center px-5 text-base font-semibold text-gray-900">
                配送方法
            </h2>

            <div className="h-[15px]" />

            <div className="h-[70px] px-5">
                {shippingInfo ? (
                    <div className="flex h-full min-w-0 items-center justify-between rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                        <span className="min-w-0 truncate pr-4">
                            {shippingInfo.name}
                        </span>

                        <span className="shrink-0">
                            ¥{yen(shippingInfo.priceYen)}
                        </span>
                    </div>
                ) : (
                    <div className="flex h-full items-center rounded-md border border-gray-200 px-4 text-sm text-gray-500">
                        未選択
                    </div>
                )}
            </div>

            <div className="h-[15px]" />
        </section>
    );
}