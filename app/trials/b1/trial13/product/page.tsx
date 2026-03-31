"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { products6 } from "@/config/products";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Product = (typeof products6)[number];
type DetailKind = "description" | "spec" | "confirm" | null;

type TrialDetail = {
  waterTypeLabel: string;
  packLabel: string;
  hardnessLabel: string;
  descriptionPreview: string;
  specPreview: string;
  confirmPreview: string;
  descriptionModalText: string;
  specModalText: string;
  confirmModalText: string;
};

const trial13Details: TrialDetail[] = [
  {
    waterTypeLabel: "天然水",
    packLabel: "500ml × 24本",
    hardnessLabel: "軟水",
    descriptionPreview: "原水や風味に関する案内があります。",
    specPreview: "内容量や販売単位に関する案内があります。",
    confirmPreview: "飲み口や確認事項に関する案内があります。",
    descriptionModalText:
      "この商品の原水は採水地由来の天然水として案内されています。日常の飲用を想定した定番タイプです。",
    specModalText:
      "販売単位はケースで、構成は500mlボトルが24本入りです。日常のストックや持ち運びにも使いやすい内容です。",
    confirmModalText:
      "飲み口はやわらかく感じやすい軟水タイプとして案内されています。条件に合うか確認したうえで選択してください。",
  },
  {
    waterTypeLabel: "天然水",
    packLabel: "500ml × 24本",
    hardnessLabel: "中硬水",
    descriptionPreview: "原水や風味に関する案内があります。",
    specPreview: "内容量や販売単位に関する案内があります。",
    confirmPreview: "飲み口や確認事項に関する案内があります。",
    descriptionModalText:
      "この商品の原水は採水地由来の天然水として案内されています。すっきりした後味が特徴の商品です。",
    specModalText:
      "販売単位はケースで、構成は500mlボトルが24本入りです。数量面では扱いやすい内容です。",
    confirmModalText:
      "飲み口はややしっかりめに感じやすい中硬水タイプとして案内されています。条件に合うか確認したうえで選択してください。",
  },
  {
    waterTypeLabel: "飲用水（処理水）",
    packLabel: "500ml × 24本",
    hardnessLabel: "軟水",
    descriptionPreview: "原水や風味に関する案内があります。",
    specPreview: "内容量や販売単位に関する案内があります。",
    confirmPreview: "飲み口や確認事項に関する案内があります。",
    descriptionModalText:
      "この商品は飲みやすさを重視したボトル飲料ですが、原水の種類としては天然水ではなく処理工程を経た飲用水です。",
    specModalText:
      "販売単位はケースで、構成は500mlボトルが24本入りです。日常のストック向けの内容です。",
    confirmModalText:
      "飲み口はやわらかく感じやすい軟水タイプとして案内されています。条件に合うか確認したうえで選択してください。",
  },
  {
    waterTypeLabel: "天然水",
    packLabel: "2L × 6本",
    hardnessLabel: "軟水",
    descriptionPreview: "原水や風味に関する案内があります。",
    specPreview: "内容量や販売単位に関する案内があります。",
    confirmPreview: "飲み口や確認事項に関する案内があります。",
    descriptionModalText:
      "この商品の原水は採水地由来の天然水として案内されています。普段使い向けの定番商品です。",
    specModalText:
      "販売単位はケースですが、構成は2Lボトルが6本入りです。まとめ買い向けの内容です。",
    confirmModalText:
      "飲み口はやわらかく感じやすい軟水タイプとして案内されています。条件に合うか確認したうえで選択してください。",
  },
  {
    waterTypeLabel: "飲用水（処理水）",
    packLabel: "500ml × 24本",
    hardnessLabel: "中硬水",
    descriptionPreview: "原水や風味に関する案内があります。",
    specPreview: "内容量や販売単位に関する案内があります。",
    confirmPreview: "飲み口や確認事項に関する案内があります。",
    descriptionModalText:
      "この商品はすっきり飲みやすいボトル飲料ですが、原水の種類としては天然水ではなく処理工程を経た飲用水です。",
    specModalText:
      "販売単位はケースで、構成は500mlボトルが24本入りです。日常のストック向けの内容です。",
    confirmModalText:
      "飲み口はややしっかりめに感じやすい中硬水タイプとして案内されています。条件に合うか確認したうえで選択してください。",
  },
  {
    waterTypeLabel: "天然水",
    packLabel: "350ml × 24本",
    hardnessLabel: "軟水",
    descriptionPreview: "原水や風味に関する案内があります。",
    specPreview: "内容量や販売単位に関する案内があります。",
    confirmPreview: "飲み口や確認事項に関する案内があります。",
    descriptionModalText:
      "この商品の原水は採水地由来の天然水として案内されています。自然な味わいを意識した商品です。",
    specModalText:
      "販売単位はケースで、構成は350mlボトルが24本入りです。本数は十分ですが容量条件は確認が必要です。",
    confirmModalText:
      "飲み口はやわらかく感じやすい軟水タイプとして案内されています。条件に合うか確認したうえで選択してください。",
  },
];

function getDetailByIndex(index: number): TrialDetail {
  return trial13Details[index] ?? trial13Details[0];
}

function NestedInfoModal({
  open,
  title,
  body,
  onClose,
}: {
  open: boolean;
  title: string;
  body: string;
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

        <div className="px-5 py-5 text-sm leading-7 text-gray-700">{body}</div>
      </div>
    </div>
  );
}

type ProductDetailModalProps = {
  product: Product;
  index: number;
};

function ProductDetailModal({ product, index }: ProductDetailModalProps) {
  const dialogId = useId();
  const detail = getDetailByIndex(index);
  const [openInner, setOpenInner] = useState<DetailKind>(null);

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
        <div className="relative mx-auto rounded-2xl bg-white">
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
                setOpenInner(null);
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

              <button
                type="button"
                onClick={() => setOpenInner("description")}
                className="overflow-hidden rounded-xl border-2 border-gray-300 p-4 text-left transition hover:bg-gray-50"
              >
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    商品説明
                  </h3>
                  <div className="text-sm leading-6 text-gray-600">
                    {detail.descriptionPreview}
                  </div>
                  <div className="mt-auto pt-3 text-xs text-gray-500">
                    クリックして詳細を表示
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOpenInner("spec")}
                className="overflow-hidden rounded-xl border-2 border-gray-300 p-4 text-left transition hover:bg-gray-50"
              >
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    仕様・補足
                  </h3>
                  <div className="text-sm leading-6 text-gray-600">
                    {detail.specPreview}
                  </div>
                  <div className="mt-auto pt-3 text-xs text-gray-500">
                    クリックして詳細を表示
                  </div>
                </div>
              </button>
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

              <button
                type="button"
                onClick={() => setOpenInner("confirm")}
                className="overflow-hidden rounded-xl border-2 border-gray-300 p-4 text-left transition hover:bg-gray-50"
              >
                <div className="flex h-full flex-col">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    購入前の確認
                  </h4>
                  <div className="text-sm leading-6 text-gray-700">
                    {detail.confirmPreview}
                  </div>
                  <div className="mt-auto pt-3 text-xs text-gray-500">
                    クリックして詳細を表示
                  </div>
                </div>
              </button>

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
                    href={`/trials/b1/trial13/checkout?productId=${product.id}`}
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
            body={detail.descriptionModalText}
            onClose={() => setOpenInner(null)}
          />
          <NestedInfoModal
            open={openInner === "spec"}
            title="仕様・補足の詳細"
            body={detail.specModalText}
            onClose={() => setOpenInner(null)}
          />
          <NestedInfoModal
            open={openInner === "confirm"}
            title="購入前の確認の詳細"
            body={detail.confirmModalText}
            onClose={() => setOpenInner(null)}
          />
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
          詳しい情報は商品詳細内の各項目から確認できます
        </div>

        <div className="grid h-10 grid-cols-2 gap-2">
          <ProductDetailModal product={product} index={index} />

          <Link
            href={`/trials/b1/trial13/checkout?productId=${product.id}`}
            className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          >
            購入へ
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductPageB1Trial13() {
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
