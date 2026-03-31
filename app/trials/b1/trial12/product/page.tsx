"use client";

import Link from "next/link";
import { useId } from "react";
import { products6 } from "@/config/products";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Product = (typeof products6)[number];

type TrialDetail = {
  descriptionText: string;
  specParagraph: string;
};

const trial12Details: TrialDetail[] = [
  {
    descriptionText:
      "毎日の飲用に使いやすい定番商品で、日常のストックや持ち運びにも配慮されたボトル飲料です。",
    specParagraph:
      "ケースでの販売となっており、今回は採水地由来の天然水を使用した500mlボトルが24本入った構成で、飲み口もやわらかく感じやすい軟水タイプとして案内されています。",
  },
  {
    descriptionText:
      "日常使いしやすいボトル飲料で、すっきりした後味が特徴の商品です。",
    specParagraph:
      "ケース販売の商品で、採水地由来の天然水を使った500mlボトルが24本入っている構成ですが、飲み口はややしっかりめに感じやすい中硬水タイプとして案内されています。",
  },
  {
    descriptionText:
      "毎日の補給向けに使いやすく、飲みやすさを重視した商品です。",
    specParagraph:
      "ケースでの販売となっており、今回は処理工程を経た飲用水を用いた500mlボトルが24本入った構成で、口当たりはやわらかく感じやすい軟水タイプとして案内されています。",
  },
  {
    descriptionText:
      "日常のストック向けに使いやすく、まとめ買いもしやすい商品です。",
    specParagraph:
      "ケース販売の商品で、採水地由来の天然水を使用していますが、構成は2Lボトルが6本入りで、飲み口はやわらかく感じやすい軟水タイプとして案内されています。",
  },
  {
    descriptionText:
      "すっきり飲みやすい商品として案内されている、日常使い向けのボトル飲料です。",
    specParagraph:
      "ケースでの販売となっており、今回は処理工程を経た飲用水を用いた500mlボトルが24本入った構成で、飲み口はややしっかりめに感じやすい中硬水タイプとして案内されています。",
  },
  {
    descriptionText: "自然な味わいを意識した、日常使いしやすいボトル飲料です。",
    specParagraph:
      "ケース販売の商品で、採水地由来の天然水を使用していますが、構成は350mlボトルが24本入りで、口当たりはやわらかく感じやすい軟水タイプとして案内されています。",
  },
];

function getDetailByIndex(index: number): TrialDetail {
  return trial12Details[index] ?? trial12Details[0];
}

type ProductDetailModalProps = {
  product: Product;
  index: number;
};

function ProductDetailModal({ product, index }: ProductDetailModalProps) {
  const dialogId = useId();
  const detail = getDetailByIndex(index);

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
            {/* 左カラム */}
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
                  <div className="text-sm leading-6 text-gray-600">
                    {detail.descriptionText}
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    仕様・補足
                  </h3>
                  <div className="h-full overflow-y-auto text-sm leading-6 text-gray-600 pr-1">
                    {detail.specParagraph}
                    保存の際は高温や直射日光を避け、開封後は早めに使用してください。
                  </div>
                </div>
              </section>
            </div>

            {/* 右カラム */}
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
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    購入前の確認
                  </h4>
                  <div className="text-sm leading-6 text-gray-700">
                    条件に合う商品かどうかは、仕様や補足の記載をよく確認したうえで判断してください。購入手続き画面で配送方法や金額も確認できます。
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    配送に関わる情報
                  </h4>
                  <div className="text-sm leading-6 text-gray-700">
                    送料は購入手続き画面で確認できます。通常配送・お急ぎ便・当日便を選択できます。
                  </div>
                </div>
              </section>

              <section className="rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full items-end">
                  <Link
                    href={`/trials/b1/trial12/checkout?productId=${product.id}`}
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

function ProductCard({ product, index }: { product: Product; index: number }) {
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
          詳しい情報は商品詳細の仕様・補足内に記載されています
        </div>

        <div className="grid h-10 grid-cols-2 gap-2">
          <ProductDetailModal product={product} index={index} />

          <Link
            href={`/trials/b1/trial12/checkout?productId=${product.id}`}
            className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageB1Trial12() {
  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          「天然水」「500ml ×
          24本」「軟水」を満たす商品を1つ選んで購入してください
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">商品一覧</h1>
        </header>

        <section className="grid flex-1 grid-cols-3 gap-8">
          {products6.slice(0, 6).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </section>
      </div>
    </main>
  );
}
