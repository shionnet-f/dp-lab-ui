"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trial9Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getClientLogBase } from "@/lib/log/clientLogBase";
function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");

  if (trialsIndex >= 0) {
    return segments[trialsIndex + 2] ?? null;
  }

  const a2Index = segments.indexOf("a2");
  return a2Index >= 0 ? segments[a2Index + 1] ?? null : null;
}

const checkoutPath = getTrialPath("a2", "trial9", "checkout");

type Trial9Product = (typeof trial9Data.products)[number];

type ProductCardProps = {
  product: Trial9Product;
  set: string;
  trial: string;
  checkoutPath: string;
};

type ProductDetailModalProps = {
  product: Trial9Product;
  set: string;
  trial: string;
  checkoutPath: string;
  descriptionArea?: ReactNode;
  specsArea?: ReactNode;
};

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

function createProductLogBase(set: string, trial: string) {
  const logParams = new URLSearchParams();
  logParams.set("set", set);
  logParams.set("trial", trial);

  return getClientLogBase({ searchParams: logParams });
}

function ProductDetailModal({
  product,
  set,
  trial,
  checkoutPath,
  descriptionArea,
  specsArea,
}: ProductDetailModalProps) {
  const dialogId = `product-dialog-${product.id}`;
  const router = useRouter();

  function closeDialog() {
    const el = document.getElementById(dialogId) as HTMLDialogElement | null;
    el?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          const baseLog = createProductLogBase(set, trial);

          void trackAction({
            ...baseLog,
            phase: "main",
            page: "product",
            type: "view_detail",
            meta: { implTrialId: getImplTrialId() },
            payload: { productId: product.id },
          });

          const el = document.getElementById(dialogId) as HTMLDialogElement | null;
          el?.showModal();
        }}
        className="flex h-[40px] w-[110px] items-center justify-center rounded-md border border-gray-300 bg-white text-[17px] font-bold text-gray-700"
      >
        詳細を見る
      </button>

      <dialog
        id={dialogId}
        className="fixed left-[470px] top-[110px] h-[860px] w-[980px] overflow-hidden rounded-md p-0 backdrop:bg-black/70"
      >
        <div className="h-full w-full overflow-hidden bg-white">
          {/* 70px：見出しと閉じる */}
          <div className="flex h-[70px] items-center justify-between border-b border-gray-300 px-[40px]">
            <h2 className="text-[28px] font-bold text-gray-900">
              商品詳細
            </h2>

            <button
              type="button"
              onClick={() => {
                const baseLog = createProductLogBase(set, trial);

                void trackAction({
                  ...baseLog,
                  phase: "main",
                  page: "product",
                  type: "close_detail",
                  meta: { implTrialId: getImplTrialId() },
                  payload: { productId: product.id },
                });

                closeDialog();
              }}
              className="flex h-[40px] w-[100px] items-center justify-center rounded-md border border-gray-300 bg-white text-[17px] font-bold text-gray-700"
            >
              閉じる
            </button>
          </div>

          {/* 160px：商品情報 */}
          <section className="h-[160px] border-b border-gray-200 px-[40px]">
            <div className="grid h-full grid-cols-[200px_1fr_180px]">
              {/* 左：画像領域 */}
              <div className="flex h-full items-center justify-center">
                <div className="flex h-[120px] w-[160px] items-center justify-center overflow-hidden rounded-md bg-gray-50">
                  <img
                    src={product.imageSrc}
                    alt=""
                    className="max-h-[80px] max-w-[110px] object-contain"
                  />
                </div>
              </div>

              {/* 中央：商品名・価格 */}
              <div className="h-full min-w-0 pl-[20px] pr-[20px]">
                <div className="h-[10px]" />

                <div className="flex h-[30px] min-w-0 items-center overflow-hidden">
                  <h3 className="truncate text-[22px] font-bold leading-[42px] text-gray-900">
                    {product.name}
                  </h3>
                </div>

                <div className="h-[10px]" />

                <div className="h-[60px]" />

                <div className="h-[10px]" />

                <div className="flex h-[30px] items-center overflow-hidden">
                  <p className="truncate text-[28px] font-bold text-gray-900">
                    ¥{yen(product.priceYen)}
                  </p>
                </div>

                <div className="h-[10px]" />
              </div>

              {/* 右：空領域 */}
              <div className="flex h-full items-center justify-center">
                <div className="h-[50px] w-[160px] overflow-hidden">
                  <div className="h-full w-full" aria-hidden="true" />
                </div>
              </div>
            </div>
          </section>

          {/* 60px：空間 */}
          <div className="h-[60px]" />

          {/* 190px：説明領域1 */}
          <section className="grid h-[190px] grid-cols-[1fr_1fr] gap-[60px] px-[40px]">
            <div className="h-full overflow-hidden border border-gray-300 bg-white p-[20px]">
              <div className="h-[30px]">
                <h3 className="text-[18px] font-bold text-gray-900">
                  商品説明
                </h3>
              </div>

              <div className="h-[120px] overflow-hidden text-[15px] font-medium leading-[23px] text-gray-700">
                {descriptionArea ?? (
                  <>
                    <p className="truncate">{product.description}</p>
                    <p className="truncate">
                      毎日の使用を想定した定番商品です。
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="h-full overflow-hidden border border-gray-300 bg-white p-[20px]">
              <div className="h-[30px]">
                <h3 className="text-[18px] font-bold text-gray-900">
                  仕様・補足
                </h3>
              </div>

              <div className="h-[120px] overflow-hidden text-[15px] font-medium leading-[23px] text-gray-700">
                {specsArea ??
                  product.specsAndNotes.map((line) => (
                    <p key={line} className="truncate">
                      {line}
                    </p>
                  ))}
              </div>
            </div>
          </section>

          {/* 60px：空間 */}
          <div className="h-[60px]" />

          {/* 190px：説明領域2 */}
          <section className="grid h-[190px] grid-cols-[1fr_1fr] gap-[60px] px-[40px]">
            <div className="h-full overflow-hidden border border-gray-300 bg-white p-[20px]">
              <div className="h-[30px]">
                <h3 className="text-[18px] font-bold text-gray-900">
                  購入前の確認
                </h3>
              </div>

              <div className="h-[120px] overflow-hidden text-[15px] font-medium leading-[23px] text-gray-700">
                {product.prePurchaseCheck.map((line) => (
                  <p key={line} className="truncate">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="h-full overflow-hidden border border-gray-300 bg-white p-[20px]">
              <div className="h-[30px]">
                <h3 className="text-[18px] font-bold text-gray-900">
                  配送情報
                </h3>
              </div>

              <div className="h-[120px] overflow-hidden text-[15px] font-medium leading-[23px] text-gray-700">
                {product.deliveryInfo.map((line) => (
                  <p key={line} className="truncate">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* 60px：空間 */}
          <div className="h-[60px]" />

          {/* 60px：購入ボタン */}
          <div className="flex h-[60px] items-center justify-center px-[40px]">
            <button
              type="button"
              className="flex h-[50px] w-[360px] items-center justify-center rounded-md bg-black text-[18px] font-bold text-white"
              onClick={async () => {
                const baseLog = createProductLogBase(set, trial);

                await trackAction({
                  ...baseLog,
                  phase: "main",
                  page: "product",
                  type: "product_select",
                  meta: { implTrialId: getImplTrialId() },
                  payload: {
                    productId: product.id,
                    source: "dialog",
                  },
                });

                router.push(`${checkoutPath}?set=${set}&trial=${trial}&productId=${product.id}`);
              }}
            >
              この商品を選ぶ
            </button>
          </div>

          {/* 10px：空間 */}
          <div className="h-[10px]" />
        </div>
      </dialog>
    </>
  );
}

function ProductCard({ product, set, trial, checkoutPath }: ProductCardProps) {
  const router = useRouter();

  const descriptionArea = renderDescriptionArea(product);
  const specsArea = renderSpecsArea(product);

  return (
    <article className="h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="grid h-full grid-cols-[520px_280px_360px]">
        {/* 左側：商品名・価格 */}
        <div className="h-full min-w-0 pl-[60px] pr-[20px]">
          <div className="h-[10px]" />

          <div className="flex h-[30px] min-w-0 items-center overflow-hidden">
            <h2 className="truncate text-[22px] font-bold leading-[42px] text-gray-900">
              {product.name}
            </h2>
          </div>

          <div className="h-[10px]" />

          <div className="h-[60px]" />

          <div className="h-[10px]" />

          <div className="flex h-[30px] items-center overflow-hidden">
            <p className="truncate text-[28px] font-bold text-gray-900">
              ¥{yen(product.priceYen)}
            </p>
          </div>

          <div className="h-[10px]" />
        </div>

        {/* 中央：空領域 */}
        <div className="flex h-full min-w-0 items-center justify-center px-[20px]">
          <div className="h-[50px] w-full min-w-0 overflow-hidden">
            <div className="h-full w-full" aria-hidden="true" />
          </div>
        </div>

        {/* 右側：ボタン2つ */}
        <div className="flex h-full items-center justify-center">
          <div className="flex items-center gap-[60px]">
            <ProductDetailModal
              product={product}
              set={set}
              trial={trial}
              checkoutPath={checkoutPath}
              descriptionArea={descriptionArea}
              specsArea={specsArea}
            />

            <button
              type="button"
              className="flex h-[40px] w-[110px] items-center justify-center rounded-md bg-black text-[18px] font-bold text-white"
              onClick={async () => {
                const baseLog = createProductLogBase(set, trial);

                await trackAction({
                  ...baseLog,
                  phase: "main",
                  page: "product",
                  type: "product_select",
                  meta: { implTrialId: getImplTrialId() },
                  payload: {
                    productId: product.id,
                    source: "card",
                  },
                });

                router.push(`${checkoutPath}?set=${set}&trial=${trial}&productId=${product.id}`);
              }}
            >
              購入へ
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderDescriptionArea(product: Trial9Product) {
  const isDpTarget = product.dpDisplay?.isDpTarget === true;

  if (!isDpTarget || !product.dpDisplay) {
    return undefined;
  }

  return (
    <>
      <p className="truncate">まとめ買い向けの商品です。</p>
      <p className="truncate text-[18px] font-extrabold text-gray-900">
        {product.dpDisplay.emphasizedVolumeText}
      </p>
      <p className="truncate">日常のストック用にも使いやすい内容です。</p>
    </>
  );
}

function renderSpecsArea(product: Trial9Product) {
  const isDpTarget = product.dpDisplay?.isDpTarget === true;

  if (!isDpTarget || !product.dpDisplay) {
    return undefined;
  }

  return (
    <>
      <p className="truncate">{product.dpDisplay.actualVolumeText}</p>
      {product.specsAndNotes
        .filter((line) => !line.includes("内容量"))
        .map((line) => (
          <p key={line} className="truncate">
            {line}
          </p>
        ))}
    </>
  );
}

export default function ProductPageA2Trial9() {
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
        <div className="rounded-xl border border-red-200 bg-white p-6 text-sm text-red-700">
          URLに set または trial がありません。
        </div>
      </main>
    );
  }

  const products = trial9Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial9Data.purchaseConditions}
          title="商品一覧"
        />

        {/* 商品カード領域：160px * 4 + 60px * 3 = 820px */}
        <section className="mx-auto flex h-[820px] w-[1160px] flex-col gap-[60px] overflow-hidden">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              set={set}
              trial={trial}
              checkoutPath={checkoutPath}
            />
          ))}
        </section>

        {/* 95pxの空間 */}
        <div className="h-[95px]" />
      </div>
    </main>
  );
}