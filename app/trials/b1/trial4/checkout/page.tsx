"use client";

import { use, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductById, trial4Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getTrialPath } from "@/app/trials/_lib/path";

const confirmPath = getTrialPath("b1", "trial4", "confirm");
const productPath = getTrialPath("b1", "trial4", "product");

type Props = {
  searchParams: Promise<{
    productId?: string;
    shipping?: string;
    options?: string | string[];
    set?: string;
    trial?: string;
  }>;
};

function normalizeOptions(options?: string | string[]) {
  if (!options) return [];
  return Array.isArray(options) ? options : [options];
}

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type DetailDialogButtonProps = {
  title: string;
  rows: Array<{ label: string; value: string }>;
  detailType: "shipping" | "option";
};

function DetailDialogButton({
  title,
  rows,
  detailType,
}: DetailDialogButtonProps) {
  const dialogId = useId();

  return (
    <>
      <button
        type="button"
        className="h-[30px] rounded-md border border-gray-300 px-3 text-[12px] font-medium text-gray-700"
        onClick={() => {
          void trackAction({
            page: "checkout",
            type: "open_price_detail",
            meta: {},
            payload: {
              detailType,
            },
          });

          const el = document.getElementById(
            dialogId,
          ) as HTMLDialogElement | null;
          el?.showModal();
        }}
      >
        料金詳細を見る
      </button>

      <dialog
        id={dialogId}
        className="fixed left-[700px] top-[220px] h-[520px] w-[520px] overflow-hidden rounded-xl p-0 backdrop:bg-black/40"
      >
        <div className="h-full w-full overflow-hidden bg-white">
          <div className="flex h-[70px] items-center justify-between border-b border-gray-200 px-[40px]">
            <h2 className="text-[18px] font-semibold text-gray-900">{title}</h2>

            <button
              type="button"
              className="h-[36px] w-[88px] rounded-md border border-gray-300 text-[14px] text-gray-700"
              onClick={() => {
                void trackAction({
                  page: "checkout",
                  type: "close_price_detail",
                  meta: {},
                  payload: {
                    detailType,
                  },
                });

                const el = document.getElementById(
                  dialogId,
                ) as HTMLDialogElement | null;
                el?.close();
              }}
            >
              閉じる
            </button>
          </div>

          <div className="h-[390px] px-[40px]">
            <div className="h-[60px]" />

            {rows.map((row, index) => (
              <div key={row.label}>
                <div className="flex h-[60px] items-center justify-between rounded-md border border-gray-200 px-[20px] text-[14px] text-gray-700">
                  <span>{row.label}</span>
                  <span className="font-semibold text-gray-900">
                    {row.value}
                  </span>
                </div>

                {index < rows.length - 1 && <div className="h-[60px]" />}
              </div>
            ))}

            <div className="h-[30px]" />
          </div>
        </div>
      </dialog>
    </>
  );
}

type ShippingMethod = {
  id: string;
  name: string;
  priceYen: number;
  shortDescription: string;
};

type ShippingMethodSectionHiddenDetailProps = {
  shippingMethods: ShippingMethod[];
  selectedShipping: string | null;
  onChangeShipping: (id: string) => void;
};

function ShippingMethodSectionHiddenDetail({
  shippingMethods,
  selectedShipping,
  onChangeShipping,
}: ShippingMethodSectionHiddenDetailProps) {
  const shippingDetailRows = shippingMethods.map((method) => ({
    label: method.name,
    value: `¥${yen(method.priceYen)}`,
  }));

  return (
    <article className="h-[438px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="h-[15px]" />

      <div className="flex h-[30px] items-center justify-between px-5">
        <h2 className="text-base font-semibold text-gray-900">配送方法</h2>

        <DetailDialogButton
          title="配送方法の料金詳細"
          rows={shippingDetailRows}
          detailType="shipping"
        />
      </div>

      <div className="h-[60px]" />

      {shippingMethods.map((method, index) => (
        <div key={method.id}>
          <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
            <input
              type="radio"
              name="shippingRadio"
              checked={selectedShipping === method.id}
              onChange={() => {
                onChangeShipping(method.id);

                void trackAction({
                  page: "checkout",
                  type: "shipping_select",
                  meta: {},
                  payload: {
                    shippingId: method.id,
                  },
                });
              }}
            />

            <div className="leading-tight">
              <div className="font-medium text-gray-900">{method.name}</div>
              <div className="text-gray-600">{method.shortDescription}</div>
            </div>
          </label>

          {index < shippingMethods.length - 1 && <div className="h-[60px]" />}
        </div>
      ))}

      <div className="h-[15px]" />
    </article>
  );
}

type OptionItem = {
  id: string;
  name: string;
  priceYen: number;
  shortDescription: string;
};

type OptionSectionHiddenDetailProps = {
  options: OptionItem[];
  selectedOptions: string[];
  onToggleOption: (id: string) => void;
};

function OptionSectionHiddenDetail({
  options,
  selectedOptions,
  onToggleOption,
}: OptionSectionHiddenDetailProps) {
  const optionDetailRows = options.map((option) => ({
    label: option.name,
    value: `+¥${yen(option.priceYen)}`,
  }));

  return (
    <article className="h-[312px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="h-[15px]" />

      <div className="flex h-[30px] items-center justify-between px-5">
        <h2 className="text-base font-semibold text-gray-900">
          追加オプション
        </h2>

        <DetailDialogButton
          title="追加オプションの料金詳細"
          rows={optionDetailRows}
          detailType="option"
        />
      </div>

      <div className="h-[60px]" />

      {options.map((option, index) => {
        const selected = selectedOptions.includes(option.id);

        return (
          <div key={option.id}>
            <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => {
                  onToggleOption(option.id);

                  void trackAction({
                    page: "checkout",
                    type: "option_toggle",
                    meta: {},
                    payload: {
                      optionId: option.id,
                      selected: !selected,
                    },
                  });
                }}
              />

              <div className="leading-tight">
                <div className="font-medium text-gray-900">{option.name}</div>
                <div className="text-gray-600">{option.shortDescription}</div>
              </div>
            </label>

            {index < options.length - 1 && <div className="h-[60px]" />}
          </div>
        );
      })}

      <div className="h-[15px]" />
    </article>
  );
}

export default function CheckoutPageB1Trial4({ searchParams }: Props) {
  const sp = use(searchParams);

  const selectedProduct = getProductById(sp?.productId);
  const set = sp?.set;
  const trial = sp?.trial;

  const [shipping, setShipping] = useState<string | null>(sp?.shipping ?? null);
  const [options, setOptions] = useState<string[]>(
    normalizeOptions(sp?.options),
  );

  const didTrack = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    void trackAction({
      page: "checkout",
      type: "page_view",
      meta: {},
      payload: {},
    });
  }, []);

  function toggleOption(value: string) {
    setOptions((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value],
    );
  }

  if (!set || !trial) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set または trial がありません。
        </div>
      </main>
    );
  }

  return (
    <main className="h-[1080px] overflow-hidden bg-gray-50">
      <div className="mx-auto h-[1080px] w-[1160px] bg-gray-50">
        <TrialPageHeader
          purchaseConditions={trial4Data.purchaseConditions}
          title="購入手続き"
        />

        {/* 810pxのメイン領域 */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await trackAction({
              page: "checkout",
              type: "checkout_submit",
              meta: {},
              payload: {
                productId: selectedProduct.id,
                shippingId: shipping,
                optionIds: options,
              },
            });

            const params = new URLSearchParams();
            params.set("productId", selectedProduct.id);
            params.set("set", set);
            params.set("trial", trial);
            params.set("shipping", shipping ?? "");

            options.forEach((o) => {
              params.append("options", o);
            });

            router.push(`${confirmPath}?${params.toString()}`);
          }}
          className="flex h-[810px] w-[1160px] gap-[60px]"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="set" value={set} />
          <input type="hidden" name="trial" value={trial} />
          <input type="hidden" name="shipping" value={shipping ?? ""} />

          {options.map((o) => (
            <input key={o} type="hidden" name="options" value={o} />
          ))}

          {/* 左側 */}
          <div className="h-[810px] w-[720px]">
            {/* 配送方法領域：438px */}
            <ShippingMethodSectionHiddenDetail
              shippingMethods={trial4Data.shippingMethods}
              selectedShipping={shipping}
              onChangeShipping={setShipping}
            />

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* オプション領域：312px */}
            <OptionSectionHiddenDetail
              options={trial4Data.options}
              selectedOptions={options}
              onToggleOption={toggleOption}
            />
          </div>

          {/* 右側：810pxのご注文商品領域 */}
          <div className="flex h-[810px] w-[416px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
            <div className="h-[15px]" />

            <div className="flex h-[60px] items-center">
              <h2 className="text-base font-semibold text-gray-900">
                ご注文商品
              </h2>
            </div>

            <div className="flex h-[120px] w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
              画像エリア
            </div>

            <div className="h-[60px]" />

            <div className="h-[44px] overflow-hidden text-base font-semibold leading-6 text-gray-900">
              {selectedProduct.name}
            </div>

            <div className="h-[60px]" />

            <div className="h-[96px] overflow-hidden rounded-md border border-gray-200 p-3 text-sm leading-6 text-gray-600">
              {selectedProduct.description}
            </div>

            <div className="h-[80px]" />

            <p className="h-[40px] text-[13px] leading-[20px] text-gray-500"></p>

            <div className="h-[60px]" />

            <button
              type="submit"
              className="h-[50px] w-full cursor-pointer rounded-md bg-black px-4 text-sm font-medium text-white"
            >
              次へ進む
            </button>

            <div className="h-[60px]" />

            <button
              type="button"
              onClick={async () => {
                await trackAction({
                  page: "checkout",
                  type: "checkout_back",
                  meta: {},
                  payload: {},
                });

                router.push(`${productPath}?set=${set}&trial=${trial}`);
              }}
              className="flex h-[50px] w-full items-center justify-center rounded-md border border-gray-300 px-4 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              商品一覧へ戻る
            </button>

            <div className="h-[15px]" />
          </div>
        </form>

        {/* 105pxの空間 */}
        <div className="h-[105px]" />
      </div>
    </main>
  );
}
