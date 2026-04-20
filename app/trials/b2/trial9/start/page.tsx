import Link from "next/link";
import trial9Data from "../data";

export default function StartPageB2Trial9() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">購入課題</h1>
        <p className="mt-4 text-sm leading-7 text-gray-700">
          以下の購入条件を満たす商品の中から、予算内で商品を選んでください。
        </p>

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm leading-7 text-blue-900">
          <div><span className="font-semibold">予算：</span>{trial9Data.purchaseConditions.budgetYen}円以内</div>
          <div><span className="font-semibold">条件1：</span>{trial9Data.purchaseConditions.quantityCondition}</div>
          <div><span className="font-semibold">条件2：</span>{trial9Data.purchaseConditions.specificCondition}</div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link href="/trials/b2/trial9/product" className="inline-flex h-12 items-center justify-center rounded-md bg-black px-6 text-sm font-medium text-white">
            商品一覧へ進む
          </Link>
        </div>
      </div>
    </main>
  );
}
