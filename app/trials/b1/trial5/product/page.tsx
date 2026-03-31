"use client";

import Link from "next/link";
import { useId } from "react";
import { products6 } from "@/config/products";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Product = (typeof products6)[number];

type ProductDetailModalProps = {
  product: Product;
};

function ProductDetailModal({ product }: ProductDetailModalProps) {
  const dialogId = useId();

  const detailLines = [
    "毎日の水分補給に適した商品です。",
    "ケース単位での販売です。",
    "保存は高温・直射日光を避けてください。",
    "地域によって配送条件が異なる場合があります。",
    "購入後は内容の変更ができない場合があります。",
    "500ml×24本入りです。",
    "時期によって発送に時間がかかる場合があります。",
    "最終的な金額は購入手続き画面で確認できます。",
    "商品説明をよく確認してから購入してください。",
    "梱包形態は変更になる場合があります。",
    "配送方法によって追加料金が発生する場合があります。",
    "贈答用の包装は追加オプションで指定できます。",
    "一部地域では到着希望日時を指定できない場合があります。",
    "商品は在庫状況により出荷時期が変動することがあります。",
    "ラベルや外装デザインが変更される場合があります。",
    "注文確定後はキャンセルできない場合があります。",
  ];

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

          <div className="grid grid-rows-[220px_1fr] gap-6 px-6 py-6">
            {/* 上部 */}
            <div className="grid grid-cols-[1fr_1fr] gap-8">
              <section className="rounded-xl border-2 border-gray-300 bg-gray-100 p-4">
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  画像エリア
                </div>
              </section>

              <section className="rounded-xl border-2 border-gray-300 p-5 overflow-hidden">
                <div className="flex h-full flex-col justify-start">
                  <div className="mb-3 h-[40px]" aria-hidden="true" />

                  <h3 className="text-2xl font-bold leading-tight text-gray-900">
                    {product.name}
                  </h3>

                  <div className="mt-3 text-2xl font-semibold text-gray-900">
                    ¥{yen(product.priceYen)}
                  </div>
                </div>
              </section>
            </div>

            {/* 下部：整理しない長文情報 */}
            <section className="rounded-xl border-2 border-gray-300 p-5">
              <div className="mb-3 text-xs font-medium text-gray-500">詳細</div>

              <div className="h-[260px] overflow-y-auto text-sm leading-6 text-gray-600">
                <div className="space-y-2">
                  {detailLines.map((line, index) => (
                    <p key={`${product.id}-${index}`}>{line}</p>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </dialog>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
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

        <div className="h-11 overflow-hidden" />

        <div className="grid h-10 grid-cols-2 gap-2">
          <ProductDetailModal product={product} />

          <Link
            href={`/trials/b1/trial5/checkout?productId=${product.id}`}
            className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageB1Trial5() {
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

        <section className="grid flex-1 grid-cols-3 gap-8">
          <ProductCard product={products6[0]} />
          <ProductCard product={products6[1]} />
          <ProductCard product={products6[2]} />
          <ProductCard product={products6[3]} />
          <ProductCard product={products6[4]} />
          <ProductCard product={products6[5]} />
        </section>
      </div>
    </main>
  );
}
