"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loadExperimentPlan } from "../_lib/storage";
import type { ExperimentPlan, RestNext } from "../_lib/types";

const REST_SECONDS = 180;

function isRestNext(value: string | null): value is RestNext {
  return value === "education" || value === "set2" || value === "set3";
}

function getRestContent(next: RestNext, plan: ExperimentPlan) {
  if (next === "education") {
    return {
      title: "休憩時間です",
      description: "実験課題1が終了しました。休憩後、教育フェーズの開始画面へ進みます。",
      nextPath: "/experiment/gate?step=education",
      button: "教育フェーズへ進む",
      badge: `次：教育バージョン${plan.educationVersion}`,
    };
  }

  if (next === "set2") {
    return {
      title: "休憩時間です",
      description: "教育フェーズが終了しました。休憩後、実験課題2の開始画面へ進みます。",
      nextPath: "/experiment/gate?step=set2",
      button: "実験課題2へ進む",
      badge: `次：${plan.sets["2"].label} / ${plan.sets["2"].phase}`,
    };
  }

  return {
    title: "休憩時間です",
    description: "実験課題2が終了しました。休憩後、実験課題3の開始画面へ進みます。",
    nextPath: "/experiment/gate?step=set3",
    button: "実験課題3へ進む",
    badge: `次：${plan.sets["3"].label} / ${plan.sets["3"].phase}`,
  };
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;
  return `${minutes}:${restSeconds.toString().padStart(2, "0")}`;
}

export default function ExperimentRestPage() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<ExperimentPlan | null | undefined>(undefined);
  const [remainingSeconds, setRemainingSeconds] = useState(REST_SECONDS);

  const nextParam = searchParams.get("next");
  const next = isRestNext(nextParam) ? nextParam : null;

  useEffect(() => {
    setPlan(loadExperimentPlan());
  }, []);

  useEffect(() => {
    if (remainingSeconds <= 0) return;
    const timer = window.setTimeout(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [remainingSeconds]);

  const content = useMemo(() => {
    if (!plan || !next) return null;
    return getRestContent(next, plan);
  }, [next, plan]);

  if (plan === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-8 text-slate-900">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-7 shadow-sm">
          <p className="text-base font-semibold text-slate-700">読み込み中です...</p>
        </div>
      </main>
    );
  }

  if (plan === null || !next || !content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-8 text-slate-900">
        <section className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold tracking-wide text-red-500">Rest Error</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">休憩ページを開始できません</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            URLの next が不正です。setupからやり直してください。
          </p>
          <Link href="/experiment/setup" className="mt-7 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white">
            setupへ戻る
          </Link>
        </section>
      </main>
    );
  }

  const canContinue = remainingSeconds <= 0;

  return (
    <main className="min-h-screen bg-slate-100 px-8 py-10 text-slate-900">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
            Rest
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            {content.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {content.description}
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-3xl border border-slate-200 bg-slate-50 p-7">
            <p className="text-sm font-bold tracking-wide text-slate-500">残り時間</p>
            <div className="mt-2 text-6xl font-bold tabular-nums text-slate-950">
              {formatTime(remainingSeconds)}
            </div>
            <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700">
              {content.badge}
            </p>
          </div>

          <div className="mt-9 flex justify-center">
            {canContinue ? (
              <Link
                href={content.nextPath}
                className="rounded-2xl bg-slate-950 px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-slate-800"
              >
                {content.button}
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="rounded-2xl bg-slate-300 px-8 py-4 text-base font-bold text-white"
              >
                休憩中
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
