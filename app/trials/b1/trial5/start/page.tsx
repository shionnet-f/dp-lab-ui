import Link from "next/link";
import { trial5Data } from "../data";

export default function StartPageB1Trial5() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-sm font-medium text-gray-500">Trial 5</div>

        <h1 className="mb-4 text-2xl font-bold text-gray-900">購入課題</h1>

        <p className="mb-6 leading-7 text-gray-700">
          以下の購入条件を確認し、条件を満たす商品を選んで購入してください。
        </p>

        <section className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="mb-3 text-base font-semibold text-blue-900">購入条件</h2>
          <div className="space-y-2 text-sm text-blue-900">
            <div>予算：{trial5Data.purchaseConditions.budgetYen}円以内</div>
            <div>{trial5Data.purchaseConditions.quantityCondition}</div>
            <div>{trial5Data.purchaseConditions.specificCondition}</div>
          </div>
        </section>

        <Link
          href="/trials/b1/trial5/product"
          className="inline-flex w-full items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
        >
          商品一覧へ進む
        </Link>
      </div>
    </main>
  );
}
