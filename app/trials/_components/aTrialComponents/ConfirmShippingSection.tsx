type ShippingMethod = {
    id: string;
    name: string;
    priceYen: number;
    shortDescription: string;
};

type ConfirmShippingSectionProps = {
    shippingMethod?: ShippingMethod | null;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function ConfirmShippingSection({
    shippingMethod,
}: ConfirmShippingSectionProps) {
    return (
        <section className="h-[145px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="h-[15px]" />

            <h2 className="h-[30px] px-5 text-base font-semibold text-gray-900 flex items-center">
                配送方法
            </h2>

            <div className="h-[15px]" />

            <div className="h-[70px] px-5">
                {shippingMethod ? (
                    <div className="flex h-full border border-gray-200 px-4 items-center justify-between text-sm text-gray-700">
                        <span className="truncate pr-4">{shippingMethod.name}</span>
                        <span className="shrink-0">
                            ¥{yen(shippingMethod.priceYen)}
                        </span>
                    </div>
                ) : (
                    <div className="flex h-full border border-gray-200 px-4 items-center text-gray-500">
                        未選択
                    </div>
                )}
            </div>

            <div className="h-[15px]" />
        </section>
    );
}

