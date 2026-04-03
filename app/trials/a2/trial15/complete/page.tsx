import Link from "next/link";

export default function CompletePageA2Trial15() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">購入手続き完了です</h1>

        <Link
          href="/trials/a2/trial16/start"
          className="inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white"
        >
          次の試行へ
        </Link>
      </div>
    </main>
  );
}
