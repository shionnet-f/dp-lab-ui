import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            DP-LAB 実験フロー
          </h1>
          <p className="text-base leading-7 text-gray-600">
            練習課題または実験課題を選択してください。
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Link
            href="/experiment/practice"
            className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm transition hover:bg-gray-50"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">練習課題</h2>
              <p className="text-sm leading-6 text-gray-600">
                練習用の課題を開始します。
              </p>
            </div>
          </Link>

          <Link
            href="/experiment/setup"
            className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm transition hover:bg-gray-50"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">実験課題</h2>
              <p className="text-sm leading-6 text-gray-600">
                被験者IDとセット順を設定して、本番フローへ進みます。
              </p>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
