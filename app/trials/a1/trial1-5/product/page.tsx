"use client";

import Link from "next/link";
import { useId } from "react";
import { trial1_5Data, type Trial1_5Product } from "../data";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type ViewerInfoProps = {
  show: boolean;
  text?: string;
};

function ViewerInfo({ show, text }: ViewerInfoProps) {
  return (
    <div className="h-11 overflow-hidden">
      {show ? (
        <div className="flex h-full items-center rounded-md bg-orange-50 px-3 py-2 text-sm text-orange-700">
          <p className="line-clamp-1">{text}</p>
        </div>
      ) : (
        <div className="h-full w-full" aria-hidden="true" />
      )}
    </div>
  );
}

type ProductDetailModalProps = {
  product: Trial1_5Product;
  showViewer: boolean;
  viewerText?: string;
};

function ProductDetailModal({
  product,
  showViewer,
  viewerText,
}: ProductDetailModalProps) {
  const dialogId = useId();

  return (
    <>
      <button
        type="button"
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700"
        onClick={() => {
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
        className="m-auto w-full max-w-4xl rounded-2xl p-0 backdrop:bg-black/30"
      >
        <div className="mx-auto rounded-2xl bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">商品詳細</h2>
            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
              onClick={() => {
                const el = document.getElementById(
                  dialogId,
                ) as HTMLDialogElement | null;
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
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    商品説明
                  </h3>
                  <div className="space-y-2 text-sm leading-6 text-gray-600">
                    <p>{product.description}</p>
                    <p>
                      毎日の使用を想定した定番商品です。購入前に内容をよく確認してください。
                    </p>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    仕様・補足
                  </h3>
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
                  {showViewer ? (
                    <div className="mb-3 rounded-md bg-orange-50 px-3 py-2 text-sm text-orange-700">
                      {viewerText}
                    </div>
                  ) : (
                    <div className="mb-3 h-[40px]" aria-hidden="true" />
                  )}

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
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    購入前の確認
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    {product.prePurchaseCheck.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    配送に関わる情報
                  </h4>
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
                    href={`/trials/a1/trial1-5/checkout?productId=${product.id}`}
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
  product: Trial1_5Product;
  showViewer: boolean;
  viewerText?: string;
};

function ProductCard({ product, showViewer, viewerText }: ProductCardProps) {
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

        <ViewerInfo show={showViewer} text={viewerText} />

        <div className="grid h-10 grid-cols-2 gap-2">
          <ProductDetailModal
            product={product}
            showViewer={showViewer}
            viewerText={viewerText}
          />

          <Link
            href={`/trials/a1/trial1-5/checkout?productId=${product.id}`}
            className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageA1Trial1_5() {
  const products = trial1_5Data.products;
  const viewerTexts = products.map((product) => product.dpDisplay?.label ?? "");
  const showViewerFlags = products.map((product) => Boolean(product.dpDisplay));

  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{trial1_5Data.purchaseConditions.budgetYen}円以内、
          {trial1_5Data.purchaseConditions.quantityCondition}、
          {trial1_5Data.purchaseConditions.specificCondition}
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">商品一覧</h1>
        </header>

        <section className="grid flex-1 grid-cols-2 items-start gap-10">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              showViewer={showViewerFlags[index]}
              viewerText={viewerTexts[index]}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
