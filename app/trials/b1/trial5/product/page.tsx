"use client";

import { useEffect, useId, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trial5Data, type Trial5Product } from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";

const checkoutPath = getTrialPath("b1", "trial5", "checkout");

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type ProductDetailModalB1Trial5Props = {
  product: Trial5Product;
  set: string;
};

function ProductDetailModalB1Trial5({
  product,
  set,
}: ProductDetailModalB1Trial5Props) {
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

          {/* 本文領域：790px */}
          <div className="h-[790px] overflow-hidden px-[60px]">
            <div className="h-[60px]" />

            {/* 上段：左に画像、右に商品名・価格 */}
            <div className="flex h-[220px] w-[860px] overflow-hidden">
              <section className="flex h-[220px] w-[400px] items-center justify-center border border-gray-300 bg-gray-100 text-[14px] text-gray-400">
                画像エリア
              </section>

              <div className="w-[60px]" />

              <section className="h-[220px] w-[400px] overflow-hidden border border-gray-300 p-[20px]">
                <h3 className="h-[70px] overflow-hidden text-[20px] font-bold leading-[35px] text-gray-900">
                  {product.name}
                </h3>

                <div className="h-[60px]" />

                <p className="h-[50px] overflow-hidden text-[22px] font-semibold leading-[50px] text-gray-900">
                  ¥{yen(product.priceYen)}
                </p>
              </section>
            </div>

            <div className="h-[60px]" />

            {/* 下段：横に広い説明領域 */}
            <section className="h-[280px] w-[860px] overflow-hidden border border-gray-300 p-[20px]">
              <h3 className="h-[30px] text-[16px] font-semibold leading-[30px] text-gray-900">
                商品説明
              </h3>

              <div className="h-[30px]" />

              <div className="h-[180px] overflow-y-auto text-[14px] leading-[24px] text-gray-600">
                <div className="space-y-[12px]">
                  {product.detailParagraphs.map((line, index) => (
                    <p key={`${product.id}-${index}`}>{line}</p>
                  ))}
                </div>
              </div>
            </section>

            <div className="h-[60px]" />

            {/* 下部：購入ボタン */}
            <div className="flex h-[50px] w-[860px] justify-end">
              <button
                type="button"
                className="flex h-[50px] w-[200px] items-center justify-center bg-black text-[16px] font-semibold text-white"
                onClick={async () => {
                  await trackAction({
                    page: "product",
                    type: "product_select",
                    payload: { productId: product.id },
                  });

                  router.push(
                    `${checkoutPath}?set=${set}&productId=${product.id}`,
                  );
                }}
              >
                購入へ
              </button>
            </div>

            <div className="h-[60px]" />
          </div>
        </div>
      </dialog>
    </>
  );
}

type ProductCardB1Trial5Props = {
  product: Trial5Product;
  set: string;
};

function ProductCardB1Trial5({ product, set }: ProductCardB1Trial5Props) {
  const router = useRouter();

  return (
    <article className="h-[378px] w-[550px] rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex h-full flex-col px-[60px]">
        <div className="h-[15px]" />

        <h2 className="h-[42px] overflow-hidden text-[20px] font-semibold leading-[42px] text-gray-900">
          {product.name}
        </h2>

        <div className="h-[60px]" />

        <p className="h-[42px] overflow-hidden text-[22px] font-semibold leading-[42px] text-gray-900">
          ¥{yen(product.priceYen)}
        </p>

        <div className="h-[60px]" />

        <div className="h-[42px] overflow-hidden">
          <div className="h-full w-full" aria-hidden="true" />
        </div>

        <div className="h-[60px]" />

        <div className="grid h-[42px] grid-cols-2 gap-[60px]">
          <ProductDetailModalB1Trial5 product={product} set={set} />

          <button
            className="flex items-center justify-center bg-gray-500 text-[16px] text-white"
            onClick={async () => {
              await trackAction({
                page: "product",
                type: "product_select",
                payload: { productId: product.id },
              });

              router.push(`${checkoutPath}?set=${set}&productId=${product.id}`);
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

export default function ProductPageB1Trial5() {
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

  const products = trial5Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial5Data.purchaseConditions}
          title="商品一覧"
        />

        {/* 商品カード領域：378px + 60px + 378px */}
        <section className="mx-auto grid h-[816px] w-[1160px] grid-cols-2 grid-rows-[378px_378px] gap-x-[60px] gap-y-[60px] overflow-hidden">
          {products.map((product) => (
            <ProductCardB1Trial5 key={product.id} product={product} set={set} />
          ))}
        </section>

        {/* 99pxの空間 */}
        <div className="h-[99px]" />
      </div>
    </main>
  );
}
