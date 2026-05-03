"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createExperimentPlan, formatSetOrder } from "../_lib/plan";
import { saveExperimentPlan } from "../_lib/storage";
import type { SetOrder } from "../_lib/types";

export default function ExperimentSetupPage() {
  const router = useRouter();
  const [participantId, setParticipantId] = useState("");
  const [setOrder, setSetOrder] = useState<SetOrder>("A_Ap_B");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const trimmedParticipantId = participantId.trim();
  const canStart = trimmedParticipantId.length > 0;

  const previewPlan = useMemo(
    () => createExperimentPlan(trimmedParticipantId || "未入力", setOrder),
    [setOrder, trimmedParticipantId],
  );

  function handleConfirm() {
    if (!canStart) return;
    const plan = createExperimentPlan(trimmedParticipantId, setOrder);
    saveExperimentPlan(plan);
    router.push("/experiment/gate?step=set1");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-8 py-10 text-slate-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="rounded-3xl border border-slate-200 bg-white px-8 py-7 shadow-sm">
          <p className="text-sm font-semibold tracking-wide text-slate-500">
            Experiment Flow Setup
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            実験課題の設定
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            被験者IDとセット順を入力します。ここで作成した実験計画表を保存し、以後のフローではURL上のset番号から現在の課題セットを呼び出します。
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="participantId" className="block text-sm font-semibold text-slate-800">
                  被験者ID
                </label>
                <input
                  id="participantId"
                  type="text"
                  value={participantId}
                  onChange={(event) => setParticipantId(event.target.value)}
                  placeholder="例：s001"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-700 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="setOrder" className="block text-sm font-semibold text-slate-800">
                  セット順
                </label>
                <select
                  id="setOrder"
                  value={setOrder}
                  onChange={(event) => setSetOrder(event.target.value as SetOrder)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-700 focus:ring-4 focus:ring-slate-100"
                >
                  <option value="A_Ap_B">A → A&apos; → B</option>
                  <option value="B_Bp_A">B → B&apos; → A</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(true)}
                  disabled={!canStart}
                  className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  入力内容を確認する
                </button>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-lg font-bold text-slate-950">保存される実験計画表</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="font-semibold text-slate-500">participantId</div>
                <div className="mt-1 text-base font-semibold text-slate-900">
                  {trimmedParticipantId || "未入力"}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="font-semibold text-slate-500">setOrder</div>
                <div className="mt-1 text-base font-semibold text-slate-900">
                  {formatSetOrder(setOrder)}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="font-semibold text-slate-500">educationVersion</div>
                <div className="mt-1 text-base font-semibold text-slate-900">
                  {previewPlan.educationVersion}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="font-semibold text-slate-500">sets</div>
                <div className="mt-3 space-y-2">
                  {(["1", "2", "3"] as const).map((setIndex) => (
                    <div key={setIndex} className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                      <span className="font-semibold text-slate-600">set{setIndex}</span>
                      <span className="font-bold text-slate-950">
                        {previewPlan.sets[setIndex].label} / {previewPlan.sets[setIndex].phase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-950">入力内容の確認</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              以下の内容で実験フローを開始します。
            </p>

            <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex justify-between gap-4">
                <span className="font-semibold text-slate-500">被験者ID</span>
                <span className="font-bold text-slate-900">{trimmedParticipantId}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold text-slate-500">セット順</span>
                <span className="font-bold text-slate-900">{formatSetOrder(setOrder)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold text-slate-500">教育バージョン</span>
                <span className="font-bold text-slate-900">{previewPlan.educationVersion}</span>
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                修正する
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                この内容で開始する
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
