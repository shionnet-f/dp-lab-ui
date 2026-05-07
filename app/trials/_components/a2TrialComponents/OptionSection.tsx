"use client";

import { trackAction } from "@/app/actions/track";

type OptionItem = {
    id: string;
    name: string;
    priceYen: number;
    shortDescription: string;
};

type OptionSectionProps = {
    options: OptionItem[];
    selectedOptions: string[];
    onToggleOption: (id: string) => void;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function OptionSection({
    options,
    selectedOptions,
    onToggleOption,
}: OptionSectionProps) {
    return (
        <article className="h-[438px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="h-[15px]" />

            <div className="flex h-[30px] items-center px-5">
                <h2 className="text-base font-semibold text-gray-900">
                    追加オプション
                </h2>
            </div>

            <div className="h-[123px]" />

            {options.map((option, index) => {
                const selected = selectedOptions.includes(option.id);

                return (
                    <div key={option.id}>
                        <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => {
                                    onToggleOption(option.id);

                                    void trackAction({
                                        page: "checkout",
                                        type: "option_toggle",
                                        payload: {
                                            optionId: option.id,
                                            selected: !selected,
                                            priceYen: option.priceYen,
                                        },
                                    });
                                }}
                            />

                            <div className="min-w-0 leading-tight">
                                <div className="truncate font-medium text-gray-900">
                                    {option.name}
                                </div>
                                <div className="truncate text-gray-600">
                                    {option.shortDescription}
                                </div>
                                <div className="text-gray-700">
                                    +¥{yen(option.priceYen)}
                                </div>
                            </div>
                        </label>

                        {index < options.length - 1 && <div className="h-[60px]" />}
                    </div>
                );
            })}

            <div className="h-[123px]" />
        </article>
    );
}