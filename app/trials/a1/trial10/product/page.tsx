"use client";

import { useEffect, useId, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trial10Data, type Trial10Product } from "../data";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";

function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");

  if (trialsIndex >= 0) {
    return segments[trialsIndex + 2] ?? null;
  }

  const a1Index = segments.indexOf("a1");
  return a1Index >= 0 ? segments[a1Index + 1] ?? null : null;
}

const checkoutPath = getTrialPath("a1", "trial10", "checkout");

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type PriceBlockProps = {
  basePriceYen: number;
  originalPriceYen?: number;
  displayPriceYen?: number;
  showDiscount: boolean;
  large?: boolean;
};

function PriceBlock({
  basePriceYen,
  originalPriceYen,
  displayPriceYen,
  showDiscount,
  large = false,
}: PriceBlockProps) {
  if (showDiscount && originalPriceYen && displayPriceYen) {
    return (
      <div className="flex items-end gap-3 overflow-hidden">
        <span
          className={
            large
              ? "text-[18px] leading-none text-gray-500 line-through"
              : "text-[16px] leading-none text-gray-500 line-through"
          }
        >
          ¥{yen(originalPriceYen)}
        </span>

        <span
          className={
            large
              ? "text-[30px] font-bold leading-none text-red-600"
              : "text-[28px] font-bold leading-none text-red-600"
          }
        >
          ¥{yen(displayPriceYen)}
        </span>
      </div>
    );
  }

  return (
    <p
      className={
        large
          ? "text-[26px] font-bold leading-[35px] text-gray-900"
          : "text-[28px] font-bold leading-[42px] text-gray-900"
      }
    >
      ¥{yen(basePriceYen)}
    </p>
  );
}

type ProductDetailModalProps = {
  product: Trial10Product;
  set: string;
  trial: string;
  showDiscount: boolean;
};

function ProductDetailModal({
  product,
  set,
  trial,
  showDiscount,
}: ProductDetailModalProps) {
  const dialogId = useId();
  const router = useRouter();
  const dp = product.dpDisplay;

  function createBaseLog() {
    const logParams = new URLSearchParams();
    logParams.set("set", set);
    logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center rounded-md border border-gray-300 text-[18px] font-bold text-black"
        onClick={() => {
          const baseLog = createBaseLog();

          void trackAction({
            ...baseLog,
            phase: "main",
            page: "product",
            type: "view_detail",
            meta: { implTrialId: getImplTrialId() },
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
        className="fixed left-[470px] top-[110px] h-[860px] w-[980px] overflow-hidden rounded-md p-0 backdrop:bg-black/70"
      >
        <div className="h-full w-full overflow-hidden bg-white">
          <div className="flex h-[70px] items-center justify-between border-b border-gray-300 px-[60px]">
            <h2 className="text-[28px] font-bold text-gray-900">商品詳細</h2>

            <button
              type="button"
              className="h-[40px] w-[100px] border border-gray-300 bg-white text-[17px] font-bold text-gray-700"
              onClick={() => {
                const baseLog = createBaseLog();

                void trackAction({
                  ...baseLog,
                  phase: "main",
                  page: "product",
                  type: "close_detail",
                  meta: { implTrialId: getImplTrialId() },
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

              <div className="flex h-[120px] w-full items-center justify-center bg-gray-50">
                <img
                  src={product.imageSrc}
                  alt=""
                  className="max-h-[80px] max-w-[110px] object-contain"
                />
              </div>

              <div className="h-[60px]" />

              <section className="h-[160px] overflow-hidden border border-gray-300 p-[16px]">
                <h3 className="mb-[12px] text-[18px] font-bold text-gray-900">
                  商品説明
                </h3>
                <div className="text-[15px] font-medium leading-[23px] text-gray-600">
                  <p>{product.description}</p>
                </div>
              </section>

              <div className="h-[60px]" />

              <section className="h-[160px] overflow-hidden border border-gray-300 p-[16px]">
                <h3 className="mb-[12px] text-[18px] font-bold text-gray-900">
                  仕様・補足
                </h3>
                <div className="text-[15px] font-medium leading-[23px] text-gray-600">
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
                <div className="h-full w-full" aria-hidden="true" />
              </div>

              <div className="h-[60px]" />

              <h3 className="h-[35px] overflow-hidden text-[22px] font-bold leading-[35px] text-gray-900">
                {product.name}
              </h3>

              <div className="h-[60px]" />

              <div className="flex h-[35px] items-center overflow-hidden">
                <PriceBlock
                  basePriceYen={product.priceYen}
                  originalPriceYen={dp?.originalPriceYen}
                  displayPriceYen={dp?.displayPriceYen}
                  showDiscount={showDiscount}
                  large
                />
              </div>

              <div className="h-[60px]" />

              <section className="h-[120px] overflow-hidden border border-gray-300 p-[16px]">
                <h4 className="mb-[12px] text-[18px] font-bold text-gray-900">
                  購入前の確認
                </h4>
                <div className="text-[15px] font-medium leading-[23px] text-gray-700">
                  {product.prePurchaseCheck.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </section>

              <div className="h-[60px]" />

              <section className="h-[120px] overflow-hidden border border-gray-300 p-[16px]">
                <h4 className="mb-[12px] text-[18px] font-bold text-gray-900">
                  配送に関わる情報
                </h4>
                <div className="text-[15px] font-medium leading-[23px] text-gray-700">
                  {product.deliveryInfo.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </section>

              <div className="h-[60px]" />

              <button
                className="flex h-[50px] items-center justify-center rounded-md bg-black text-[18px] font-bold text-white"
                onClick={async () => {
                  const baseLog = createBaseLog();

                  await trackAction({
                    ...baseLog,
                    phase: "main",
                    page: "product",
                    type: "product_select",
                    meta: { implTrialId: getImplTrialId() },
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

type ProductCardProps = {
  product: Trial10Product;
  set: string;
  trial: string;
};

function ProductCard({ product, set, trial }: ProductCardProps) {
  const router = useRouter();
  const dp = product.dpDisplay;
  const showDiscount = Boolean(dp?.isDiscountTarget);

  function createBaseLog() {
    const logParams = new URLSearchParams();
    logParams.set("set", set);
    logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  return (
    <article className="h-[378px] w-[550px] rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex h-full flex-col px-[60px]">
        <div className="h-[15px]" />

        <h2 className="h-[42px] overflow-hidden text-[22px] font-bold leading-[42px] text-gray-900">
          {product.name}
        </h2>

        <div className="h-[60px]" />

        <div className="flex h-[42px] items-center overflow-hidden">
          <PriceBlock
            basePriceYen={product.priceYen}
            originalPriceYen={dp?.originalPriceYen}
            displayPriceYen={dp?.displayPriceYen}
            showDiscount={showDiscount}
          />
        </div>

        <div className="h-[60px]" />

        <div className="h-[42px] overflow-hidden">
          <div className="h-full w-full" aria-hidden="true" />
        </div>

        <div className="h-[60px]" />

        <div className="grid h-[42px] grid-cols-2 gap-[60px]">
          <ProductDetailModal
            product={product}
            set={set}
            trial={trial}
            showDiscount={showDiscount}
          />

          <button
            className="flex items-center justify-center rounded-md bg-black text-[18px] font-bold text-white"
            onClick={async () => {
              const baseLog = createBaseLog();

              await trackAction({
                ...baseLog,
                phase: "main",
                page: "product",
                type: "product_select",
                meta: { implTrialId: getImplTrialId() },
                payload: {
                  productId: product.id,
                  source: "product_card",
                },
              });

              router.push(
                `${checkoutPath}?set=${set}&trial=${trial}&productId=${product.id}`,
              );
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

export default function ProductPageA1Trial10() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");
  const trial = searchParams.get("trial");

  const didTrack = useRef(false);

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    const baseLog = getClientLogBase({ searchParams });

    void trackAction({
      ...baseLog,
      phase: "main",
      page: "product",
      type: "page_view",
      meta: { implTrialId: getImplTrialId() },
      payload: {},
    });
  }, []);

  if (!set || !trial) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-[18px] font-bold text-red-700">
          URLに set または trial がありません。
        </div>
      </main>
    );
  }

  const products = trial10Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial10Data.purchaseConditions}
          title="商品一覧"
        />

        <section className="mx-auto grid h-[816px] w-[1160px] grid-cols-2 grid-rows-[378px_378px] gap-x-[60px] gap-y-[60px] overflow-hidden">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              set={set}
              trial={trial}
            />
          ))}
        </section>

        <div className="h-[99px]" />
      </div>
    </main>
  );
}