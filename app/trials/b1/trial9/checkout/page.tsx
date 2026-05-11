"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductById, getShippingPrice, trial9Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getTrialPath } from "@/app/trials/_lib/path";

const confirmPath = getTrialPath("b1", "trial9", "confirm");
const productPath = getTrialPath("b1", "trial9", "product");

type Props = {
  searchParams: Promise<{
    productId?: string;
    shipping?: string;
    options?: string | string[];
    set?: string;
    trial?: string;
  }>;
};

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

function normalizeOptions(options?: string | string[]) {
  if (!options) return [];
  return Array.isArray(options) ? options : [options];
}

export default function CheckoutPageB1Trial9({ searchParams }: Props) {
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


  function createLogBase() {
    const logParams = new URLSearchParams();

    if (set) logParams.set("set", set);
    if (trial) logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    trackAction({
      ...createLogBase(),
      phase: "main",
      page: "checkout",
      type: "page_view",
      meta: { implTrialId: "trial9" },
      payload: {
        productId: selectedProduct.id,
      },
    });
  }, [selectedProduct.id]);

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
          purchaseConditions={trial9Data.purchaseConditions}
          title="購入手続き"
        />

        {/* 810pxのメイン領域 */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await trackAction({
              ...createLogBase(),
              phase: "main",
              page: "checkout",
              type: "checkout_submit",
              meta: { implTrialId: "trial9" },
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

            options.forEach((optionId) => {
              params.append("options", optionId);
            });

            router.push(`${confirmPath}?${params.toString()}`);
          }}
          className="flex h-[810px] w-[1160px] gap-[60px]"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="set" value={set} />
          <input type="hidden" name="trial" value={trial} />
          <input type="hidden" name="shipping" value={shipping ?? ""} />

          {options.map((optionId) => (
            <input
              key={optionId}
              type="hidden"
              name="options"
              value={optionId}
            />
          ))}

          {/* 左側 */}
          <div className="h-[810px] w-[720px]">
            {/* 配送方法領域：438px */}
            <article className="h-[438px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <div className="flex h-[30px] items-center px-5">
                <h2 className="text-[20px] font-bold text-gray-900">
                  配送方法
                </h2>
              </div>

              <div className="h-[60px]" />

              {trial9Data.shippingMethods.map((method, index) => {
                const shippingPriceYen = getShippingPrice(
                  selectedProduct.id,
                  method.id,
                );

                return (
                  <div key={method.id}>
                    <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="shippingRadio"
                        value={method.id}
                        checked={shipping === method.id}
                        onChange={() => {
                          setShipping(method.id);

                          trackAction({
                            ...createLogBase(),
                            phase: "main",
                            page: "checkout",
                            type: "shipping_select",
                            meta: { implTrialId: "trial9" },
                            payload: {
                              productId: selectedProduct.id,
                              shippingId: method.id,
                              priceYen: shippingPriceYen,
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
                          +¥{yen(shippingPriceYen)}
                        </div>
                      </div>
                    </label>

                    {index < trial9Data.shippingMethods.length - 1 && (
                      <div className="h-[60px]" />
                    )}
                  </div>
                );
              })}

              <div className="h-[15px]" />
            </article>

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* オプション領域：312px */}
            <article className="h-[312px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <div className="flex h-[30px] items-center px-5">
                <h2 className="text-[20px] font-bold text-gray-900">
                  追加オプション
                </h2>
              </div>

              <div className="h-[60px]" />

              {trial9Data.options.map((option, index) => {
                const selected = options.includes(option.id);

                return (
                  <div key={option.id}>
                    <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value={option.id}
                        checked={selected}
                        onChange={() => {
                          toggleOption(option.id);

                          trackAction({
                            ...createLogBase(),
                            phase: "main",
                            page: "checkout",
                            type: "option_toggle",
                            meta: { implTrialId: "trial9" },
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

                    {index < trial9Data.options.length - 1 && (
                      <div className="h-[60px]" />
                    )}
                  </div>
                );
              })}

              <div className="h-[15px]" />
            </article>
          </div>

          {/* 右側：810pxのご注文商品領域 */}
          <div className="flex h-[810px] w-[416px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
            <div className="h-[15px]" />

            <div className="flex h-[60px] items-center">
              <h2 className="text-[20px] font-bold text-gray-900">
                ご注文商品
              </h2>
            </div>

            <div className="flex h-[120px] w-full items-center justify-center rounded-lg bg-gray-50">
              <img
                src={selectedProduct.imageSrc}
                alt=""
                className="max-h-[80px] max-w-[110px] object-contain"
              />
            </div>

            <div className="h-[60px]" />

            <div className="h-[44px] overflow-hidden text-[18px] font-bold leading-6 text-gray-900">
              {selectedProduct.name}
            </div>

            <div className="h-[60px]" />

            <div className="h-[96px] overflow-hidden rounded-md border border-gray-200 p-3 text-[15px] font-semibold leading-6 text-gray-600">
              {selectedProduct.description}
            </div>

            <div className="h-[180px]" />

            <button
              type="submit"
              className="h-[50px] w-full cursor-pointer rounded-md bg-black px-4 text-[18px] font-bold text-white"
            >
              次へ進む
            </button>

            <div className="h-[60px]" />

            <button
              type="button"
              onClick={async () => {
                await trackAction({
                  ...createLogBase(),
                  phase: "main",
                  page: "checkout",
                  type: "checkout_back",
                  meta: { implTrialId: "trial9" },
                  payload: {
                    productId: selectedProduct.id,
                  },
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
