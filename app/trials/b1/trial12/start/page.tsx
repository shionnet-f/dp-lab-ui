import Link from "next/link";

export default function TrialStartPageB1Trial12() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-bold text-gray-900">試行開始</h1>
          <p className="text-sm text-gray-600">
            次のページで商品を選び、購入手続きを行ってください。
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-900">
          <div className="mb-2 font-semibold">購入条件</div>
          <ul className="list-disc space-y-1 pl-5">
            <li>天然水であること</li>
            <li>500ml × 24本であること</li>
            <li>軟水であること</li>
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-700">
          商品詳細は「詳細を見る」から確認できます。条件に合う商品を選んでください。
        </div>

        <div className="text-center">
          <Link
            href="/trials/b1/trial12/product"
            className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white"
          >
            試行を開始する
          </Link>
        </div>
      </div>
    </main>
  );
}
