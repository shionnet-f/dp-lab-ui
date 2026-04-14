
"use client";

import Link from "next/link";
import { useId } from "react";
import { trial10Data, type Trial10Product } from "../data";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

function PriceBlock({
  basePriceYen,
  originalPriceYen,
  displayPriceYen,
  showDiscount,
  large = false,
}: {
  basePriceYen: number;
  originalPriceYen?: number;
  displayPriceYen?: number;
  showDiscount: boolean;
  large?: boolean;
}) {
  if (showDiscount && originalPriceYen && displayPriceYen) {
    return (
      <div className="flex items-end gap-2">
        <span className={large ? "text-base text-gray-500 line-through" : "text-sm text-gray-500 line-through"}>
          ¥{yen(originalPriceYen)}
        </span>
        <span
          className={
            large
              ? "text-3xl font-bold leading-none text-red-600"
              : "text-xl font-bold leading-none text-red-600"
          }
        >
          ¥{yen(displayPriceYen)}
        </span>
      </div>
    );
  }

  return (
    <div className={large ? "text-2xl font-semibold text-gray-900" : "text-base font-medium leading-5 text-gray-800"}>
      ¥{yen(basePriceYen)}
    </div>
  );
}

type DiscountInfoProps = {
  show: boolean;
};

function DiscountInfo({ show }: DiscountInfoProps) {
  return (
    <div className="h-11 overflow-hidden">
      {show ? (
        <div className="flex h-full items-center rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          <p className="line-clamp-1">価格改定中の商品です</p>
        </div>
      ) : (
        <div className="h-full w-full" aria-hidden="true" />
      )}
    </div>
  );
}

type ProductDetailModalProps = {
  product: Trial10Product;
  showDiscount: boolean;
};

function ProductDetailModal({ product, showDiscount }: ProductDetailModalProps) {
  const dialogId = useId();
  const dp = product.dpDisplay;

  return (
    <>
      <button
        type="button"
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700"
        onClick={() => {
          const el = document.getElementById(dialogId) as HTMLDialogElement | null;
          el?.showModal();
        }}
      >
        詳細を見る
      </button>

      <dialog
        id={dialogId}
        className="m-auto w-full max-w-4xl rounded-2xl p-0 backdrop:bg-black/30"
      >
        <div className="mx-auto rounded-2xl bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">商品詳細</h2>
            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
              onClick={() => {
                const el = document.getElementById(dialogId) as HTMLDialogElement | null;
                el?.close();
              }}
            >
              閉じる
            </button>
          </div>

          <div className="grid grid-cols-[1fr_1fr] gap-8 px-6 py-6">
            <div className="grid grid-rows-[260px_150px_150px] gap-5">
              <section className="rounded-xl border-2 border-gray-300 bg-gray-100 p-4">
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  画像エリア
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">商品説明</h3>
                  <div className="space-y-2 text-sm leading-6 text-gray-600">
                    <p>{product.description}</p>
                    <p>毎日の使用を想定した定番商品です。購入前に内容をよく確認してください。</p>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">仕様・補足</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    {product.specsAndNotes.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="grid grid-rows-[160px_140px_120px_1fr] gap-5">
              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col justify-start">
                  <h3 className="text-2xl font-bold leading-tight text-gray-900">{product.name}</h3>

                  <div className="mt-4">
                    <PriceBlock
                      basePriceYen={product.priceYen}
                      originalPriceYen={dp?.originalPriceYen}
                      displayPriceYen={dp?.displayPriceYen}
                      showDiscount={showDiscount}
                      large
                    />
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">購入前の確認</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    {product.prePurchaseCheck.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">配送に関わる情報</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    {product.deliveryInfo.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full items-end">
                  <Link
                    href={`/trials/a1/trial10/checkout?productId=${product.id}`}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
                  >
                    この商品を選ぶ
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

type ProductCardProps = {
  product: Trial10Product;
  showDiscount: boolean;
};

function ProductCard({ product, showDiscount }: ProductCardProps) {
  const dp = product.dpDisplay;

  return (
    <article className="h-[360px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid h-full grid-rows-[128px_72px_36px_40px] gap-4">
        <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
          画像エリア
        </div>

        <div className="grid h-[72px] grid-rows-[1fr_auto] overflow-hidden">
          <h2 className="line-clamp-2 text-base font-semibold leading-5 text-gray-900">
            {product.name}
          </h2>

          <PriceBlock
            basePriceYen={product.priceYen}
            originalPriceYen={dp?.originalPriceYen}
            displayPriceYen={dp?.displayPriceYen}
            showDiscount={showDiscount}
          />
        </div>

        <div className="h-9 overflow-hidden text-xs leading-5 text-gray-500">
          {showDiscount ? "価格改定中の商品です" : "詳しい内容は商品詳細から確認できます"}
        </div>

        <div className="grid h-10 grid-cols-2 gap-2">
          <ProductDetailModal product={product} showDiscount={showDiscount} />

          <Link
            href={`/trials/a1/trial10/checkout?productId=${product.id}`}
            className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageA1Trial10() {
  const products = trial10Data.products;

  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{trial10Data.purchaseConditions.budgetYen}円以内、
          {trial10Data.purchaseConditions.quantityCondition}、
          {trial10Data.purchaseConditions.specificCondition}
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">商品一覧</h1>
        </header>

        <section className="grid flex-1 grid-cols-2 items-start gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showDiscount={Boolean(product.dpDisplay?.isDiscountTarget)}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
