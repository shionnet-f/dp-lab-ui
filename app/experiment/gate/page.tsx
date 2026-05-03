"use client";

import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadExperimentPlan } from "../_lib/storage";
import type { ExperimentPlan, GateStep, SetIndex } from "../_lib/types";

function isGateStep(value: string | null): value is GateStep {
  return value === "set1" || value === "education" || value === "set2" || value === "set3";
}

function getSetIndexFromStep(step: GateStep): SetIndex | null {
  if (step === "set1") return "1";
  if (step === "set2") return "2";
  if (step === "set3") return "3";
  return null;
}

function getGateText(step: GateStep, plan: ExperimentPlan) {
  if (step === "education") {
    return {
      eyebrow: "Education",
      title: "教育フェーズを開始します",
      description: `教育バージョン${plan.educationVersion}を表示します。準備ができたら開始してください。`,
      nextPath: `/education?version=${plan.educationVersion}&next=${encodeURIComponent("/experiment/rest?next=set2")}`,
      button: "教育を開始する",
      badge: `Version ${plan.educationVersion}`,
    };
  }

  const setIndex = getSetIndexFromStep(step)!;
  const currentSet = plan.sets[setIndex];
  return {
    eyebrow: `Set ${setIndex}`,
    title: `実験課題${setIndex}を開始します`,
    description: `このセットは ${currentSet.label}（${currentSet.phase}）です。開始後、30秒の固視点を表示してから試行に進みます。`,
    nextPath: `/experiment/fixation?set=${setIndex}&position=before`,
    button: `実験課題${setIndex}を開始する`,
    badge: `${currentSet.label} / ${currentSet.phase}`,
  };
}

export default function ExperimentGatePage() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<ExperimentPlan | null | undefined>(undefined);

  const stepParam = searchParams.get("step");
  const step = isGateStep(stepParam) ? stepParam : null;

  useEffect(() => {
    setPlan(loadExperimentPlan());
  }, []);

  const content = useMemo(() => {
    if (!plan || !step) return null;
    return getGateText(step, plan);
  }, [plan, step]);

  if (plan === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-8 text-slate-900">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-7 shadow-sm">
          <p className="text-base font-semibold text-slate-700">読み込み中です...</p>
        </div>
      </main>
    );
  }

  if (plan === null || !step || !content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-8 text-slate-900">
        <section className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold tracking-wide text-red-500">Flow Error</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">実験計画表が見つかりません</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            setupページで被験者IDとセット順を入力してから、もう一度開始してください。
          </p>
          <Link
            href="/experiment/setup"
            className="mt-7 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            setupへ戻る
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-8 py-10 text-slate-900">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
            {content.eyebrow}
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            {content.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {content.description}
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
              <span className="text-sm font-semibold text-slate-500">被験者ID</span>
              <span className="font-bold text-slate-950">{plan.participantId}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
              <span className="text-sm font-semibold text-slate-500">現在の内容</span>
              <span className="font-bold text-slate-950">{content.badge}</span>
            </div>
          </div>

          <div className="mt-9 flex justify-center">
            <Link
              href={content.nextPath}
              className="rounded-2xl bg-slate-950 px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-slate-800"
            >
              {content.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
