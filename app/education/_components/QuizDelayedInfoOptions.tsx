type QuizDelayedInfoOptionsProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

type Card = {
  id: string;
  productName: string;
  productPrice: string;
  summaryOpen: boolean;
  summaryRows: Array<{ label: string; value: string }>;
};

const cards: Card[] = [
  {
    id: "A",
    productName: "天然水 500ml × 24本",
    productPrice: "¥1,980",
    summaryOpen: true,
    summaryRows: [
      { label: "商品価格", value: "¥1,980" },
      { label: "送料", value: "¥0" },
      { label: "合計", value: "¥1,980" },
    ],
  },
  {
    id: "B",
    productName: "天然水 500ml × 24本",
    productPrice: "¥1,980",
    summaryOpen: true,
    summaryRows: [
      { label: "商品価格", value: "¥1,980" },
      { label: "送料", value: "¥0" },
      { label: "合計", value: "¥1,980" },
    ],
  },
  {
    id: "C",
    productName: "天然水 500ml × 24本",
    productPrice: "¥1,980",
    summaryOpen: false,
    summaryRows: [
      { label: "商品価格", value: "¥1,980" },
      { label: "送料", value: "¥500" },
      { label: "合計", value: "¥2,480" },
    ],
  },
];

function SummaryBox({ card }: { card: Card }) {
  if (!card.summaryOpen) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-2">
        <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
          <span>注文内容の詳細を見る</span>
          <span>＋</span>
        </div>
        <div className="mt-2 rounded-md bg-gray-50 px-3 py-2 text-[11px] leading-5 text-gray-500">
          送料や追加料金はこの中に表示されます。
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white p-2">
      <div className="mb-2 flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
        <span>注文内容の詳細</span>
        <span>－</span>
      </div>
      <div className="space-y-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs leading-5 text-gray-700">
        {card.summaryRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <span>{row.label}</span>
            <span className={row.label === "合計" ? "font-semibold text-gray-900" : ""}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function QuizDelayedInfoOptions({
  selectedId,
  onSelect,
}: QuizDelayedInfoOptionsProps) {
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
                <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                  checkout
                </div>

                <div className="min-h-[40px]">
                  <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
                    {card.productName}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-gray-800">{card.productPrice}</p>
                </div>

                <SummaryBox card={card} />

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex h-9 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-700">
                    戻る
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
