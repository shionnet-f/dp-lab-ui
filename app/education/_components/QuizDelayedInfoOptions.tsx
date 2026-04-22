type QuizDelayedInfoOptionsProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

type DelayedInfoCard = {
  id: string;
  productName: string;
  listPriceText: string;
  listSubText: string;
  checkoutLine1: string;
  checkoutLine2?: string;
  confirmTotalText: string;
  confirmNote?: string;
  isDelayed: boolean;
};

const cards: DelayedInfoCard[] = [
  {
    id: "A",
    productName: "天然水 500ml × 24本",
    listPriceText: "¥3,680",
    listSubText: "送料込み価格を表示",
    checkoutLine1: "通常配送：無料",
    checkoutLine2: "商品合計：¥3,680",
    confirmTotalText: "合計 ¥3,680",
    confirmNote: "価格情報は早い段階で確認できる",
    isDelayed: false,
  },
  {
    id: "B",
    productName: "天然水 500ml × 24本",
    listPriceText: "¥2,980 + 送料",
    listSubText: "商品一覧で送料の存在を表示",
    checkoutLine1: "通常配送：¥700",
    checkoutLine2: "商品合計：¥2,980",
    confirmTotalText: "合計 ¥3,680",
    confirmNote: "追加コストの存在が途中で分かる",
    isDelayed: false,
  },
  {
    id: "C",
    productName: "天然水 500ml × 24本",
    listPriceText: "¥2,980",
    listSubText: "商品一覧では本体価格のみ表示",
    checkoutLine1: "通常配送：¥700",
    checkoutLine2: "商品合計：¥2,980",
    confirmTotalText: "合計 ¥3,680",
    confirmNote: "送料がここで初めて具体表示される",
    isDelayed: true,
  },
];

function MiniStage({
  title,
  lines,
  emphasize,
}: {
  title: string;
  lines: string[];
  emphasize?: boolean;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-2.5">
      <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500">{title}</p>
      <div className="rounded-md border border-gray-200 bg-white p-2.5">
        {lines.map((line, index) => (
          <p
            key={`${title}-${index}`}
            className={[
              index === lines.length - 1 ? "mt-1.5" : "",
              index === lines.length - 1 ? "text-sm font-semibold" : "text-[11px] leading-4",
              emphasize && index === 0 ? "text-rose-600" : "text-gray-700",
            ].join(" ")}
          >
            {line}
          </p>
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
                <div className="rounded-lg border border-gray-200 bg-white p-2.5">
                  <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500">商品一覧</p>
                  <div className="flex h-14 items-center justify-between rounded-md bg-gray-50 px-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{card.productName}</p>
                      <p className="mt-0.5 text-[11px] text-gray-600">{card.listSubText}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{card.listPriceText}</p>
                  </div>
                </div>

                <MiniStage
                  title="checkout"
                  lines={[card.checkoutLine1, card.checkoutLine2 ?? ""]}
                  emphasize={card.isDelayed}
                />

                <MiniStage
                  title="confirm"
                  lines={card.confirmNote ? [card.confirmNote, card.confirmTotalText] : [card.confirmTotalText]}
                />

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex h-9 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-700">
                    戻る
                  </div>
                  <div className="flex h-9 items-center justify-center rounded-md bg-black text-sm font-medium text-white">
                    注文を確定
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
