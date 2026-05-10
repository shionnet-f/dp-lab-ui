"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trial2Data, type Trial2Product } from "../data";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";

const checkoutPath = getTrialPath("b1", "trial2", "checkout");

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type ProductDetailModalB1Trial2Props = {
  product: Trial2Product;
  set: string;
  trial: string;
};

function ProductDetailModalB1Trial2({
  product,
  set,
  trial,
}: ProductDetailModalB1Trial2Props) {
  const dialogId = useId();
  const router = useRouter();


  function createLogBase() {
    const logParams = new URLSearchParams();

    if (set) logParams.set("set", set);
    if (trial) logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }
  const [isExtraOpen, setIsExtraOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex h-[42px] w-[180px] items-center justify-center border border-gray-300 bg-white text-[16px] font-semibold text-gray-700"
        onClick={async () => {
          await trackAction({
            ...createLogBase(),
            phase: "main",
            page: "product",
            type: "view_detail",
            meta: { implTrialId: "trial2" },
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
        onClose={() => setIsExtraOpen(false)}
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
                void trackAction({
                  ...createLogBase(),
                  phase: "main",
                  page: "product",
                  type: "close_detail",
                  meta: { implTrialId: "trial2" },
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

              <section className="flex h-[160px] items-center justify-center border border-gray-300 bg-gray-100 text-[14px] text-gray-400">
                画像エリア
              </section>

              <div className="h-[60px]" />

              <section className="h-[160px] overflow-hidden border border-gray-300 p-[16px]">
                <h3 className="mb-[12px] text-[16px] font-semibold text-gray-900">
                  商品説明
                </h3>

                <p className="text-[14px] leading-[22px] text-gray-600">
                  {product.description}
                </p>
              </section>

              <div className="h-[60px]" />

              <section className="h-[160px] overflow-hidden border border-gray-300 p-[16px]">
                <div className="flex h-[24px] items-center justify-between">
                  <h3 className="text-[16px] font-semibold leading-[24px] text-gray-900">
                    仕様・補足
                  </h3>

                  <button
                    type="button"
                    className="h-[24px] text-[13px] leading-[24px] text-gray-500 underline underline-offset-2"
                    onClick={() => {
                      const next = !isExtraOpen;
                      setIsExtraOpen(next);

                      void trackAction({
                        ...createLogBase(),
                        phase: "main",
                        page: "product",
                        type: next
                          ? "open_hidden_detail"
                          : "close_hidden_detail",
                        meta: { implTrialId: "trial2" },
                        payload: { productId: product.id },
                      });
                    }}
                  >
                    {isExtraOpen
                      ? "閉じる"
                      : (product.hiddenDetailsTitle ?? "さらに詳細を見る")}
                  </button>
                </div>

                <div className="mt-[12px] h-[92px] overflow-hidden text-[14px] leading-[22px] text-gray-600">
                  {isExtraOpen ? (
                    <div className="h-full overflow-y-auto">
                      {product.specsAndNotes.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full w-full" aria-hidden="true" />
                  )}
                </div>
              </section>
            </div>

            <div className="w-[60px]" />

            <div className="flex w-[400px] flex-col">
              <div className="h-[60px]" />

              <div className="h-[35px]" aria-hidden="true" />

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
                type="button"
                className="flex h-[50px] items-center justify-center bg-black text-[16px] font-semibold text-white"
                onClick={async () => {
                  await trackAction({
                    ...createLogBase(),
                    phase: "main",
                    page: "product",
                    type: "product_select",
                    meta: { implTrialId: "trial2" },
                    payload: {
                      productId: product.id,
                      source: "detail_modal",
                    },
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

type ProductCardB1Trial2Props = {
  product: Trial2Product;
  set: string;
  trial: string;
};

function ProductCardB1Trial2({ product, set, trial }: ProductCardB1Trial2Props) {
  const router = useRouter();
  function createLogBase() {
    const logParams = new URLSearchParams();

    if (set) logParams.set("set", set);
    if (trial) logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  return (
    <article className="h-[378px] w-[550px] overflow-hidden border border-gray-300 bg-white px-[60px]">
      <div className="h-[15px]" />

      <h2 className="h-[42px] overflow-hidden text-[22px] font-bold leading-[42px] text-gray-900">
        {product.name}
      </h2>

      <div className="h-[60px]" />

      <p className="h-[42px] text-[24px] font-semibold leading-[42px] text-gray-900">
        ¥{yen(product.priceYen)}
      </p>

      <div className="h-[60px]" />

      <div className="h-[42px]" aria-hidden="true" />

      <div className="h-[60px]" />

      <div className="flex h-[42px] items-center justify-between">
        <ProductDetailModalB1Trial2 product={product} set={set} trial={trial} />

        <button
          type="button"
          className="flex h-[42px] w-[180px] items-center justify-center bg-black text-[16px] font-semibold text-white"
          onClick={async () => {
            await trackAction({
              ...createLogBase(),
              phase: "main",
              page: "product",
              type: "product_select",
              meta: { implTrialId: "trial2" },
              payload: {
                productId: product.id,
                source: "product_card",
              },
            });

            router.push(`${checkoutPath}?set=${set}&trial=${trial}&productId=${product.id}`);
          }}
        >
          購入へ
        </button>
      </div>

      <div className="h-[15px]" />
    </article>
  );
}

export default function ProductPageB1Trial2() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");
  const trial = searchParams.get("trial");

  const didTrack = useRef(false);
  function createLogBase() {
    const logParams = new URLSearchParams();

    if (set) logParams.set("set", set);
    if (trial) logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    trackAction({
      ...createLogBase(),
      phase: "main",
      page: "product",
      type: "page_view",
      meta: { implTrialId: "trial2" },
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

  const products = trial2Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial2Data.purchaseConditions}
          title="商品一覧"
        />

        {/* 商品カード領域：378px + 60px + 378px */}
        <section className="mx-auto grid h-[816px] w-[1160px] grid-cols-2 grid-rows-[378px_378px] gap-x-[60px] gap-y-[60px] overflow-hidden">
          {products.map((product) => (
            <ProductCardB1Trial2 key={product.id} product={product} set={set} trial={trial} />
          ))}
        </section>

        {/* 99pxの空間 */}
        <div className="h-[99px]" />
      </div>
    </main>
  );
}
