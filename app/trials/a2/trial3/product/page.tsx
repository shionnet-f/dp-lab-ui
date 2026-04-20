"use client";

import Link from "next/link";
import { useId } from "react";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Product = {
  id: string;
  name: string;
  priceYen: number;
  description: string;
  specs: string[];
  review: { starsText: string; score: string; count: string };
  isDpTarget?: boolean;
};

const trial3Products: Product[] = [
  {
    id: "earphone-1",
    name: "ワイヤレスイヤホン A",
    priceYen: 7980,
    description:
      "Bluetooth接続に対応したワイヤレスイヤホンです。通勤や通学などの日常利用を想定した標準モデルです。",
    specs: ["内容：1個", "Bluetooth接続対応", "連続再生：約5時間"],
    review: { starsText: "★★★★☆", score: "3.9", count: "(128件)" },
  },
  {
    id: "earphone-2",
    name: "ワイヤレスイヤホン B",
    priceYen: 9280,
    description:
      "Bluetooth接続に対応したワイヤレスイヤホンです。安定した装着感とバランスのよい音質が特徴のモデルです。",
    specs: ["内容：1個", "Bluetooth接続対応", "連続再生：約6時間"],
    review: { starsText: "★★★★★", score: "4.8", count: "(642件)" },
    isDpTarget: true,
  },
  {
    id: "earphone-3",
    name: "ワイヤレスイヤホン C",
    priceYen: 9580,
    description:
      "Bluetooth接続に対応したワイヤレスイヤホンです。動画視聴や音楽再生など、幅広い用途に使えるモデルです。",
    specs: ["内容：1個", "Bluetooth接続対応", "連続再生：約7時間"],
    review: { starsText: "★★★★☆", score: "4.2", count: "(214件)" },
  },
  {
    id: "earphone-4",
    name: "ワイヤレスイヤホン D",
    priceYen: 9980,
    description:
      "Bluetooth接続に対応したワイヤレスイヤホンです。軽量で持ち運びしやすいコンパクトモデルです。",
    specs: ["内容：1個", "Bluetooth接続対応", "連続再生：約4.5時間"],
    review: { starsText: "★★★★☆", score: "4.0", count: "(96件)" },
  },
];

type ProductDetailModalProps = {
  product: Product;
};

function ProductDetailModal({ product }: ProductDetailModalProps) {
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
                  <div className="text-xl font-bold leading-tight text-gray-900">
                    {product.name}
                  </div>
                  <div className="mt-2 text-xl font-semibold text-gray-900">
                    ¥{yen(product.priceYen)}
                  </div>
                  <div className="mt-3 text-sm font-medium text-amber-600">
                    <span>{product.review.starsText}</span>{" "}
                    <span className="text-amber-700">{product.review.score}</span>{" "}
                    <span className="text-gray-600">{product.review.count}</span>
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
                    用途や接続方式、数量などを確認のうえ選択してください。
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  仕様・補足
                </h3>
                <div className="space-y-2 text-sm leading-6 text-gray-600">
                  {product.specs.map((spec) => (
                    <div key={spec}>{spec}</div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                購入前の確認
              </h3>

              <div className="space-y-2 text-sm leading-6 text-gray-600">
                <p>
                  配送方法や追加オプション、最終的なお支払い金額は購入手続き画面で確認できます。
                </p>
                <p>
                  商品内容・数量・各種条件を確認したうえで、購入手続きへ進んでください。
                </p>
                <p>
                  ご注文確定前に、配送先や選択内容をあらためてご確認ください。
                </p>
              </div>
            </section>

            <div className="pt-1">
              <Link
                href={`/trials/a2/trial3/checkout?productId=${product.id}`}
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

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="h-[136px] rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
      <div className="grid h-full grid-cols-[112px_minmax(0,300px)_220px_1fr] items-center gap-5">
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

        <div className="min-w-0">
          <p className="text-sm font-medium text-amber-600">
            <span>{product.review.starsText}</span>{" "}
            <span className="text-amber-700">{product.review.score}</span>{" "}
            <span className="text-gray-600">{product.review.count}</span>
          </p>
        </div>

        <div className="ml-auto grid w-[220px] grid-cols-2 gap-3 justify-self-end">
          <ProductDetailModal product={product} />

          <Link
            href={`/trials/a2/trial3/checkout?productId=${product.id}`}
            className="flex h-11 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageA2Trial3() {
  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          「ワイヤレスイヤホン」を1個選んで購入してください（Bluetooth接続対応、予算10,000円以内）
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">商品一覧</h1>
        </header>

        <section className="grid flex-1 gap-5">
          {trial3Products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}
