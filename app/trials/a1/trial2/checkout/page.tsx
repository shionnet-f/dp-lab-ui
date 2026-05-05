"use client";
import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getProductById, trial2Data } from "../data";
import { trackAction } from "@/app/actions/track";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Props = {
  searchParams: Promise<{
    productId?: string;
    shipping?: string;
    options?: string | string[];
    set?: string;
  }>;
};

function normalizeOptions(options?: string | string[]) {
  if (!options) return [];
  return Array.isArray(options) ? options : [options];
}

export default function CheckoutPageA1Trial2({ searchParams }: Props) {
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

    trackAction({
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
        {/* 60pxの空間 */}
        <div className="h-[60px]" />

        {/* 45pxの条件領域 */}
        <div className="flex h-[45px] w-[1160px] items-center border border-blue-200 bg-blue-50 px-[24px] text-[16px] text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{trial2Data.purchaseConditions.budgetYen}円以内、
          {trial2Data.purchaseConditions.quantityCondition}、
          {trial2Data.purchaseConditions.specificCondition}
        </div>

        {/* 60pxの見出し領域 */}
        <header className="flex h-[60px] w-[1160px] items-center">
          <h1 className="text-[24px] font-bold text-gray-900">
            ご注文内容の確認
          </h1>
        </header>

        {/* 810pxのメイン領域 */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await trackAction({
              page: "checkout",
              type: "checkout_submit",
              payload: {
                productId: selectedProduct.id,
                shippingId: shipping,
                optionIds: options,
              },
            });

            const params = new URLSearchParams();
            params.set("productId", selectedProduct.id);
            params.set("set", set);
            params.set("shipping", shipping ?? "");

            options.forEach((o) => {
              params.append("options", o);
            });

            router.push(`/trials/a1/trial2/confirm?${params.toString()}`);
          }}
          className="flex h-[810px] w-[1160px] gap-[60px]"
        >
          <input type="hidden" name="productId" value={selectedProduct.id} />
          <input type="hidden" name="set" value={set} />
          <input type="hidden" name="shipping" value={shipping ?? ""} />
          {options.map((o) => (
            <input key={o} type="hidden" name="options" value={o} />
          ))}

          {/* 左側 */}
          <div className="h-[810px] w-[720px]">
            {/* 配送方法領域：438px */}
            <article className="h-[438px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <div className="flex h-[30px] items-center px-5">
                <h2 className="text-base font-semibold text-gray-900">配送方法</h2>
              </div>

              <div className="h-[60px]" />

              <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                <input
                  type="radio"
                  name="shippingRadio"
                  checked={shipping === trial2Data.shippingMethods[0].id}
                  onChange={() => {
                    const id = trial2Data.shippingMethods[0].id;
                    setShipping(id)

                    trackAction({
                      page: "checkout",
                      type: "shipping_select",
                      payload: {
                        shippingId: id,
                        price: trial2Data.shippingMethods[0].priceYen,
                      },
                    });
                  }}
                />
                <div className="leading-tight">
                  <div className="font-medium text-gray-900">
                    {trial2Data.shippingMethods[0].name}
                  </div>
                  <div className="text-gray-600">
                    {trial2Data.shippingMethods[0].shortDescription}
                  </div>
                  <div className="text-gray-700">
                    ¥{yen(trial2Data.shippingMethods[0].priceYen)}
                  </div>
                </div>
              </label>

              <div className="h-[60px]" />

              <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                <input
                  type="radio"
                  name="shippingRadio"
                  checked={shipping === trial2Data.shippingMethods[1].id}
                  onChange={() => {
                    const id = trial2Data.shippingMethods[1].id;
                    setShipping(id)

                    trackAction({
                      page: "checkout",
                      type: "shipping_select",
                      payload: {
                        shippingId: id,
                        price: trial2Data.shippingMethods[1].priceYen,
                      },
                    });
                  }}
                />
                <div className="leading-tight">
                  <div className="font-medium text-gray-900">
                    {trial2Data.shippingMethods[1].name}
                  </div>
                  <div className="text-gray-600">
                    {trial2Data.shippingMethods[1].shortDescription}
                  </div>
                  <div className="text-gray-700">
                    ¥{yen(trial2Data.shippingMethods[1].priceYen)}
                  </div>
                </div>
              </label>

              <div className="h-[60px]" />

              <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                <input
                  type="radio"
                  name="shippingRadio"
                  checked={shipping === trial2Data.shippingMethods[2].id}
                  onChange={() => {
                    const id = trial2Data.shippingMethods[2].id;
                    setShipping(id)

                    trackAction({
                      page: "checkout",
                      type: "shipping_select",
                      payload: {
                        shippingId: id,
                        price: trial2Data.shippingMethods[2].priceYen,
                      },
                    });
                  }}
                />
                <div className="leading-tight">
                  <div className="font-medium text-gray-900">
                    {trial2Data.shippingMethods[2].name}
                  </div>
                  <div className="text-gray-600">
                    {trial2Data.shippingMethods[2].shortDescription}
                  </div>
                  <div className="text-gray-700">
                    ¥{yen(trial2Data.shippingMethods[2].priceYen)}
                  </div>
                </div>
              </label>

              <div className="h-[15px]" />
            </article>

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* オプション領域：312px */}
            <article className="h-[312px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <div className="flex h-[30px] items-center px-5">
                <h2 className="text-base font-semibold text-gray-900">
                  追加オプション
                </h2>
              </div>

              <div className="h-[60px]" />

              <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={options.includes(trial2Data.options[0].id)}
                  onChange={() => {
                    const option = trial2Data.options[0];
                    const selected = !options.includes(option.id);

                    toggleOption(option.id);

                    trackAction({
                      page: "checkout",
                      type: "option_toggle",
                      payload: {
                        optionId: option.id,
                        selected,
                        priceYen: option.priceYen,
                      },
                    });
                  }}
                />
                <div className="leading-tight">
                  <div className="font-medium text-gray-900">
                    {trial2Data.options[0].name}
                  </div>
                  <div className="text-gray-600">
                    {trial2Data.options[0].shortDescription}
                  </div>
                  <div className="text-gray-700">
                    +¥{yen(trial2Data.options[0].priceYen)}
                  </div>
                </div>
              </label>

              <div className="h-[60px]" />

              <label className="mx-5 flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={options.includes(trial2Data.options[1].id)}
                  onChange={() => {
                    const option = trial2Data.options[1];
                    const selected = !options.includes(option.id);

                    toggleOption(option.id);

                    trackAction({
                      page: "checkout",
                      type: "option_toggle",
                      payload: {
                        optionId: option.id,
                        selected,
                        priceYen: option.priceYen,
                      },
                    });
                  }}
                />
                <div className="leading-tight">
                  <div className="font-medium text-gray-900">
                    {trial2Data.options[1].name}
                  </div>
                  <div className="text-gray-600">
                    {trial2Data.options[1].shortDescription}
                  </div>
                  <div className="text-gray-700">
                    +¥{yen(trial2Data.options[1].priceYen)}
                  </div>
                </div>
              </label>

              <div className="h-[15px]" />
            </article>
          </div>

          {/* 右側：810pxのご注文商品領域 */}
          <div className="flex h-[810px] w-[416px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
            {/* 15pxの空間 */}
            <div className="h-[15px]" />

            {/* 30pxの見出し領域 */}
            <div className="flex h-[60px] items-center">
              <h2 className="text-base font-semibold text-gray-900">ご注文商品</h2>
            </div>

            {/* 画像 */}
            <div className="flex h-[120px] w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
              画像エリア
            </div>

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* 商品名 */}
            <div className="h-[44px] overflow-hidden text-base font-semibold leading-6 text-gray-900">
              {selectedProduct.name}
            </div>

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* 商品説明 */}
            <div className="h-[96px] overflow-hidden rounded-md border border-gray-200 p-3 text-sm leading-6 text-gray-600">
              {selectedProduct.description}
            </div>

            {/* 60pxの空間 */}
            <div className="h-[60px]" />

            {/* ボタン領域 */}
            <div className="mt-auto">
              {/* 60px 空間 */}
              <div className="h-[60px]" />

              {/* ボタン1 */}
              <div className="mt-auto">
                {/* ボタン上の余白 */}
                <div className="h-[60px]" />

                {/* ボタン1 */}
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-md bg-black px-4 py-3 text-sm font-medium text-white"
                >
                  次へ進む
                </button>

                {/* ボタン間 */}
                <div className="h-[60px]" />

                {/* ボタン2 */}

                <button
                  type="button"
                  onClick={async () => {
                    await trackAction({
                      page: "checkout",
                      type: "checkout_back",
                    });

                    router.push(`/trials/a1/trial2/product?set=${set}`);
                  }}
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  商品一覧へ戻る
                </button>

                <div className="h-[15px]" />
              </div>
            </div>
          </div>
        </form>

        {/* 105pxの空間 */}
        <div className="h-[105px]" />
      </div>
    </main>
  );
}
