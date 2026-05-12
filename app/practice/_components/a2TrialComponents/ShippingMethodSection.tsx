"use client";

type ShippingMethod = {
    id: string;
    name: string;
    priceYen: number;
    shortDescription: string;
};

type ShippingMethodSectionProps = {
    shippingMethods: ShippingMethod[];
    selectedShipping: string | null;
    onChangeShipping: (id: string) => void;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function ShippingMethodSection({
    shippingMethods,
    selectedShipping,
    onChangeShipping,
}: ShippingMethodSectionProps) {
    return (
        <article className="h-[438px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="h-[15px]" />

            <div className="flex h-[30px] items-center px-5">
                <h2 className="text-[20px] font-bold text-gray-900">
                    配送方法
                </h2>
            </div>

            <div className="h-[60px]" />

            {shippingMethods.map((method, index) => (
                <div key={method.id}>
                    <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-gray-700">
                        <input
                            type="radio"
                            name="shippingRadio"
                            checked={selectedShipping === method.id}
                            onChange={() => {
                                onChangeShipping(method.id);
                            }}
                        />

                        <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                            <div className="min-w-0 leading-tight">
                                <div className="truncate text-[18px] font-bold text-gray-900">
                                    {method.name}
                                </div>
                                <div className="mt-1 truncate text-[15px] font-semibold text-gray-600">
                                    {method.shortDescription}
                                </div>
                            </div>

                            <div className="shrink-0 text-right text-[22px] font-bold text-gray-900">
                                ¥{yen(method.priceYen)}
                            </div>
                        </div>
                    </label>

                    {index < shippingMethods.length - 1 && (
                        <div className="h-[60px]" />
                    )}
                </div>
            ))}

            <div className="h-[15px]" />
        </article>
    );
}
