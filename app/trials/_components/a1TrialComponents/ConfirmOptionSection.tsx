// app/trials/_components/ConfirmOptionSection.tsx

type OptionItem = {
    id: string;
    name: string;
    priceYen: number;
    shortDescription: string;
};

type ConfirmOptionSectionProps = {
    selectedOptions: OptionItem[];
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function ConfirmOptionSection({
    selectedOptions,
}: ConfirmOptionSectionProps) {
    return (
        <section className="h-[275px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="h-[15px]" />

            <h2 className="h-[30px] px-5 text-base font-semibold text-gray-900 flex items-center">
                選択したオプション
            </h2>

            <div className="h-[15px]" />

            <div className="h-[200px] px-5">
                <div className="flex flex-col gap-[60px]">
                    {selectedOptions.length > 0 ? (
                        selectedOptions.slice(0, 2).map((option) => (
                            <div
                                key={option.id}
                                className="h-[70px] rounded-md border border-gray-200 px-4 text-sm text-gray-700 flex items-center justify-between"
                            >
                                <span className="truncate pr-4">{option.name}</span>
                                <span className="shrink-0">
                                    +¥{yen(option.priceYen)}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="h-[70px] rounded-md border border-gray-200 px-4 text-sm text-gray-500 flex items-center">
                            選択されたオプションはありません
                        </div>
                    )}
                </div>
            </div>

            <div className="h-[15px]" />
        </section>
    );
}

