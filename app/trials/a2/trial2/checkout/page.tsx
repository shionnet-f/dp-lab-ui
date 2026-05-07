"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackAction } from "@/app/actions/track";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getTrialPath } from "@/app/trials/_lib/path";
import { getProductById, trial2Data } from "../data";

const confirmPath = getTrialPath("a2", "trial2", "confirm");
const productPath = getTrialPath("a2", "trial2", "product");

type Props = {
  searchParams: Promise<{
    productId?: string;
    shipping?: string;
    options?: string | string[];
    set?: string;
  }>;
};

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

function normalizeOptions(options?: string | string[]) {
  if (!options) return [];
  return Array.isArray(options) ? options : [options];
}

export default function CheckoutPageA2Trial2({ searchParams }: Props) {
  const sp = use(searchParams);

  const selectedProduct = getProductById(sp?.productId);
  const set = sp?.set;

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

  const selectedShippingMethod =
    trial2Data.shippingMethods.find((method) => method.id === shipping) ?? null;

  const selectedOptionItems = trial2Data.options.filter((option) =>
    options.includes(option.id),
  );

  const productPrice = selectedProduct.priceYen;
  const shippingPrice = selectedShippingMethod?.priceYen ?? 0;
  const optionTotalPrice = selectedOptionItems.reduce(
    (sum, option) => sum + option.priceYen,
    0,
  );
  const totalPrice = productPrice + shippingPrice + optionTotalPrice;

  if (!set) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set がありません。
        </div>
      </main>
    );
  }

  return (
    <main className="h-[1080px] overflow-hidden bg-gray-50">
      <div className="mx-auto h-[1080px] w-[1160px] bg-gray-50">
        <TrialPageHeader
          purchaseConditions={trial2Data.purchaseConditions}
          title="購入手続き"
        />

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await trackAction({
              page: "checkout",
              type: "checkout_submit",
              payload: {
                productId: selectedProduct.id,
                productPrice,
                shippingId: shipping,
                shippingPrice,
                optionIds: options,
                optionTotalPrice,
                totalPrice,
              },
            });

            const params = new URLSearchParams();
            params.set("productId", selectedProduct.id);
            params.set("set", set);
            params.set("shipping", shipping ?? "");

            options.forEach((optionId) => {
              params.append("options", optionId);
            });

            router.push(`${confirmPath}?${params.toString()}`);
          }}
          className="h-[915px] w-[1160px] overflow-hidden"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="set" value={set} />
          <input type="hidden" name="shipping" value={shipping ?? ""} />

          {options.map((optionId) => (
            <input
              key={optionId}
              type="hidden"
              name="options"
              value={optionId}
            />
          ))}

          {/* 160px：商品情報パネル */}
          <article className="h-[160px] w-[1160px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="grid h-full grid-cols-[200px_1fr]">
              {/* 左：画像領域 */}
              <div className="flex h-full items-center justify-center">
                <div className="flex h-[120px] w-[160px] items-center justify-center overflow-hidden rounded-md bg-gray-100 text-[14px] text-gray-400">
                  画像
                </div>
              </div>

              {/* 右：商品名・価格 */}
              <div className="h-full min-w-0 pl-[20px] pr-[40px]">
                <div className="h-[10px]" />

                <div className="flex h-[30px] min-w-0 items-center overflow-hidden">
                  <h2 className="truncate text-[22px] font-semibold text-gray-900">
                    {selectedProduct.name}
                  </h2>
                </div>

                <div className="h-[10px]" />

                <div className="h-[60px]" />

                <div className="h-[10px]" />

                <div className="flex h-[30px] items-center overflow-hidden">
                  <p className="truncate text-[22px] font-semibold text-gray-900">
                    ¥{yen(selectedProduct.priceYen)}
                  </p>
                </div>

                <div className="h-[10px]" />
              </div>
            </div>
          </article>

          {/* 60px：空間 */}
          <div className="h-[60px]" />

          {/* 438px：配送方法・追加オプション */}
          <section className="grid h-[438px] w-[1160px] grid-cols-[550px_550px] gap-[60px] overflow-hidden">
            {/* 配送方法パネル */}
            <article className="h-[438px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <div className="flex h-[30px] items-center px-5">
                <h2 className="text-base font-semibold text-gray-900">
                  配送方法
                </h2>
              </div>

              <div className="h-[60px]" />

              {trial2Data.shippingMethods.map((method, index) => (
                <div key={method.id}>
                  <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="shippingRadio"
                      checked={shipping === method.id}
                      onChange={() => {
                        setShipping(method.id);

                        void trackAction({
                          page: "checkout",
                          type: "shipping_select",
                          payload: {
                            shippingId: method.id,
                            priceYen: method.priceYen,
                          },
                        });
                      }}
                    />

                    <div className="leading-tight">
                      <div className="font-medium text-gray-900">
                        {method.name}
                      </div>
                      <div className="text-gray-600">
                        {method.shortDescription}
                      </div>
                      <div className="text-gray-700">
                        ¥{yen(method.priceYen)}
                      </div>
                    </div>
                  </label>

                  {index < trial2Data.shippingMethods.length - 1 && (
                    <div className="h-[60px]" />
                  )}
                </div>
              ))}

              <div className="h-[15px]" />
            </article>

            {/* 追加オプションパネル */}
            <article className="h-[438px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <div className="flex h-[30px] items-center px-5">
                <h2 className="text-base font-semibold text-gray-900">
                  追加オプション
                </h2>
              </div>

              <div className="h-[60px]" />

              {trial2Data.options.map((option, index) => {
                const selected = options.includes(option.id);

                return (
                  <div key={option.id}>
                    <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => {
                          toggleOption(option.id);

                          void trackAction({
                            page: "checkout",
                            type: "option_toggle",
                            payload: {
                              optionId: option.id,
                              selected: !selected,
                              priceYen: option.priceYen,
                            },
                          });
                        }}
                      />

                      <div className="leading-tight">
                        <div className="font-medium text-gray-900">
                          {option.name}
                        </div>
                        <div className="text-gray-600">
                          {option.shortDescription}
                        </div>
                        <div className="text-gray-700">
                          +¥{yen(option.priceYen)}
                        </div>
                      </div>
                    </label>

                    {index < trial2Data.options.length - 1 && (
                      <div className="h-[60px]" />
                    )}
                  </div>
                );
              })}

              <div className="h-[141px]" />
            </article>
          </section>

          {/* 60px：空間 */}
          <div className="h-[60px]" />

          {/* 60px：ボタン領域 */}
          <div className="flex h-[60px] w-[1160px] items-center gap-[60px]">
            <button
              type="button"
              onClick={async () => {
                await trackAction({
                  page: "checkout",
                  type: "checkout_back",
                  payload: {
                    productId: selectedProduct.id,
                  },
                });

                router.push(`${productPath}?set=${set}`);
              }}
              className="flex h-[50px] w-[550px] items-center justify-center border border-gray-300 bg-white text-[16px] font-semibold text-gray-700"
            >
              商品一覧へ戻る
            </button>

            <button
              type="submit"
              className="flex h-[50px] w-[550px] items-center justify-center bg-black text-[16px] font-semibold text-white"
            >
              次へ進む
            </button>
          </div>

          {/* 137px：下部余白 */}
          <div className="h-[137px]" />
        </form>
      </div>
    </main>
  );
}