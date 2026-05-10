"use client";

import { useEffect, useId, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trial6Data, type Trial6Product } from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";

const checkoutPath = getTrialPath("b1", "trial6", "checkout");

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

function getDisplayPriceYen(product: Trial6Product) {
  return product.dpDisplay?.subscriptionPriceYen ?? product.priceYen;
}

type ProductDetailModalB1Trial6Props = {
  product: Trial6Product;
  set: string;
  trial: string;
};

function ProductDetailModalB1Trial6({
  product,
  set,
  trial,
}: ProductDetailModalB1Trial6Props) {
  const dialogId = useId();
  const router = useRouter();
  const displayPriceYen = getDisplayPriceYen(product);

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
            {/* 左側 */}
            <div className="flex w-[400px] flex-col">
              <div className="h-[60px]" />

              <section className="flex h-[160px] items-center justify-center border border-gray-300 bg-gray-100 text-[14px] text-gray-400">
                画像エリア
              </section>

              <div className="h-[60px]" />

              <section className="h-[160px] overflow-hidden border border-gray-300 p-[16px]">
                <h3 className="mb-[12px] h-[22px] text-[16px] font-semibold leading-[22px] text-gray-900">
                  商品説明
                </h3>

                <div className="h-[94px] overflow-hidden text-[14px] leading-[22px] text-gray-600">
                  <p>{product.description}</p>
                  <p>
                    毎日の使用を想定した定番商品です。購入前に内容をよく確認してください。
                  </p>
                </div>
              </section>

              <div className="h-[60px]" />

              {/* DP本体：スクロールしないと通常価格・定期購入情報が見えにくい */}
              <section className="h-[160px] overflow-hidden border border-gray-300 p-[16px]">
                <h3 className="mb-[12px] h-[22px] text-[16px] font-semibold leading-[22px] text-gray-900">
                  仕様・補足
                </h3>

                <div className="h-[94px] overflow-y-auto pr-[6px] text-[14px] leading-[22px] text-gray-600">
                  <div className="space-y-[8px]">
                    {product.specsAndNotes.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="w-[60px]" />

            {/* 右側 */}
            <div className="flex w-[400px] flex-col">
              <div className="h-[60px]" />

              <div className="h-[35px]" aria-hidden="true" />

              <div className="h-[60px]" />

              <h3 className="h-[35px] overflow-hidden text-[20px] font-bold leading-[35px] text-gray-900">
                {product.name}
              </h3>

              <div className="h-[60px]" />

              <p className="h-[35px] text-[22px] font-semibold leading-[35px] text-gray-900">
                ¥{yen(displayPriceYen)}
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
                type="button"
                className="flex h-[50px] items-center justify-center bg-black text-[16px] font-semibold text-white"
                onClick={async () => {
                  await trackAction({
                    page: "product",
                    type: "product_select",
                    payload: { productId: product.id },
                  });

                  router.push(
                    `${checkoutPath}?set=${set}&trial=${trial}&productId=${product.id}`,
                  );
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

type ProductCardB1Trial6Props = {
  product: Trial6Product;
  set: string;
  trial: string;
};

function ProductCardB1Trial6({ product, set, trial }: ProductCardB1Trial6Props) {
  const router = useRouter();
  const displayPriceYen = getDisplayPriceYen(product);

  return (
    <article className="h-[378px] w-[550px] rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex h-full flex-col px-[60px]">
        <div className="h-[15px]" />

        <h2 className="h-[42px] overflow-hidden text-[20px] font-semibold leading-[42px] text-gray-900">
          {product.name}
        </h2>

        <div className="h-[60px]" />

        <p className="h-[42px] overflow-hidden text-[22px] font-semibold leading-[42px] text-gray-900">
          ¥{yen(displayPriceYen)}
        </p>

        <div className="h-[60px]" />

        <div className="h-[42px] overflow-hidden">
          <div className="h-full w-full" aria-hidden="true" />
        </div>

        <div className="h-[60px]" />

        <div className="grid h-[42px] grid-cols-2 gap-[60px]">
          <ProductDetailModalB1Trial6 product={product} set={set} trial={trial} />

          <button
            className="flex items-center justify-center bg-gray-500 text-[16px] text-white"
            onClick={async () => {
              await trackAction({
                page: "product",
                type: "product_select",
                payload: { productId: product.id },
              });

              router.push(`${checkoutPath}?set=${set}&trial=${trial}&productId=${product.id}`);
            }}
          >
            購入へ
          </button>
        </div>

        <div className="h-[15px]" />
      </div>
    </article>
  );
}

export default function ProductPageB1Trial6() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");
  const trial = searchParams.get("trial");

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

  if (!set || !trial) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set または trial がありません。
        </div>
      </main>
    );
  }

  const products = trial6Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial6Data.purchaseConditions}
          title="商品一覧"
        />

        {/* 商品カード領域：378px + 60px + 378px */}
        <section className="mx-auto grid h-[816px] w-[1160px] grid-cols-2 grid-rows-[378px_378px] gap-x-[60px] gap-y-[60px] overflow-hidden">
          {products.map((product) => (
            <ProductCardB1Trial6 key={product.id} product={product} set={set} trial={trial} />
          ))}
        </section>

        {/* 99pxの空間 */}
        <div className="h-[99px]" />
      </div>
    </main>
  );
}
