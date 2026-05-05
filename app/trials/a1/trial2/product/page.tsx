"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useId } from "react";
import { useSearchParams } from "next/navigation";
import { trial2Data, type Trial2Product } from "../data";
import { trackAction } from "@/app/actions/track";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type ProductDetailModalProps = {
  product: Trial2Product;
  showViewer: boolean;
  viewerText?: string;
  set: string;
};

function ProductDetailModal({
  product,
  showViewer,
  viewerText,
  set,
}: ProductDetailModalProps) {
  const dialogId = useId();
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center bg-gray-500 text-[16px] text-white"
        onClick={() => {
          trackAction({
            page: "product",
            type: "view_detail",
            payload: { productId: product.id, },
          });
          const el = document.getElementById(dialogId) as HTMLDialogElement | null;
          el?.showModal();
        }} >
        詳細を見る
      </button>
      <dialog
        id={dialogId}
        className="fixed left-[470px] top-[110px] h-[860px] w-[980px] overflow-hidden p-0 backdrop:bg-black/70"
      >
        <div className="h-full w-full overflow-hidden bg-white">
          <div className="flex h-[70px] items-center justify-between border-b border-gray-300 px-[60px]">
            <h2 className="text-[24px] font-semibold text-gray-900">商品詳細</h2>

            <button
              type="button"
              className="h-[40px] w-[100px] border border-gray-300 bg-white text-[16px] font-semibold text-gray-700"
              onClick={() => {

                trackAction({
                  page: "product",
                  type: "close_detail",
                  payload: {
                    productId: product.id,
                  },
                });

                const el = document.getElementById(
                  dialogId
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
                  <p>毎日の使用を想定した定番商品です。購入前に内容をよく確認してください。</p>
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
                  <div className="flex h-full items-center justify-center border border-orange-400 bg-orange-100 px-3 text-[16px] font-semibold leading-[35px] text-orange-700">
                    <p className="truncate">{viewerText}</p>
                  </div>
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
                    payload: { productId: product.id, },
                  });
                  router.push(
                    `/trials/a1/trial1-1/checkout?set=${set}&productId=${product.id}`
                  );
                }} >
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

type ProductCardProps = {
  product: Trial2Product;
  showViewer: boolean;
  viewerText?: string;
  set: string;
};

function ProductCard({
  product,
  showViewer,
  viewerText,
  set,
}: ProductCardProps) {
  const router = useRouter();
  return (
    <article className="h-[378px] w-[550px] border border-gray-200 bg-white shadow-sm rounded-md">
      <div className="flex h-full flex-col px-[60px]">
        <div className="h-[15px]" />

        {/* 42px 商品名領域 */}
        <h2 className="h-[42px] overflow-hidden text-[20px] font-semibold leading-[42px] text-gray-900">
          {product.name}
        </h2>

        <div className="h-[60px]" />

        {/* 42px 価格領域 */}
        <p className="h-[42px] overflow-hidden text-[22px] font-semibold leading-[42px] text-gray-900">
          ¥{yen(product.priceYen)}
        </p>

        <div className="h-[60px]" />

        {/* 42px DP領域 */}
        <div className="h-[42px] overflow-hidden">
          {showViewer ? (
            <div className="flex h-full items-center justify-center border border-orange-400 bg-orange-100 px-3 text-[16px] font-semibold leading-[42px] text-orange-700">
              <p className="truncate">{viewerText}</p>
            </div>
          ) : (
            <div className="h-full w-full" aria-hidden="true" />
          )}
        </div>

        <div className="h-[60px]" />

        {/* 42px ボタン領域 */}
        <div className="grid h-[42px] grid-cols-2 gap-[60px]">
          <ProductDetailModal
            product={product}
            showViewer={showViewer}
            viewerText={viewerText}
            set={set}
          />

          <button
            className="flex items-center justify-center bg-gray-500 text-[16px] text-white"
            onClick={async () => {
              await trackAction({
                page: "product",
                type: "product_select",
                payload: { productId: product.id, },
              });
              router.push(
                `/trials/a1/trial2/checkout?set=${set}&productId=${product.id}`
              );
            }} > 購入へ
          </button>
        </div>

        <div className="h-[15px]" />
      </div>
    </article>
  );
}

export default function ProductPageA1Trial2() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");

  const didTrack = useRef(false);
  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    trackAction({
      page: "product",
      type: "page_view",
      meta: {},
      payload: {},
    });
  }, []);

  if (!set) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set がありません。
        </div>
      </main>
    );
  }

  const products = trial2Data.products;
  const viewerTexts = products.map((product) => product.dpDisplay?.label ?? "");
  const showViewerFlags = products.map((product) => Boolean(product.dpDisplay));

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        {/* 60pxの空間 */}
        <div className="h-[60px]" />

        {/* 45pxの条件領域 */}
        <div className="mx-auto flex h-[45px] w-[1160px] items-center border border-blue-200 bg-blue-50 px-[24px] text-[16px] text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{trial2Data.purchaseConditions.budgetYen}円以内、
          {trial2Data.purchaseConditions.quantityCondition}、
          {trial2Data.purchaseConditions.specificCondition}
        </div>

        {/* 60pxの見出し領域 */}
        <header className="mx-auto flex h-[60px] w-[1160px] items-center">
          <h1 className="text-[24px] font-bold text-gray-900">商品一覧</h1>
        </header>

        {/* 商品カード領域：378px + 60px + 378px */}
        <section className="mx-auto grid h-[816px] w-[1160px] grid-cols-2 grid-rows-[378px_378px] gap-x-[60px] gap-y-[60px] overflow-hidden">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              showViewer={showViewerFlags[index]}
              viewerText={viewerTexts[index]}
              set={set}
            />
          ))}
        </section>

        {/* 99pxの空間 */}
        <div className="h-[99px]" />
      </div>
    </main>
  );
}
