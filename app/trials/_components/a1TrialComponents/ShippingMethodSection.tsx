"use client";

import { trackAction } from "@/app/actions/track";

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
                <h2 className="text-base font-semibold text-gray-900">配送方法</h2>
            </div>

            <div className="h-[60px]" />

            {shippingMethods.map((method, index) => (
                <div key={method.id}>
                    <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                        <input
                            type="radio"
                            name="shippingRadio"
                            checked={selectedShipping === method.id}
                            onChange={() => {
                                onChangeShipping(method.id);

                                trackAction({
                                    page: "checkout",
                                    type: "shipping_select",
                                    payload: {
                                        shippingId: method.id,
                                        price: method.priceYen,
                                    },
                                });
                            }}
                        />

                        <div className="leading-tight">
                            <div className="font-medium text-gray-900">{method.name}</div>
                            <div className="text-gray-600">{method.shortDescription}</div>
                            <div className="text-gray-700">¥{yen(method.priceYen)}</div>
                        </div>
                    </label>

                    {index < shippingMethods.length - 1 && <div className="h-[60px]" />}
                </div>
            ))}

            <div className="h-[15px]" />
        </article>
    );
}