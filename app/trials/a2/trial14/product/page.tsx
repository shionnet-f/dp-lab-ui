"use client";

import Link from "next/link";
import { useId } from "react";
import { products6 } from "@/config/products";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Product = (typeof products6)[number];

const discountFlags = [0, 1, 1, 0, 1, 0] as const;
const discountPriceMap = [
  null,
  { originalPriceYen: 1980, displayPriceYen: products6[1]?.priceYen ?? 1580 },
  { originalPriceYen: 1880, displayPriceYen: products6[2]?.priceYen ?? 1480 },
  null,
  { originalPriceYen: 1920, displayPriceYen: products6[4]?.priceYen ?? 1520 },
  null,
] as const;

function getPricePresentation(index: number, priceYen: number) {
  const isDiscounted = discountFlags[index] === 1;
  const mapped = discountPriceMap[index];

  if (!isDiscounted || !mapped) {
    return {
      isDiscounted: false,
      originalPriceYen: priceYen,
      displayPriceYen: priceYen,
    };
  }

  return {
    isDiscounted: true,
    originalPriceYen: mapped.originalPriceYen,
    displayPriceYen: mapped.displayPriceYen,
  };
}

function CardPrice({ index, priceYen }: { index: number; priceYen: number }) {
  const price = getPricePresentation(index, priceYen);

  if (!price.isDiscounted) {
    return <p className="mt-2 text-base font-medium text-gray-800">¥{yen(priceYen)}</p>;
  }

  return (
    <div className="mt-2 flex items-end gap-2">
      <span className="text-sm text-gray-500 line-through">¥{yen(price.originalPriceYen)}</span>
      <span className="text-base font-medium text-red-600">¥{yen(price.displayPriceYen)}</span>
    </div>
  );
}

function DetailPrice({ index, priceYen }: { index: number; priceYen: number }) {
  const price = getPricePresentation(index, priceYen);

  if (!price.isDiscounted) {
    return <div className="mt-2 text-xl font-semibold text-gray-900">¥{yen(priceYen)}</div>;
  }

  return (
    <div className="mt-2 flex items-end gap-3">
      <span className="text-base text-gray-500 line-through">¥{yen(price.originalPriceYen)}</span>
      <span className="text-xl font-semibold text-red-600">¥{yen(price.displayPriceYen)}</span>
    </div>
  );
}

type ProductDetailModalProps = {
  product: Product;
  index: number;
};

function ProductDetailModal({ product, index }: ProductDetailModalProps) {
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
                  <DetailPrice index={index} priceYen={product.priceYen} />
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">商品説明</h3>
                <div className="space-y-2 text-sm leading-6 text-gray-600">
                  <p>{product.description}</p>
                  <p>毎日の使用を想定した定番商品です。用途や内容を確認のうえ選択してください。</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">仕様・補足</h3>
                <div className="space-y-2 text-sm leading-6 text-gray-600">
                  <div>内容量：500ml × 24本</div>
                  <div>ケース単位での販売です</div>
                  <div>保存方法：高温・直射日光を避けて保管してください</div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">購入前の確認</h3>

              <div className="space-y-2 text-sm leading-6 text-gray-600">
                <p>配送方法や追加オプション、最終的なお支払い金額は購入手続き画面で確認できます。</p>
                <p>商品内容・数量・各種条件を確認したうえで、購入手続きへ進んでください。</p>
                <p>ご注文確定前に、配送先や選択内容をあらためてご確認ください。</p>
              </div>
            </section>

            <div className="pt-1">
              <Link
                href={`/trials/a2/trial14/checkout?productId=${product.id}`}
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

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className="h-[104px] rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
      <div className="grid h-full grid-cols-[112px_1fr_260px] items-center gap-5">
        <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
          画像
        </div>

        <div className="min-w-0">
          <h2 className="line-clamp-1 text-base font-semibold text-gray-900">
            {product.name}
          </h2>
          <CardPrice index={index} priceYen={product.priceYen} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ProductDetailModal product={product} index={index} />

          <Link
            href={`/trials/a2/trial14/checkout?productId=${product.id}`}
            className="flex h-11 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageA2Trial14() {
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

        <section className="grid flex-1 gap-5">
          {products6.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </section>
      </div>
    </main>
  );
}
