"use client";

import { useRouter } from "next/navigation";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";

type ProductForOrderSummary = {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
};

type OrderSummaryPanelProps = {
  product: ProductForOrderSummary;
  set: string;
  trial: string;
  backPath: string;
};

export function OrderSummaryPanel({
  product,
  set,
  trial,
  backPath,
}: OrderSummaryPanelProps) {
  const router = useRouter();

  function createLogBase() {
    const logParams = new URLSearchParams();
    logParams.set("set", set);
    logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  return (
    <div className="flex h-[810px] w-[416px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
      <div className="h-[15px]" />

      <div className="flex h-[60px] items-center">
        <h2 className="text-[20px] font-bold text-gray-900">ご注文商品</h2>
      </div>

      <div className="flex h-[120px] w-full items-center justify-center rounded-lg bg-gray-100">
        <img
          src={product.imageSrc}
          alt=""
          className="h-[90px] w-[120px] object-contain"
        />
      </div>

      <div className="h-[60px]" />

      <div className="h-[44px] overflow-hidden text-[20px] font-bold leading-[24px] text-gray-900">
        {product.name}
      </div>

      <div className="h-[60px]" />

      <div className="h-[96px] overflow-hidden rounded-md border border-gray-200 p-3 text-[16px] font-medium leading-[24px] text-gray-700">
        {product.description}
      </div>

      <div className="h-[180px]" />

      <button
        type="submit"
        className="h-[50px] w-full cursor-pointer rounded-md bg-black px-4 text-[18px] font-bold text-white"
      >
        次へ進む
      </button>

      <div className="h-[60px]" />

      <button
        type="button"
        onClick={async () => {
          const baseLog = createLogBase();

          await trackAction({
            ...baseLog,
            phase: "main",
            page: "checkout",
            type: "checkout_back",
            meta: {},
            payload: {
              productId: product.id,
            },
          });

          router.push(`${backPath}?set=${set}&trial=${trial}`);
        }}
        className="flex h-[50px] w-full items-center justify-center rounded-md border border-gray-300 px-4 text-center text-[18px] font-bold text-gray-700 hover:bg-gray-50"
      >
        商品一覧へ戻る
      </button>

      <div className="h-[15px]" />
    </div>
  );
}
