import Link from "next/link";

export default function PracticePage() {
    return (
        <main className="min-h-screen bg-white px-6 py-10">
            <div className="mx-auto flex max-w-3xl flex-col gap-8">
                <header className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900">練習課題</h1>
                    <p className="text-base leading-7 text-gray-600">
                        練習課題を開始します。準備ができたら進んでください。
                    </p>
                </header>

                <section className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <div className="space-y-4">
                        <p className="text-sm leading-6 text-gray-700">
                            操作に慣れるための練習課題です。
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/trials/a1/trial1-1/start"
                                className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                練習を始める
                            </Link>

                            <Link
                                href="/"
                                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                戻る
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}