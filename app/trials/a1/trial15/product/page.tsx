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
  specText: string;
};

const trial15Details: TrialDetail[] = [
  {
    descriptionText:
      "毎日の飲用に使いやすい定番のボトル飲料です。日常のストックにも向いています。",
    specText:
      "ケース単位での販売商品で、内容量は500mlボトルが12本入った構成です。保存の際は高温や直射日光を避けてください。",
  },
  {
    descriptionText:
      "すっきりした後味で、日常使いしやすいボトル飲料です。まとめ買いにも向いています。",
    specText:
      "ケース単位での販売商品で、内容量は500mlボトルが12本入った構成です。購入前に内容を確認してください。",
  },
  {
    descriptionText:
      "飲みやすさを重視した商品で、毎日の補給向けに使いやすいボトル飲料です。",
    specText:
      "ケース単位での販売商品で、内容量は350mlボトルが12本入った構成です。保存の際は高温や直射日光を避けてください。",
  },
  {
    descriptionText:
      "まとめ買い向けの商品で、自宅用のストックとして使いやすいボトル飲料です。",
    specText:
      "ケース単位での販売商品で、内容量は2Lボトルが6本入った構成です。容量を確認したうえで選択してください。",
  },
  {
    descriptionText:
      "すっきり飲みやすいボトル飲料で、日常の補給にも使いやすい商品です。",
    specText:
      "ケース単位での販売商品で、内容量は500mlボトルが12本入った構成です。購入前に内容を確認してください。",
  },
  {
    descriptionText:
      "自然な味わいを意識したボトル飲料で、日常使いしやすい商品です。",
    specText:
      "ケース単位での販売商品で、内容量は350mlボトルが12本入った構成です。容量を確認したうえで選択してください。",
  },
];

/**
 * 0/1 フラグで送料無料UIを制御
 * 1: 赤字で「送料無料」を表示
 * 0: 表示しない
 */
const freeShippingFlags: number[] = [0, 1, 0, 1, 1, 0];

function getDetailByIndex(index: number): TrialDetail {
  return trial15Details[index] ?? trial15Details[0];
}

function getFreeShippingFlag(index: number): number {
  return freeShippingFlags[index] ?? 0;
}

function FreeShippingBadge({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="text-sm font-bold leading-5 text-red-600">送料無料</div>
  );
}

type ProductDetailModalProps = {
  product: Product;
  index: number;
};

function ProductDetailModal({ product, index }: ProductDetailModalProps) {
  const dialogId = useId();
  const detail = getDetailByIndex(index);
  const showFreeShipping = getFreeShippingFlag(index) === 1;

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
                  <div className="text-sm leading-6 text-gray-600">
                    {detail.specText}
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

                  <div className="mt-3">
                    <FreeShippingBadge visible={showFreeShipping} />
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    購入前の確認
                  </h4>
                  <div className="text-sm leading-6 text-gray-700">
                    商品の内容や価格を確認したうえで選択してください。
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    配送に関わる情報
                  </h4>
                  <div className="text-sm leading-6 text-gray-700">
                    配送方法は購入手続き画面で確認できます。
                  </div>
                </div>
              </section>

              <section className="rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full items-end">
                  <Link
                    href={`/trials/a1/trial15/checkout?productId=${product.id}`}
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
  const showFreeShipping = getFreeShippingFlag(index) === 1;

  return (
    <article className="h-[360px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid h-full grid-rows-[128px_78px_30px_40px] gap-4">
        <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
          画像エリア
        </div>

        <div className="grid h-[78px] grid-rows-[1fr_auto_auto] overflow-hidden">
          <h2 className="line-clamp-2 text-base font-semibold leading-5 text-gray-900">
            {product.name}
          </h2>

          <div className="text-base font-medium leading-5 text-gray-800">
            ¥{yen(product.priceYen)}
          </div>

          <FreeShippingBadge visible={showFreeShipping} />
        </div>

        <div className="h-[30px] overflow-hidden text-xs leading-5 text-gray-500">
          詳しい内容は商品詳細から確認できます
        </div>

        <div className="grid h-10 grid-cols-2 gap-2">
          <ProductDetailModal product={product} index={index} />

          <Link
            href={`/trials/a1/trial15/checkout?productId=${product.id}`}
            className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageA1Trial15() {
  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          水を1つ選んで購入してください。価格や内容を確認して選んでください。
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