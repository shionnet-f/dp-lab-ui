type QuizHiddenInfoOptionsProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

type HiddenInfoCard = {
  id: string;
  productName: string;
  price: string;
  mode: "normal" | "buried";
};

const cards: HiddenInfoCard[] = [
  {
    id: "A",
    productName: "炭酸水 500ml × 24本",
    price: "¥2,980",
    mode: "normal",
  },
  {
    id: "B",
    productName: "炭酸水 500ml × 24本",
    price: "¥2,980",
    mode: "buried",
  },
  {
    id: "C",
    productName: "炭酸水 500ml × 24本",
    price: "¥2,980",
    mode: "normal",
  },
];

function DetailPanel({ mode }: { mode: HiddenInfoCard["mode"] }) {
  if (mode === "buried") {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-2.5">
        <p className="mb-2 text-xs font-semibold text-gray-700">仕様・補足</p>
        <div className="h-24 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 text-[11px] leading-5 text-gray-600">
          本商品は炭酸の刺激と飲みやすさを両立した日常使い向けの飲料です。保存方法や配送時の取り扱い、
          ラベル仕様、再注文時の条件などをご確認ください。初回は通常価格でのご案内となりますが、
          お届けサイクルや数量変更の可否、停止手続きの期限、更新の取り扱いなどにも注意が必要です。
          ご利用前には必ず詳細条件をご確認ください。なお、
          <span className="font-medium text-gray-800">2回目以降は定期購入として毎月自動配送</span>
          されます。解約は次回発送予定日の前日までマイページから可能です。その他の詳細条件は利用規約を参照してください。
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-2.5">
      <p className="mb-2 text-xs font-semibold text-gray-700">仕様・補足</p>
      <div className="rounded-md border border-gray-200 bg-white p-2 text-[11px] leading-5 text-gray-700">
        <p>・内容量：500ml × 24本</p>
        <p>・価格：通常価格 ¥2,980</p>
        <p>・購入形態：単品購入</p>
        <p>・配送：通常配送 / 送料無料</p>
      </div>
    </div>
  );
}

export default function QuizHiddenInfoOptions({
  selectedId,
  onSelect,
}: QuizHiddenInfoOptionsProps) {
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
                <div className="flex h-20 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                  画像エリア
                </div>

                <div className="min-h-[40px]">
                  <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
                    {card.productName}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-gray-800">{card.price}</p>
                </div>

                <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
                  <DetailPanel mode={card.mode} />
                </div>

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
