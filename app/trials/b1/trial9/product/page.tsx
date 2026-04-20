"use client";

import Link from "next/link";
import { useId } from "react";
import { trial9Data, type Trial9Product } from "../data";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type ProductDetailModalProps = {
  product: Trial9Product;
};

function ProductDetailModal({ product }: ProductDetailModalProps) {
  const dialogId = useId();

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
              <section className="rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  画像エリア
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">商品説明</h3>
                  <div className="overflow-y-auto text-sm leading-6 text-gray-600">
                    <p>{product.description}</p>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">仕様・補足</h3>
                  <div className="overflow-y-auto space-y-2 text-sm text-gray-600">
                    {product.specsAndNotes.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="grid grid-rows-[160px_140px_120px_1fr] gap-5">
              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col justify-start">
                  <h3 className="text-2xl font-bold leading-tight text-gray-900">
                    {product.name}
                  </h3>

                  <div className="mt-3 text-2xl font-semibold text-gray-900">
                    ¥{yen(product.priceYen)}
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">購入前の確認</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    {product.prePurchaseCheck.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">配送に関わる情報</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    {product.deliveryInfo.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full items-end">
                  <Link
                    href={`/trials/b1/trial9/checkout?productId=${product.id}`}
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

function ProductCard({ product }: { product: Trial9Product }) {
  return (
    <article className="h-[360px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid h-full grid-rows-[128px_64px_44px_40px] gap-4">
        <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
          画像エリア
        </div>

        <div className="grid h-16 grid-rows-[1fr_auto] overflow-hidden">
          <h2 className="line-clamp-2 text-base font-semibold leading-5 text-gray-900">
            {product.name}
          </h2>
          <p className="text-base font-medium leading-5 text-gray-800">
            ¥{yen(product.priceYen)}
          </p>
        </div>

        <div className="h-11 overflow-hidden text-xs leading-5 text-gray-500">
          送料は購入手続き画面で表示されます
        </div>

        <div className="grid h-10 grid-cols-2 gap-2">
          <ProductDetailModal product={product} />

          <Link
            href={`/trials/b1/trial9/checkout?productId=${product.id}`}
            className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageB1Trial9() {
  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{trial9Data.purchaseConditions.budgetYen}円以内、
          {trial9Data.purchaseConditions.quantityCondition}、
          {trial9Data.purchaseConditions.specificCondition}
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">商品一覧</h1>
        </header>

        <section className="grid flex-1 grid-cols-2 items-start gap-10">
          {trial9Data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}
