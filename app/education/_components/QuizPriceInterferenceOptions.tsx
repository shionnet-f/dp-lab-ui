type QuizPriceInterferenceOptionsProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

type PriceCard = {
  id: string;
  productName: string;
  originalPriceText?: string;
  discountedPriceText?: string;
  regularPriceText?: string;
  isDp: boolean;
};

const cards: PriceCard[] = [
  {
    id: "A",
    productName: "天然水 350ml × 12本",
    regularPriceText: "¥7,480",
    isDp: false,
  },
  {
    id: "B",
    productName: "天然水 350ml × 12本",
    regularPriceText: "¥7,480",
    isDp: false,
  },
  {
    id: "C",
    productName: "天然水 350ml × 12本",
    originalPriceText: "¥7,480",
    discountedPriceText: "¥5,980",
    isDp: true,
  },
];

function PriceInfo({
  originalPriceText,
  discountedPriceText,
  regularPriceText,
  isDp,
}: {
  originalPriceText?: string;
  discountedPriceText?: string;
  regularPriceText?: string;
  isDp: boolean;
}) {
  if (isDp) {
    return (
      <div className="flex h-12 items-center rounded-md bg-white px-3">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-500 line-through">
            {originalPriceText}
          </span>
          <span className="text-sm font-bold text-gray-400">→</span>
          <span className="text-xl font-bold leading-none text-rose-600">
            {discountedPriceText}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-12 items-center rounded-md bg-white px-3">
      <p className="text-base font-semibold text-gray-900">{regularPriceText}</p>
    </div>
  );
}

export default function QuizPriceInterferenceOptions({
  selectedId,
  onSelect,
}: QuizPriceInterferenceOptionsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {cards.map((card) => {
        const isSelected = selectedId === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card.id)}
            className={[
              "relative w-full rounded-xl border bg-white p-3 text-left shadow-sm transition",
              "focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
              isSelected
                ? "border-gray-900 ring-2 ring-gray-900/10"
                : "border-gray-200 hover:border-gray-400",
            ].join(" ")}
          >
            <span
              className={[
                "absolute left-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold",
                isSelected
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-700",
              ].join(" ")}
            >
              {card.id}
            </span>

            <article className="rounded-xl border border-gray-200 bg-white p-3 pt-8">
              <div className="grid gap-3">
                <div className="flex h-28 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                  画像エリア
                </div>

                <div className="min-h-[48px]">
                  <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
                    {card.productName}
                  </h2>
                </div>

                <PriceInfo
                  originalPriceText={card.originalPriceText}
                  discountedPriceText={card.discountedPriceText}
                  regularPriceText={card.regularPriceText}
                  isDp={card.isDp}
                />

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex h-9 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-700">
                    詳細を見る
                  </div>

                  <div className="flex h-9 items-center justify-center rounded-md bg-black text-sm font-medium text-white">
                    購入へ
                  </div>
                </div>
              </div>
            </article>
          </button>
        );
      })}
    </div>
  );
}
