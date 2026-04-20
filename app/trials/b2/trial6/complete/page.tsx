import Link from "next/link";

export default function CompletePageB2Trial6() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">購入完了</h1>

        <p className="text-sm text-gray-600">注文が完了しました。次の試行へ進んでください。</p>

        <Link
          href="/trials/b2/trial7/start"
          className="inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white"
        >
          次へ進む
        </Link>
      </div>
    </main>
  );
}
