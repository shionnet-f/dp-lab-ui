"use client";

type OptionItem = {
    id: string;
    name: string;
    priceYen: number;
    shortDescription: string;
};

type ConfirmOptionSectionProps = {
    selectedOptions: OptionItem[];
    optionTotalYen: number;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function ConfirmOptionSection({
    selectedOptions,
    optionTotalYen,
}: ConfirmOptionSectionProps) {
    return (
        <section className="h-[145px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="h-[15px]" />

            <h2 className="flex h-[30px] items-center px-5 text-base font-semibold text-gray-900">
                選択したオプション
            </h2>

            <div className="h-[15px]" />

            <div className="h-[70px] px-5">
                {selectedOptions.length > 0 ? (
                    <div className="flex h-full min-w-0 items-center justify-between rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                        <span className="min-w-0 truncate pr-4">
                            {selectedOptions.map((option) => option.name).join("、")}
                        </span>

                        <span className="shrink-0">
                            +¥{yen(optionTotalYen)}
                        </span>
                    </div>
                ) : (
                    <div className="flex h-full items-center rounded-md border border-gray-200 px-4 text-sm text-gray-500">
                        選択されたオプションはありません
                    </div>
                )}
            </div>

            <div className="h-[15px]" />
        </section>
    );
}