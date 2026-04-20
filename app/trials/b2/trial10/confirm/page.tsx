import Link from "next/link";
import { getOptionsByIds, getProductById, getShippingById, trial10Data } from "../data";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Props = {
  searchParams?: Promise<{
    productId?: string;
    shipping?: string;
    options?: string | string[];
  }>;
};

function normalizeOptions(options?: string | string[]) {
  if (!options) return [];
  return Array.isArray(options) ? options : [options];
}

export default async function ConfirmPageB2Trial10({ searchParams }: Props) {
  const sp = await searchParams;
  const selectedProduct = getProductById(sp?.productId);
  const shippingInfo = getShippingById(sp?.shipping);
  const optionKeys = normalizeOptions(sp?.options);
  const selectedOptions = getOptionsByIds(optionKeys);

  const shippingPrice = shippingInfo?.priceYen ?? 0;
  const optionTotal = selectedOptions.reduce((sum, option) => sum + option.priceYen, 0);
  const total = selectedProduct.priceYen + shippingPrice + optionTotal;

  const backParams = new URLSearchParams();
  backParams.set("productId", selectedProduct.id);
  if (sp?.shipping) backParams.set("shipping", sp.shipping);
  optionKeys.forEach((option) => backParams.append("options", option));

  const completeParams = new URLSearchParams();
  completeParams.set("productId", selectedProduct.id);
  if (sp?.shipping) completeParams.set("shipping", sp.shipping);
  optionKeys.forEach((option) => completeParams.append("options", option));

  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{trial10Data.purchaseConditions.budgetYen}円以内、
          {trial10Data.purchaseConditions.quantityCondition}、
          {trial10Data.purchaseConditions.specificCondition}
        </div>

        <header className="mb-5 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">最終確認</h1>
        </header>

        <div className="grid flex-1 grid-rows-[152px_228px_176px_120px_88px] gap-6">
          <section className="rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
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

          <section className="grid h-full grid-cols-2 gap-5">
            <article className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-sm font-medium text-gray-500">配送方法</h2>

              <div className="rounded-md border border-gray-100 bg-gray-50 px-4 py-3">
                <div className="text-sm font-medium text-gray-700">{shippingInfo?.name ?? "未選択"}</div>
                <div className="mt-1 text-sm text-gray-500">
                  {shippingInfo ? `¥${yen(shippingInfo.priceYen)}` : "選択されていません"}
                </div>
              </div>
            </article>

            <article className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-sm font-medium text-gray-500">追加オプション</h2>

              <div className="space-y-2">
                {selectedOptions.length > 0 ? (
                  selectedOptions.map((option) => (
                    <div key={option.id} className="rounded-md border border-gray-100 bg-gray-50 px-4 py-3">
                      <div className="text-sm font-medium text-gray-700">{option.name}</div>
                      <div className="mt-1 text-sm text-gray-500">+¥{yen(option.priceYen)}</div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-md border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500">
                    選択されたオプションはありません
                  </div>
                )}
              </div>
            </article>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-2 text-sm text-gray-900">
                <div className="flex items-center justify-between">
                  <span>商品価格</span>
                  <span>¥{yen(selectedProduct.priceYen)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>送料</span>
                  <span>¥{yen(shippingPrice)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>オプション料金</span>
                  <span>¥{yen(optionTotal)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-sm">
                <span className="font-semibold text-gray-900">最終金額</span>
                <span className="text-2xl font-bold text-black">¥{yen(total)}</span>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
            <div className="flex h-full flex-col gap-3">
              <Link
                href={`/trials/b2/trial10/complete?${completeParams.toString()}`}
                className="flex h-12 w-full items-center justify-center rounded-md bg-black px-5 text-sm font-medium text-white"
              >
                購入を確定する
              </Link>

              <Link
                href={`/trials/b2/trial10/checkout?${backParams.toString()}`}
                className="flex h-12 w-full items-center justify-center rounded-md border border-gray-300 bg-white px-5 text-sm font-medium text-gray-700"
              >
                戻る
              </Link>
            </div>
          </section>

          <section className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-4">
            <h2 className="mb-2 text-sm font-medium text-gray-400">注意事項</h2>

            <div className="space-y-1 text-sm leading-5 text-gray-500">
              <p>購入確定後は、注文内容の変更やキャンセルができない場合があります。</p>
              <p>配送方法・追加オプション・最終金額を確認したうえで、購入を確定してください。</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
