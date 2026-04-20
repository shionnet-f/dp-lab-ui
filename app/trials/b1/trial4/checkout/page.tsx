"use client";

import { use, useId, useState } from "react";
import Link from "next/link";
import { getProductById, trial4Data } from "../data";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Props = {
  searchParams: Promise<{
    productId?: string;
    shipping?: string;
    options?: string | string[];
  }>;
};

function normalizeOptions(options?: string | string[]) {
  if (!options) return [];
  return Array.isArray(options) ? options : [options];
}

type DetailDialogButtonProps = {
  title: string;
  rows: Array<{ label: string; value: string }>;
};

function DetailDialogButton({ title, rows }: DetailDialogButtonProps) {
  const dialogId = useId();

  return (
    <>
      <button
        type="button"
        className="rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-700"
        onClick={() => {
          const el = document.getElementById(dialogId) as HTMLDialogElement | null;
          el?.showModal();
        }}
      >
        料金詳細を見る
      </button>

      <dialog
        id={dialogId}
        className="m-auto w-full max-w-lg rounded-2xl p-0 backdrop:bg-black/30"
      >
        <div className="rounded-2xl bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
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

          <div className="space-y-3 px-6 py-6 text-sm text-gray-700">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3"
              >
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}

export default function CheckoutPageB1Trial4({ searchParams }: Props) {
  const sp = use(searchParams);
  const selectedProduct = getProductById(sp?.productId);
  const [shipping, setShipping] = useState<string | null>(sp?.shipping ?? null);
  const [options, setOptions] = useState<string[]>(normalizeOptions(sp?.options));

  function toggleOption(value: string) {
    setOptions((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value],
    );
  }

  const shippingDetailRows = trial4Data.shippingMethods.map((method) => ({
    label: method.name,
    value: `¥${yen(method.priceYen)}`,
  }));

  const optionDetailRows = trial4Data.options.map((option) => ({
    label: option.name,
    value: `+¥${yen(option.priceYen)}`,
  }));

  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{trial4Data.purchaseConditions.budgetYen}円以内、
          {trial4Data.purchaseConditions.quantityCondition}、
          {trial4Data.purchaseConditions.specificCondition}
        </div>

        <header className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">ご注文内容の確認</h1>
        </header>

        <form
          action="/trials/b1/trial4/confirm"
          method="GET"
          className="grid flex-1 grid-cols-[1.5fr_1fr] gap-6"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="shipping" value={shipping ?? ""} />
          {options.map((o) => (
            <input key={o} type="hidden" name="options" value={o} />
          ))}

          <div className="space-y-10">
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">配送方法</h2>
                <DetailDialogButton title="配送方法の料金詳細" rows={shippingDetailRows} />
              </div>

              <div className="space-y-4 text-sm text-gray-700">
                {trial4Data.shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3"
                  >
                    <input
                      type="radio"
                      name="shippingRadio"
                      checked={shipping === method.id}
                      onChange={() => setShipping(method.id)}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{method.name}</div>
                      <div className="text-gray-600">{method.shortDescription}</div>
                    </div>
                  </label>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">追加オプション</h2>
                <DetailDialogButton title="追加オプションの料金詳細" rows={optionDetailRows} />
              </div>

              <div className="space-y-4 text-sm text-gray-700">
                {trial4Data.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-start gap-3 rounded-md border border-gray-200 px-4 py-3"
                  >
                    <input
                      type="checkbox"
                      checked={options.includes(option.id)}
                      onChange={() => toggleOption(option.id)}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.name}</div>
                      <div className="text-gray-600">{option.shortDescription}</div>
                    </div>
                  </label>
                ))}
              </div>
            </article>
          </div>

          <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">ご注文商品</h2>

            <div className="space-y-4">
              <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                画像エリア
              </div>

              <div className="min-h-[44px] overflow-hidden text-base font-semibold leading-6 text-gray-900">
                {selectedProduct.name}
              </div>

              <div className="text-base font-medium text-gray-800">¥{yen(selectedProduct.priceYen)}</div>

              <div className="min-h-[96px] overflow-hidden p-0 text-sm leading-6 text-gray-600">
                {selectedProduct.description}
              </div>
            </div>

            <div className="mt-auto space-y-6 text-gray-900">
              <div className="pt-4 text-sm text-gray-600">
                配送方法と追加オプションの金額は、それぞれの「料金詳細を見る」から確認できます。
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-md bg-black px-4 py-3 text-sm font-medium text-white"
                >
                  次へ進む
                </button>

                <Link
                  href="/trials/b1/trial4/product"
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  商品一覧へ戻る
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
