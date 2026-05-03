import Link from "next/link";

export default function ExperimentSurveyPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-8 py-10 text-slate-900">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
            Finish
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            実験課題は終了しました
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            ここからアンケート、または実験者の案内に従って終了処理へ進んでください。
          </p>
          <div className="mt-9">
            <Link
              href="/experiment/setup"
              className="inline-flex rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              setupへ戻る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
