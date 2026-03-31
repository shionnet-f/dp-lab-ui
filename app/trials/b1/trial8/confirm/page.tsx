import Link from "next/link";
import { products6 } from "@/config/products";

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

function getShippingInfo(shipping?: string) {
  switch (shipping) {
    case "express":
      return { label: "お急ぎ便", priceYen: 800 };
    case "scheduled":
      return { label: "当日便", priceYen: 700 };
    case "standard":
      return { label: "通常配送", priceYen: 500 };
    default:
      return { label: "未選択", priceYen: 0 };
  }
}

function getOptionInfo(option: string) {
  switch (option) {
    case "insurance":
      return { label: "配送補償オプション", priceYen: 300 };
    case "gift":
      return { label: "ギフト包装", priceYen: 200 };
    default:
      return { label: option, priceYen: 0 };
  }
}

export default async function ConfirmPageB1Trial8({ searchParams }: Props) {
  const sp = await searchParams;
  const productId = sp?.productId;
  const shipping = sp?.shipping;
  const optionKeys = normalizeOptions(sp?.options);

  const selectedProduct =
    products6.find((product) => product.id === productId) ?? products6[0];

  const shippingInfo = getShippingInfo(shipping);
  const selectedOptions = optionKeys.map(getOptionInfo);
  const optionTotal = selectedOptions.reduce(
    (sum, option) => sum + option.priceYen,
    0,
  );
  const total = selectedProduct.priceYen + shippingInfo.priceYen + optionTotal;

  const backParams = new URLSearchParams();
  backParams.set("productId", selectedProduct.id);
  if (shipping) backParams.set("shipping", shipping);
  optionKeys.forEach((option) => backParams.append("options", option));

  const completeParams = new URLSearchParams();
  completeParams.set("productId", selectedProduct.id);
  if (shipping) completeParams.set("shipping", shipping);
  optionKeys.forEach((option) => completeParams.append("options", option));

  return (
    <main className="h-screen overflow-hidden bg-gray-50 px-8 py-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          「天然水 500ml」を1つ選んで購入してください
        </div>

        <header className="mb-6 shrink-0">
          <h1 className="text-xl font-bold text-gray-900">最終確認</h1>
        </header>

        <div className="grid flex-1 grid-rows-[520px_120px] gap-6">
          <section className="grid h-full grid-cols-[1.5fr_1fr] gap-6">
            <div className="grid h-full grid-rows-[180px_110px_1fr] gap-6">
              <article className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-gray-900">
                  ご注文商品
                </h2>

                <div className="flex h-[calc(100%-2rem)] gap-4">
                  <div className="flex h-full w-28 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                    画像エリア
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="h-[60px] overflow-hidden text-sm font-medium leading-5 text-gray-900">
                      水 500ml
                    </div>
                    <div className="mt-3 text-base font-semibold text-gray-900">
                      ¥{yen(selectedProduct.priceYen)}
                    </div>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-gray-900">
                  配送方法
                </h2>

                <div className="text-sm text-gray-700">
                  {shippingInfo.label}
                  {shippingInfo.priceYen > 0
                    ? ` / ¥${yen(shippingInfo.priceYen)}`
                    : ""}
                </div>
              </article>

              <article className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-gray-900">
                  選択したオプション
                </h2>

                <div className="space-y-3 text-sm text-gray-700">
                  {selectedOptions.length > 0 ? (
                    selectedOptions.slice(0, 2).map((option) => (
                      <div
                        key={option.label}
                        className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3"
                      >
                        <span className="truncate pr-4">{option.label}</span>
                        <span className="shrink-0">
                          +¥{yen(option.priceYen)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-md border border-gray-200 px-4 py-3 text-gray-500">
                      選択されたオプションはありません
                    </div>
                  )}
                </div>
              </article>
            </div>

            <div className="grid h-full grid-rows-[1fr_auto] overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div>
                <h2 className="mb-4 text-base font-semibold text-gray-900">
                  お支払い金額
                </h2>

                <div className="rounded-md border border-gray-200 p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">商品価格</span>
                      <span className="text-gray-900">
                        ¥{yen(selectedProduct.priceYen)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">送料</span>
                      <span className="text-gray-900">
                        ¥{yen(shippingInfo.priceYen)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">オプション料金</span>
                      <span className="text-gray-900">¥{yen(optionTotal)}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                      <span className="font-semibold text-gray-900">合計</span>
                      <span className="text-3xl font-bold text-gray-900">
                        ¥{yen(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 pt-6">
                <Link
                  href={`/trials/b1/trial8/complete?${completeParams.toString()}`}
                  className="block w-full rounded-md bg-black px-4 py-3 text-center text-sm font-medium text-white"
                >
                  購入を確定する
                </Link>

                <Link
                  href={`/trials/b1/trial8/checkout?${backParams.toString()}`}
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 text-center text-sm text-gray-700"
                >
                  戻る
                </Link>
              </div>
            </div>
          </section>

          <article className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              注意事項
            </h2>

            <div className="rounded-md bg-gray-50 px-4 py-3 text-sm text-gray-600">
              購入確定後は、注文内容の変更やキャンセルができない場合があります。配送方法・追加オプション・金額を確認したうえで、購入を確定してください。
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
