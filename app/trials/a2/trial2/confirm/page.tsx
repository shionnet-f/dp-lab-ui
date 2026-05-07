"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackAction } from "@/app/actions/track";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getTrialPath } from "@/app/trials/_lib/path";
import {
  getOptionsByIds,
  getProductById,
  getShippingById,
  trial2Data,
} from "../data";

const completePath = getTrialPath("a2", "trial2", "complete");
const checkoutPath = getTrialPath("a2", "trial2", "checkout");

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

export default function ConfirmPageA2Trial2({ searchParams }: Props) {
  const sp = use(searchParams);
  const router = useRouter();
  const didTrack = useRef(false);
  const [error, setError] = useState(false);

  const productId = sp?.productId;
  const shippingId = sp?.shipping;
  const optionIds = normalizeOptions(sp?.options);
  const set = sp?.set;

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    void trackAction({
      page: "confirm",
      type: "page_view",
      meta: {},
      payload: {},
    });
  }, []);

  if (!set) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set がありません。
        </div>
      </main>
    );
  }

  const selectedProduct = getProductById(productId);
  const shippingInfo = getShippingById(shippingId);
  const selectedOptions = getOptionsByIds(optionIds);

  const productPriceYen = selectedProduct.priceYen;
  const shippingPriceYen = shippingInfo?.priceYen ?? 0;
  const optionTotalYen = selectedOptions.reduce(
    (sum, option) => sum + option.priceYen,
    0,
  );
  const totalYen = productPriceYen + shippingPriceYen + optionTotalYen;

  const backParams = new URLSearchParams();
  backParams.set("productId", selectedProduct.id);
  backParams.set("set", set);
  backParams.set("shipping", shippingId ?? "");
  optionIds.forEach((id) => backParams.append("options", id));

  const completeParams = new URLSearchParams();
  completeParams.set("productId", selectedProduct.id);
  completeParams.set("set", set);
  completeParams.set("shipping", shippingId ?? "");
  optionIds.forEach((id) => completeParams.append("options", id));

  async function handleConfirmSubmit() {
    if (!shippingInfo) {
      setError(true);
      window.setTimeout(() => {
        setError(false);
      }, 2500);
      return;
    }

    await trackAction({
      page: "confirm",
      type: "confirm_submit",
      payload: {
        productId: selectedProduct.id,
        shippingId,
        optionIds,
        productPriceYen,
        shippingPriceYen,
        optionTotalYen,
        totalYen,
      },
    });

    router.push(`${completePath}?${completeParams.toString()}`);
  }

  async function handleBack() {
    await trackAction({
      page: "confirm",
      type: "confirm_back",
      payload: {
        productId: selectedProduct.id,
        shippingId,
        optionIds,
        productPriceYen,
        shippingPriceYen,
        optionTotalYen,
        totalYen,
      },
    });

    router.push(`${checkoutPath}?${backParams.toString()}`);
  }

  return (
    <main className="h-[1080px] overflow-hidden bg-gray-50">
      <div className="mx-auto h-[1080px] w-[1160px] bg-gray-50">
        <TrialPageHeader
          purchaseConditions={trial2Data.purchaseConditions}
          title="最終確認"
        />

        {error && (
          <div className="fixed left-1/2 top-6 z-50 w-[420px] -translate-x-1/2 rounded-lg border border-red-300 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-lg">
            配送方法を選択してください
          </div>
        )}

        {/* 810px メイン領域 */}
        <div className="h-[810px] w-[1160px] overflow-hidden">
          {/* 160px：ご注文商品（OrderItemPanelを横に伸ばした版） */}
          <section className="h-[160px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="grid h-full grid-cols-[200px_1fr_180px] px-5">
              {/* 左：画像 */}
              <div className="flex h-full items-center justify-center">
                <div className="flex h-[120px] w-[160px] items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                  画像エリア
                </div>
              </div>

              {/* 中央：商品名・説明 */}
              <div className="h-full min-w-0 pl-[20px] pr-[20px]">
                <div className="h-[15px]" />

                <div className="flex h-[30px] items-center">
                  <h2 className="text-base font-semibold text-gray-900">
                    ご注文商品
                  </h2>
                </div>

                <div className="h-[10px]" />

                <div className="h-[36px] overflow-hidden text-[16px] font-medium leading-[18px] text-gray-900">
                  {selectedProduct.name}
                </div>

                <div className="h-[10px]" />

                <div className="h-[34px] overflow-hidden text-[14px] leading-[17px] text-gray-600">
                  {selectedProduct.description}
                </div>

                <div className="h-[15px]" />
              </div>

              {/* 右：価格 */}
              <div className="flex h-full items-center justify-center">
                <div className="text-[24px] font-semibold text-gray-900">
                  ¥{yen(selectedProduct.priceYen)}
                </div>
              </div>
            </div>
          </section>

          {/* 60px 空間 */}
          <div className="h-[60px]" />

          {/* 145px：配送方法・オプション */}
          <section className="grid h-[145px] w-[1160px] grid-cols-[550px_550px] gap-[60px] overflow-hidden">
            {/* 配送方法 */}
            <section className="h-[145px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <h2 className="flex h-[30px] items-center px-5 text-base font-semibold text-gray-900">
                配送方法
              </h2>

              <div className="h-[15px]" />

              <div className="h-[70px] px-5">
                {shippingInfo ? (
                  <div className="flex h-full items-center justify-between rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                    <span className="truncate pr-4">{shippingInfo.name}</span>
                    <span className="shrink-0">¥{yen(shippingInfo.priceYen)}</span>
                  </div>
                ) : (
                  <div className="flex h-full items-center rounded-md border border-gray-200 px-4 text-sm text-gray-500">
                    未選択
                  </div>
                )}
              </div>

              <div className="h-[15px]" />
            </section>

            {/* 選択したオプション */}
            <section className="h-[145px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="h-[15px]" />

              <h2 className="flex h-[30px] items-center px-5 text-base font-semibold text-gray-900">
                選択したオプション
              </h2>

              <div className="h-[15px]" />

              <div className="h-[70px] px-5">
                {selectedOptions.length > 0 ? (
                  <div className="flex h-full items-center justify-between rounded-md border border-gray-200 px-4 text-sm text-gray-700">
                    <span className="truncate pr-4">
                      {selectedOptions.map((option) => option.name).join("、")}
                    </span>

                    <span className="shrink-0">+¥{yen(optionTotalYen)}</span>
                  </div>
                ) : (
                  <div className="flex h-full items-center rounded-md border border-gray-200 px-4 text-sm text-gray-500">
                    選択されたオプションはありません
                  </div>
                )}
              </div>

              <div className="h-[15px]" />
            </section>
          </section>

          {/* 30px 空間 */}
          <div className="h-[60px]" />

          {/* 190px：お支払い金額 */}
          <article className="h-[250px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="h-[15px]" />

            <div className="flex h-[30px] items-center px-5">
              <h2 className="text-base font-semibold text-gray-900">
                お支払い金額
              </h2>
            </div>

            <div className="h-[15px]" />

            <div className="px-5">
              <div className="rounded-md border border-gray-200 p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">商品価格</span>
                    <span className="text-gray-900">¥{yen(productPriceYen)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">送料</span>
                    <span className="text-gray-900">¥{yen(shippingPriceYen)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">オプション料金</span>
                    <span className="text-gray-900">¥{yen(optionTotalYen)}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                    <span className="font-semibold text-gray-900">合計</span>
                    <span className="text-3xl font-bold text-gray-900">
                      ¥{yen(totalYen)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[15px]" />
          </article>

          {/* 35px 空間 */}
          <div className="h-[60px]" />

          {/* 60px：ボタン */}
          <div className="flex h-[60px] w-[1160px] items-center gap-[60px]">
            <button
              type="button"
              onClick={handleBack}
              className="flex h-[50px] w-[550px] items-center justify-center border border-gray-300 bg-white text-[16px] font-semibold text-gray-700"
            >
              戻る
            </button>

            <button
              type="button"
              onClick={handleConfirmSubmit}
              className="flex h-[50px] w-[550px] items-center justify-center bg-black text-[16px] font-semibold text-white"
            >
              購入を確定する
            </button>
          </div>
        </div>

        {/* 105px 下余白 */}
        <div className="h-[105px]" />
      </div>
    </main >
  );
}