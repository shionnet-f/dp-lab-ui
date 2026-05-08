"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { trackAction } from "@/app/actions/track";

type ProductForDetailModal = {
  id: string;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  dpDisplay?: { label: string } | null;
};

type ProductDetailModalProps = {
  product: ProductForDetailModal;
  set: string;
  nextPath: string;
  dpArea?: ReactNode;
};

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

export function ProductDetailModal({
  product,
  set,
  nextPath,
  dpArea,
}: ProductDetailModalProps) {
  const dialogId = useId();
  const router = useRouter();

  const showViewer = Boolean(dpArea || product.dpDisplay);
  const viewerText = product.dpDisplay?.label;

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center bg-gray-500 text-[16px] text-white"
        onClick={() => {
          trackAction({
            page: "product",
            type: "view_detail",
            payload: { productId: product.id },
          });

          const el = document.getElementById(
            dialogId,
          ) as HTMLDialogElement | null;
          el?.showModal();
        }}
      >
        詳細を見る
      </button>

      <dialog
        id={dialogId}
        className="fixed left-[470px] top-[110px] h-[860px] w-[980px] overflow-hidden p-0 backdrop:bg-black/70"
      >
        <div className="h-full w-full overflow-hidden bg-white">
          <div className="flex h-[70px] items-center justify-between border-b border-gray-300 px-[60px]">
            <h2 className="text-[24px] font-semibold text-gray-900">
              商品詳細
            </h2>

            <button
              type="button"
              className="h-[40px] w-[100px] border border-gray-300 bg-white text-[16px] font-semibold text-gray-700"
              onClick={() => {
                trackAction({
                  page: "product",
                  type: "close_detail",
                  payload: { productId: product.id },
                });

                const el = document.getElementById(
                  dialogId,
                ) as HTMLDialogElement | null;
                el?.close();
              }}
            >
              閉じる
            </button>
          </div>

          <div className="flex h-[790px] overflow-hidden px-[60px]">
            <div className="flex w-[400px] flex-col">
              <div className="h-[60px]" />

              <section className="flex h-[160px] items-center justify-center border border-gray-300 bg-gray-100">
                画像エリア
              </section>

              <div className="h-[60px]" />

              <section className="h-[160px] overflow-hidden border border-gray-300 p-[16px]">
                <h3 className="mb-[12px] text-[16px] font-semibold text-gray-900">
                  商品説明
                </h3>
                <div className="text-[14px] leading-[22px] text-gray-600">
                  <p>{product.description}</p>
                  <p>
                    毎日の使用を想定した定番商品です。購入前に内容をよく確認してください。
                  </p>
                </div>
              </section>

              <div className="h-[60px]" />

              <section className="h-[160px] overflow-hidden border border-gray-300 p-[16px]">
                <h3 className="mb-[12px] text-[16px] font-semibold text-gray-900">
                  仕様・補足
                </h3>
                <div className="text-[14px] leading-[22px] text-gray-600">
                  {product.specsAndNotes.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </section>
            </div>

            <div className="w-[60px]" />

            <div className="flex w-[400px] flex-col">
              <div className="h-[60px]" />

              <div className="h-[35px]">
                {showViewer ? (
                  dpArea ? (
                    dpArea
                  ) : (
                    <div className="flex h-full items-center justify-center border border-orange-400 bg-orange-100 px-3 text-[16px] font-semibold leading-[35px] text-orange-700">
                      <p className="truncate">{viewerText}</p>
                    </div>
                  )
                ) : (
                  <div className="h-full w-full" aria-hidden="true" />
                )}
              </div>

              <div className="h-[60px]" />

              <h3 className="h-[35px] overflow-hidden text-[20px] font-bold leading-[35px] text-gray-900">
                {product.name}
              </h3>

              <div className="h-[60px]" />

              <p className="h-[35px] text-[22px] font-semibold leading-[35px] text-gray-900">
                ¥{yen(product.priceYen)}
              </p>

              <div className="h-[60px]" />

              <section className="h-[120px] overflow-hidden border border-gray-300 p-[16px]">
                <h4 className="mb-[12px] text-[16px] font-semibold text-gray-900">
                  購入前の確認
                </h4>
                <div className="text-[14px] leading-[22px] text-gray-700">
                  {product.prePurchaseCheck.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </section>

              <div className="h-[60px]" />

              <section className="h-[120px] overflow-hidden border border-gray-300 p-[16px]">
                <h4 className="mb-[12px] text-[16px] font-semibold text-gray-900">
                  配送に関わる情報
                </h4>
                <div className="text-[14px] leading-[22px] text-gray-700">
                  {product.deliveryInfo.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </section>

              <div className="h-[60px]" />

              <button
                className="flex h-[50px] items-center justify-center bg-black text-[16px] font-semibold text-white"
                onClick={async () => {
                  await trackAction({
                    page: "product",
                    type: "product_select",
                    payload: { productId: product.id },
                  });

                  router.push(`${nextPath}?set=${set}&productId=${product.id}`);
                }}
              >
                購入へ
              </button>

              <div className="h-[60px]" />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
