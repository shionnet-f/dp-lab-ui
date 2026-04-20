import Link from "next/link";
import trial1_2Data from "../data";

export default function StartPage() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">試行開始</h1>

        <p className="text-sm text-gray-600">
          次のページで商品を選び、購入手続きを行ってください。
        </p>

        <div className="z-10 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{trial1_2Data.purchaseConditions.budgetYen}円以内、
          {trial1_2Data.purchaseConditions.quantityCondition}、
          {trial1_2Data.purchaseConditions.specificCondition}
        </div>

        <Link
          href="/trials/a2/trial1-2/product"
          className="inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white"
        >
          試行を開始する
        </Link>
      </div>
    </main>
  );
}
