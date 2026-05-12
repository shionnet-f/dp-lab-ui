"use client";

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
    <article className="h-[312px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="h-[15px]" />

      <div className="flex h-[30px] items-center px-5">
        <h2 className="text-[20px] font-bold text-gray-900">追加オプション</h2>
      </div>

      <div className="h-[60px]" />

      {options.map((option, index) => {
        const selected = selectedOptions.includes(option.id);

        return (
          <div key={option.id}>
            <label className="mx-5 flex h-[66px] items-center gap-4 rounded-md border border-gray-200 px-4 text-gray-700">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => {
                  onToggleOption(option.id);
                }}
              />

              <div className="flex min-w-0 flex-1 items-center justify-between gap-6">
                <div className="min-w-0">
                  <div className="truncate text-[18px] font-bold leading-[24px] text-gray-900">
                    {option.name}
                  </div>
                  <div className="truncate text-[15px] font-semibold leading-[22px] text-gray-600">
                    {option.shortDescription}
                  </div>
                </div>

                <div className="shrink-0 text-[22px] font-bold text-gray-900">
                  +¥{yen(option.priceYen)}
                </div>
              </div>
            </label>

            {index < options.length - 1 && <div className="h-[60px]" />}
          </div>
        );
      })}

      <div className="h-[15px]" />
    </article>
  );
}
