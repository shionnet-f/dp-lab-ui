"use client";

import { useRouter } from "next/navigation";

type ConfirmSummaryPanelProps = {
  productId?: string;
  shippingId?: string;
  optionIds: string[];
  productPriceYen: number;
  shippingPriceYen: number;
  optionTotalYen: number;
  totalYen: number;
  completePath: string;
  backPath: string;
  onSubmit: () => void;
};

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

export function ConfirmSummaryPanel({
  productPriceYen,
  shippingPriceYen,
  optionTotalYen,
  totalYen,
  completePath,
  backPath,
  onSubmit,
}: ConfirmSummaryPanelProps) {
  const router = useRouter();

  return (
    <article className="flex h-[805px] w-[520px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex-1">
        <h2 className="mb-4 text-[20px] font-bold text-gray-900">
          お支払い金額
        </h2>

        <div className="rounded-md border border-gray-200 p-4">
          <div className="space-y-3 text-[18px] font-bold">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">商品価格</span>
              <span className="text-gray-900">¥{yen(productPriceYen)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">送料</span>
              <span className="text-gray-900">¥{yen(shippingPriceYen)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">オプション料金</span>
              <span className="text-gray-900">¥{yen(optionTotalYen)}</span>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
              <span className="text-gray-900">合計</span>
              <span className="text-[32px] font-bold text-gray-900">
                ¥{yen(totalYen)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[60px] pb-[15px]">
        <button
          type="button"
          onClick={() => {
            onSubmit();
          }}
          className="h-[50px] w-full rounded-md bg-black px-4 text-[18px] font-bold text-white"
        >
          購入を確定する
        </button>

        <button
          type="button"
          onClick={() => {
            router.push(backPath);
          }}
          className="flex h-[50px] w-full items-center justify-center rounded-md border border-gray-300 px-4 text-center text-[18px] font-bold text-gray-700"
        >
          戻る
        </button>
      </div>
    </article>
  );
}
