"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { trial11Data, type Trial11Product } from "../data";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type DetailKind = "description" | "spec" | "confirm" | null;

function NestedInfoModal({
  open,
  title,
  body,
  onClose,
}: {
  open: boolean;
  title: string;
  body: string[];
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h4 className="text-base font-semibold text-gray-900">{title}</h4>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            閉じる
          </button>
        </div>

        <div className="space-y-2 px-5 py-5 text-sm leading-7 text-gray-700">
          {body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

type ProductDetailModalProps = {
  product: Trial11Product;
};

function ProductDetailModal({ product }: ProductDetailModalProps) {
  const dialogId = useId();
  const [openInner, setOpenInner] = useState<DetailKind>(null);

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
        <div className="relative mx-auto rounded-2xl bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">商品詳細</h2>
            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
              onClick={() => {
                const el = document.getElementById(dialogId) as HTMLDialogElement | null;
                el?.close();
                setOpenInner(null);
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

              <button
                type="button"
                onClick={() => setOpenInner("description")}
                className="overflow-hidden rounded-xl border-2 border-gray-300 p-4 text-left"
              >
                <div className="flex h-full flex-col">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-gray-900">商品説明</h3>
                    <span className="text-xs text-gray-500">クリックして詳細を表示</span>
                  </div>
                  <div className="text-sm leading-6 text-gray-600">
                    商品の特徴や用途に関する説明があります。
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOpenInner("spec")}
                className="overflow-hidden rounded-xl border-2 border-gray-300 p-4 text-left"
              >
                <div className="flex h-full flex-col">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-gray-900">仕様・補足</h3>
                    <span className="text-xs text-gray-500">クリックして詳細を表示</span>
                  </div>
                  <div className="text-sm leading-6 text-gray-600">
                    サイズや表示形式に関する案内があります。
                  </div>
                </div>
              </button>
            </div>

            <div className="grid grid-rows-[160px_140px_120px_1fr] gap-5">
              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col justify-start">
                  <h3 className="text-2xl font-bold leading-tight text-gray-900">{product.name}</h3>
                  <div className="mt-3 text-2xl font-semibold text-gray-900">¥{yen(product.priceYen)}</div>
                </div>
              </section>

              <button
                type="button"
                onClick={() => setOpenInner("confirm")}
                className="overflow-hidden rounded-xl border-2 border-gray-300 p-4 text-left"
              >
                <div className="flex h-full flex-col">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-gray-900">購入前の確認</h4>
                    <span className="text-xs text-gray-500">クリックして詳細を表示</span>
                  </div>
                  <div className="text-sm leading-6 text-gray-700">
                    購入時に確認しておきたい事項があります。
                  </div>
                </div>
              </button>

              <section className="overflow-hidden rounded-xl border-2 border-gray-300 p-4">
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">配送に関わる情報</h4>
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
                    href={`/trials/b1/trial11/checkout?productId=${product.id}`}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
                  >
                    この商品を選ぶ
                  </Link>
                </div>
              </section>
            </div>
          </div>

          <NestedInfoModal
            open={openInner === "description"}
            title="商品説明の詳細"
            body={[
              product.description,
              "見た目だけでなく、用途やレイアウトも確認してから選択してください。",
            ]}
            onClose={() => setOpenInner(null)}
          />
          <NestedInfoModal
            open={openInner === "spec"}
            title="仕様・補足の詳細"
            body={product.specsAndNotes}
            onClose={() => setOpenInner(null)}
          />
          <NestedInfoModal
            open={openInner === "confirm"}
            title="購入前の確認の詳細"
            body={product.prePurchaseCheck}
            onClose={() => setOpenInner(null)}
          />
        </div>
      </dialog>
    </>
  );
}

function ProductCard({ product }: { product: Trial11Product }) {
  return (
    <article className="h-[360px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid h-full grid-rows-[128px_64px_44px_40px] gap-4">
        <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
          画像エリア
        </div>

        <div className="grid h-16 grid-rows-[1fr_auto] overflow-hidden">
          <h2 className="line-clamp-2 text-base font-semibold leading-5 text-gray-900">{product.name}</h2>
          <p className="text-base font-medium leading-5 text-gray-800">¥{yen(product.priceYen)}</p>
        </div>

        <div className="h-11 overflow-hidden text-xs leading-5 text-gray-500">
          詳しい情報は商品詳細内の各項目から確認できます
        </div>

        <div className="grid h-10 grid-cols-2 gap-2">
          <ProductDetailModal product={product} />
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
          予算{trial11Data.purchaseConditions.budgetYen}円以内、
          {trial11Data.purchaseConditions.quantityCondition}、
          {trial11Data.purchaseConditions.specificCondition}
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">商品一覧</h1>
        </header>

        <section className="grid flex-1 grid-cols-2 gap-8">
          {trial11Data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}
