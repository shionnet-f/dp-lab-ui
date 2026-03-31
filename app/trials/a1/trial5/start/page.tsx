import Link from "next/link";

export default function TrialStartPageA1Trial5() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">試行開始</h1>

        <p className="text-sm text-gray-600">
          次のページで商品を選び、購入手続きを行ってください。
        </p>

        <div className="z-10 mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          「ミネラルウォーター 500ml×24」を1つ選んで購入してください
        </div>

        <Link
          href="/trials/a1/trial5/product"
          className="inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white"
        >
          試行を開始する
        </Link>
      </div>
    </main>
  );
}
