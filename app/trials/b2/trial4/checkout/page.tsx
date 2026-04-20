"use client";

import Link from "next/link";
import { use, useState } from "react";
import { getProductById, trial4Data, type ShippingMethod, type AddonOption } from "../data";

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

function openDialog(dialogId: string) {
  const el = document.getElementById(dialogId) as HTMLDialogElement | null;
  el?.showModal();
}

function closeDialog(dialogId: string) {
  const el = document.getElementById(dialogId) as HTMLDialogElement | null;
  el?.close();
}

function PricingOverviewDialog({
  dialogId,
  title,
  items,
  pricePrefix,
}: {
  dialogId: string;
  title: string;
  items: Array<{ id: string; name: string; shortDescription: string; priceYen: number }>;
  pricePrefix: string;
}) {
  return (
    <dialog id={dialogId} className="m-auto w-full max-w-lg rounded-2xl p-0 backdrop:bg-black/30">
      <div className="rounded-2xl bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={() => closeDialog(dialogId)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            閉じる
          </button>
        </div>

        <div className="space-y-3 px-6 py-5 text-sm text-gray-600">
          {items.map((item) => (
            <div key={item.id} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-medium text-gray-800">{item.name}</div>
                  <div className="mt-1 text-xs leading-5 text-gray-500">{item.shortDescription}</div>
                </div>
                <div className="shrink-0 text-sm font-medium text-gray-700">
                  {pricePrefix}¥{yen(item.priceYen)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
}

function ShippingOptionCard({
  method,
  checked,
  onChange,
}: {
  method: ShippingMethod;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
      <input
        type="radio"
        name="shippingRadio"
        value={method.id}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="min-w-0">
        <div className="font-medium text-gray-700">{method.name}</div>
        <div className="text-gray-500">{method.shortDescription}</div>
      </div>
    </label>
  );
}

function AddonOptionCard({
  option,
  checked,
  onToggle,
}: {
  option: AddonOption;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex items-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <div className="min-w-0">
        <div className="font-medium text-gray-700">{option.name}</div>
        <div className="text-gray-500">{option.shortDescription}</div>
      </div>
    </label>
  );
}

export default function CheckoutPageB2Trial4({ searchParams }: Props) {
  const sp = use(searchParams);
  const selectedProduct = getProductById(sp?.productId);
  const [shipping, setShipping] = useState<string>(sp?.shipping ?? "");
  const [options, setOptions] = useState<string[]>(normalizeOptions(sp?.options));

  function toggleOption(value: string) {
    setOptions((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value],
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{trial4Data.purchaseConditions.budgetYen}円以内、
          {trial4Data.purchaseConditions.quantityCondition}、
          {trial4Data.purchaseConditions.specificCondition}
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">購入手続き</h1>
        </header>

        <form
          action="/trials/b2/trial4/confirm"
          method="GET"
          className="grid flex-1 grid-rows-[172px_minmax(0,300px)_auto] gap-6"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="shipping" value={shipping} />
          {options.map((o) => (
            <input key={o} type="hidden" name="options" value={o} />
          ))}

          <section className="rounded-xl border border-gray-200 bg-white px-6 py-7 shadow-sm">
            <div className="grid h-full grid-cols-[120px_1fr_auto] items-center gap-6">
              <div className="flex h-24 w-[120px] items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                画像
              </div>

              <div className="min-w-0">
                <div className="truncate text-lg font-medium text-gray-800">{selectedProduct.name}</div>
                <div className="mt-3 text-base text-gray-600">商品価格：¥{yen(selectedProduct.priceYen)}</div>
                <div className="mt-2 text-sm text-gray-400">ご選択中の商品</div>
              </div>

              <div className="text-sm text-gray-400">注文商品</div>
            </div>
          </section>

          <section className="grid min-h-0 grid-cols-2 gap-5">
            <article className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-sm font-medium text-gray-500">配送方法</h2>
                <button
                  type="button"
                  onClick={() => openDialog("shipping-pricing-overview")}
                  className="text-xs text-gray-400 underline underline-offset-2"
                >
                  詳細を見る
                </button>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                {trial4Data.shippingMethods.map((method) => (
                  <ShippingOptionCard
                    key={method.id}
                    method={method}
                    checked={shipping === method.id}
                    onChange={setShipping}
                  />
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-sm font-medium text-gray-500">追加オプション</h2>
                <button
                  type="button"
                  onClick={() => openDialog("option-pricing-overview")}
                  className="text-xs text-gray-400 underline underline-offset-2"
                >
                  詳細を見る
                </button>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                {trial4Data.options.map((option) => (
                  <AddonOptionCard
                    key={option.id}
                    option={option}
                    checked={options.includes(option.id)}
                    onToggle={() => toggleOption(option.id)}
                  />
                ))}
              </div>
            </article>
          </section>

          <section className="px-2 py-4 shrink-0">
            <div className="grid h-full grid-cols-2 gap-3">
              <Link
                href="/trials/b2/trial4/product"
                className="flex h-11 items-center justify-center rounded-md border border-gray-300 bg-white px-5 text-sm font-medium text-gray-700 shadow-sm"
              >
                商品一覧へ戻る
              </Link>

              <button
                type="submit"
                className="h-11 rounded-md bg-black px-5 text-sm font-medium text-white shadow-sm"
              >
                次へ進む
              </button>
            </div>
          </section>
        </form>
      </div>

      <PricingOverviewDialog
        dialogId="shipping-pricing-overview"
        title="配送方法の料金形態"
        items={trial4Data.shippingMethods}
        pricePrefix="送料："
      />

      <PricingOverviewDialog
        dialogId="option-pricing-overview"
        title="追加オプションの料金形態"
        items={trial4Data.options}
        pricePrefix="追加料金：+"
      />
    </main>
  );
}
