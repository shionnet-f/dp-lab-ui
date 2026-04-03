"use client";

import Link from "next/link";
import { useId } from "react";
import { products6 } from "@/config/products";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Product = (typeof products6)[number];

type StockInfoProps = {
  show: boolean;
  stockText?: string;
};

function StockInfo({ show, stockText }: StockInfoProps) {
  return (
    <div className="h-11 w-[160px] overflow-hidden">
      {show ? (
        <div className="flex h-full w-full items-center rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          <p className="line-clamp-2 font-medium leading-5">{stockText}</p>
        </div>
      ) : (
        <div className="h-full w-full" aria-hidden="true" />
      )}
    </div>
  );
}

type ProductDetailModalProps = {
  product: Product;
  showStock: boolean;
  stockText?: string;
};

function ProductDetailModal({
  product,
  showStock,
  stockText,
}: ProductDetailModalProps) {
  const dialogId = useId();

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

      <dialog
        id={dialogId}
        className="m-auto w-full max-w-4xl rounded-2xl p-0 backdrop:bg-black/30"
      >
        <div className="rounded-2xl bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">商品詳細</h2>
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
            >
              閉じる
            </button>
          </div>

          <div className="space-y-5 px-6 py-6">
            <section className="rounded-xl border border-gray-200 p-5">
              <div className="grid grid-cols-[160px_1fr] items-center gap-5">
                <div className="flex h-28 w-40 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                  画像エリア
                </div>

                <div className="min-w-0">
                  {showStock ? (
                    <div className="mb-3 w-[260px] rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                      {stockText}
                    </div>
                  ) : (
                    <div className="mb-3 h-[40px] w-[260px]" aria-hidden="true" />
                  )}

                  <div className="text-xl font-bold leading-tight text-gray-900">
                    {product.name}
                  </div>
                  <div className="mt-2 text-xl font-semibold text-gray-900">
                    ¥{yen(product.priceYen)}
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 p-5">
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

              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  仕様・補足
                </h3>
                <div className="space-y-2 text-sm leading-6 text-gray-600">
                  <div>内容量：500ml × 24本</div>
                  <div>ケース単位での販売です</div>
                  <div>保存方法：高温・直射日光を避けて保管してください</div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                購入前の確認
              </h3>
              <div className="space-y-2 text-sm leading-6 text-gray-600">
                <p>条件に合う商品か確認してから選択してください。</p>
                <p>購入手続き画面で最終確認ができます。</p>
                <p>配送方法や追加オプションは購入手続き画面で選択してください。</p>
              </div>
            </section>

            <div className="pt-1">
              <Link
                href={`/trials/a2/trial4/checkout?productId=${product.id}`}
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-black px-5 text-sm font-medium text-white"
              >
                この商品を選ぶ
              </Link>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

type ProductCardProps = {
  product: Product;
  showStock: boolean;
  stockText?: string;
};

function ProductCard({ product, showStock, stockText }: ProductCardProps) {
  return (
    <article className="h-[132px] rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
      <div className="grid h-full grid-cols-[112px_220px_160px_1fr_260px] items-center gap-6">
        <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
          画像
        </div>

        <div className="min-w-0">
          <h2 className="line-clamp-1 text-base font-semibold text-gray-900">
            {product.name}
          </h2>
          <p className="mt-2 text-base font-medium text-gray-800">
            ¥{yen(product.priceYen)}
          </p>
        </div>

        <StockInfo show={showStock} stockText={stockText} />

        <div aria-hidden="true" />

        <div className="grid grid-cols-2 gap-3">
          <ProductDetailModal
            product={product}
            showStock={showStock}
            stockText={stockText}
          />
          <Link
            href={`/trials/a2/trial4/checkout?productId=${product.id}`}
            className="flex h-11 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageA2Trial4() {
  const stockTexts = [
    "残り3点",
    "残り5点",
    "残り8点",
    "残り12点",
    "残り15点",
    "残り20点",
  ];

  const showStockFlags = [true, true, true, false, false, false];

  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          「ミネラルウォーター 500ml×24」を1つ選んで購入してください
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">商品一覧</h1>
        </header>

        <section className="grid flex-1 gap-5">
          {products6.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              showStock={showStockFlags[index]}
              stockText={stockTexts[index]}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
