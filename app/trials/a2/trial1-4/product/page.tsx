"use client";

import Link from "next/link";
import trial1_4Data, { type Trial1Product } from "../data";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type ProductDetailModalProps = {
  product: Trial1Product;
};

function ProductDetailModal({ product }: ProductDetailModalProps) {
  const dialogId = `product-dialog-${product.id}`;

  function openDialog() {
    const el = document.getElementById(dialogId) as HTMLDialogElement | null;
    el?.showModal();
  }

  function closeDialog() {
    const el = document.getElementById(dialogId) as HTMLDialogElement | null;
    el?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="flex h-11 items-center justify-center rounded-md border border-gray-300 px-4 text-sm text-gray-700"
      >
        詳細を見る
      </button>

      <dialog id={dialogId} className="m-auto w-full max-w-4xl rounded-2xl p-0 backdrop:bg-black/30">
        <div className="rounded-2xl bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">商品詳細</h2>
            <button type="button" onClick={closeDialog} className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700">
              閉じる
            </button>
          </div>

          <div className="space-y-5 px-6 py-6">
            <section className="rounded-xl border border-gray-200 p-5">
              <div className="grid grid-cols-[160px_1fr] items-center gap-5">
                <div className="flex h-28 w-40 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">画像エリア</div>

                <div className="min-w-0">
                  <div className="text-xl font-bold leading-tight text-gray-900">{product.name}</div>
                  <div className="mt-2 text-xl font-semibold text-gray-900">¥{yen(product.priceYen)}</div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">商品説明</h3>
                <div className="space-y-2 text-sm leading-6 text-gray-600">
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">仕様・補足</h3>
                <div className="space-y-2 text-sm leading-6 text-gray-600">
                  {product.specsAndNotes.map((item) => <div key={item}>{item}</div>)}
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">購入前の確認</h3>
              <div className="space-y-2 text-sm leading-6 text-gray-600">
                {product.prePurchaseCheck.map((item) => <p key={item}>{item}</p>)}
                {product.deliveryInfo.map((item) => <p key={item}>{item}</p>)}
              </div>
            </section>

            <div className="pt-1">
              <Link href={`/trials/a2/trial1-4/checkout?productId=${product.id}`} className="inline-flex h-12 w-full items-center justify-center rounded-md bg-black px-5 text-sm font-medium text-white">
                この商品を選ぶ
              </Link>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

function ProductCard({ product }: { product: Trial1Product }) {
  return (
    <article className="h-[136px] rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
      <div className="grid h-full grid-cols-[112px_1fr_260px] items-center gap-5">
        <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">画像</div>

        <div className="min-w-0">
          <h2 className="line-clamp-1 text-base font-semibold text-gray-900">{product.name}</h2>
          <p className="mt-2 text-base font-medium text-gray-800">¥{yen(product.priceYen)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 justify-self-end">
          <ProductDetailModal product={product} />
          <Link href={`/trials/a2/trial1-4/checkout?productId=${product.id}`} className="flex h-11 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white">
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageA2trial14() {
  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{trial1_4Data.purchaseConditions.budgetYen}円以内、
          {trial1_4Data.purchaseConditions.quantityCondition}、
          {trial1_4Data.purchaseConditions.specificCondition}
        </div>
        <header className="mb-5 shrink-0"><h1 className="text-xl font-bold text-gray-900">商品一覧</h1></header>
        <section className="grid flex-1 gap-5">
          {trial1_4Data.products.map((product) => <ProductCard key={product.id} product={product} />)}
        </section>
      </div>
    </main>
  );
}
