import Link from "next/link";

export default function CompletePageB1Trial13() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">購入手続き完了です</h1>
        <Link
          href="/education?version=B&next=/trial/b1/start"
          className="block w-full rounded-md bg-black px-4 py-3 text-center text-sm font-medium text-white"
        >
          教育Bを開始
        </Link>
      </div>
    </main>
  );
}
