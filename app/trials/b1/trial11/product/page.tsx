"use client";

import Link from "next/link";
import { useId } from "react";
import { products6 } from "@/config/products";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Product = (typeof products6)[number];

type TrialDetail = {
  waterTypeLabel: string;
  isNaturalWater: boolean;
  packLabel: string;
  is500x24: boolean;
  hardnessLabel: string;
  isSoftWater: boolean;
  descriptionText: string;
  specText: string;
  checkoutSummaryText: string;
};

const trial11Details: TrialDetail[] = [
  {
    waterTypeLabel: "天然水",
    isNaturalWater: true,
    packLabel: "500ml × 24本",
    is500x24: true,
    hardnessLabel: "軟水",
    isSoftWater: true,
    descriptionText:
      "採水地由来のミネラルバランスを活かした天然水です。毎日の飲用に使いやすい定番タイプです。",
    specText: "内容量は500ml × 24本です。ケース単位での販売です。",
    checkoutSummaryText:
      "硬度区分は軟水です。やわらかい飲み口で日常の飲用を想定しています。",
  },
  {
    waterTypeLabel: "天然水",
    isNaturalWater: true,
    packLabel: "500ml × 24本",
    is500x24: true,
    hardnessLabel: "中硬水",
    isSoftWater: false,
    descriptionText:
      "地下水を原水とした天然水です。すっきりした後味で、日常使いしやすい商品です。",
    specText: "内容量は500ml × 24本です。持ち運びしやすいサイズです。",
    checkoutSummaryText:
      "硬度区分は中硬水です。購入前に飲み口の好みに合うか確認してください。",
  },
  {
    waterTypeLabel: "飲用水（処理水）",
    isNaturalWater: false,
    packLabel: "500ml × 24本",
    is500x24: true,
    hardnessLabel: "軟水",
    isSoftWater: true,
    descriptionText:
      "飲みやすさを重視したボトル飲料です。処理工程を経た水を使用しています。",
    specText: "内容量は500ml × 24本です。ケース単位での販売です。",
    checkoutSummaryText: "硬度区分は軟水です。やわらかい口当たりのタイプです。",
  },
  {
    waterTypeLabel: "天然水",
    isNaturalWater: true,
    packLabel: "2L × 6本",
    is500x24: false,
    hardnessLabel: "軟水",
    isSoftWater: true,
    descriptionText:
      "採水地由来の風味を活かした天然水です。普段使い向けの定番商品です。",
    specText: "内容量は2L × 6本です。ケース単位での販売です。",
    checkoutSummaryText:
      "硬度区分は軟水です。用途に合う容量か確認してください。",
  },
  {
    waterTypeLabel: "飲用水（処理水）",
    isNaturalWater: false,
    packLabel: "500ml × 24本",
    is500x24: true,
    hardnessLabel: "中硬水",
    isSoftWater: false,
    descriptionText:
      "すっきり飲みやすいボトル飲料です。原水の種類は天然水ではありません。",
    specText: "内容量は500ml × 24本です。日常のストック向けです。",
    checkoutSummaryText:
      "硬度区分は中硬水です。飲み口はややしっかりしています。",
  },
  {
    waterTypeLabel: "天然水",
    isNaturalWater: true,
    packLabel: "350ml × 24本",
    is500x24: false,
    hardnessLabel: "軟水",
    isSoftWater: true,
    descriptionText:
      "天然水ならではの自然な味わいが特徴です。小容量で使いやすい商品です。",
    specText: "内容量は350ml × 24本です。ケース単位での販売です。",
    checkoutSummaryText:
      "硬度区分は軟水です。容量条件を確認してから購入してください。",
  },
];

function getDetailByIndex(index: number): TrialDetail {
  return trial11Details[index] ?? trial11Details[0];
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
                  <div className="space-y-2 text-sm leading-6 text-gray-600">
                    <p>{detail.descriptionText}</p>
                    <p>水の種類：{detail.waterTypeLabel}</p>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    仕様・補足
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>{detail.specText}</div>
                    <div>内容量：{detail.packLabel}</div>
                    <div>保存方法：高温・直射日光を避けて保管してください</div>
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
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>
                      硬度などの詳細は購入手続き画面の商品概要で確認できます。
                    </div>
                    <div>条件に合うか確認したうえで選択してください。</div>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    配送に関わる情報
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>送料は購入手続き画面で確認できます</div>
                    <div>通常配送・お急ぎ便・当日便を選択できます</div>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full items-end">
                  <Link
                    href={`/trials/b1/trial11/checkout?productId=${product.id}`}
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

        <div className="h-11 overflow-hidden text-xs leading-5 text-gray-500"></div>

        <div className="grid h-10 grid-cols-2 gap-2">
          <ProductDetailModal product={product} index={index} />

          <Link
            href={`/trials/b1/trial11/checkout?productId=${product.id}`}
            className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageB1Trial11() {
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
