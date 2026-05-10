"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";
import { loadExperimentPlan } from "../_lib/storage";
import type { ExperimentPlan, FixationPosition, SetIndex } from "../_lib/types";
import { getTrialPath } from "@/app/trials/_lib/path";
import { trialOrder } from "@/app/trials/_lib/trialOrder";

const DURATION_SECONDS = 30;
const DURATION_MS = DURATION_SECONDS * 1000;

function isSetIndex(value: string | null): value is SetIndex {
  return value === "1" || value === "2" || value === "3";
}

function isFixationPosition(value: string | null): value is FixationPosition {
  return value === "before" || value === "after";
}

function getNextPath(
  plan: ExperimentPlan,
  setIndex: SetIndex,
  position: FixationPosition,
) {
  if (position === "before") {
    const phase = plan.sets[setIndex].phase;
    const firstTrial = trialOrder[phase][0];

    return `${getTrialPath(phase, firstTrial, "start")}?set=${setIndex}&trial=1`;
  }

  if (setIndex === "1") return "/experiment/rest?next=education";
  if (setIndex === "2") return "/experiment/rest?next=set3";
  return "/experiment/survey";
}

function getLabel(position: FixationPosition, setIndex: SetIndex) {
  if (position === "before") return `実験課題${setIndex} 開始前`;
  return `実験課題${setIndex} 終了後`;
}

export default function ExperimentFixationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<ExperimentPlan | null | undefined>(
    undefined,
  );
  const [remainingSeconds, setRemainingSeconds] = useState(DURATION_SECONDS);

  const didLogStart = useRef(false);
  const didLogEnd = useRef(false);

  const setParam = searchParams.get("set");
  const positionParam = searchParams.get("position");

  const setIndex = isSetIndex(setParam) ? setParam : null;
  const position = isFixationPosition(positionParam) ? positionParam : null;

  useEffect(() => {
    setPlan(loadExperimentPlan());
  }, []);

  const nextPath = useMemo(() => {
    if (!plan || !setIndex || !position) return null;
    return getNextPath(plan, setIndex, position);
  }, [plan, position, setIndex]);

  useEffect(() => {
    if (!plan || !setIndex || !position || !nextPath) return;
    if (didLogStart.current) return;
    didLogStart.current = true;

    const logParams = new URLSearchParams();
    logParams.set("set", setIndex);

    const baseLog = getClientLogBase({ searchParams: logParams });
    const taskSetId = plan.sets[setIndex].phase;

    void trackAction({
      ...baseLog,
      phase: "fixation",
      page: "fixation",
      type: "page_view",
      meta: {},
      payload: {
        setIndex,
        taskSetId,
        position,
        label: getLabel(position, setIndex),
        durationMs: DURATION_MS,
        nextPath,
      },
    });

    void trackAction({
      ...baseLog,
      phase: "fixation",
      page: "fixation",
      type: "fixation_start",
      meta: {},
      payload: {
        setIndex,
        taskSetId,
        position,
        label: getLabel(position, setIndex),
        durationMs: DURATION_MS,
        nextPath,
      },
    });
  }, [nextPath, plan, position, searchParams, setIndex]);

  useEffect(() => {
    if (!plan || !setIndex || !position || !nextPath) return;

    if (remainingSeconds <= 0) {
      if (didLogEnd.current) return;
      didLogEnd.current = true;

      const logParams = new URLSearchParams();
      logParams.set("set", setIndex);

      const baseLog = getClientLogBase({ searchParams: logParams });
      const taskSetId = plan.sets[setIndex].phase;

      void (async () => {
        await trackAction({
          ...baseLog,
          phase: "fixation",
          page: "fixation",
          type: "fixation_end",
          meta: {},
          payload: {
            setIndex,
            taskSetId,
            position,
            label: getLabel(position, setIndex),
            durationMs: DURATION_MS,
            nextPath,
          },
        });

        router.push(nextPath);
      })();

      return;
    }

    const timer = window.setTimeout(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [nextPath, plan, position, remainingSeconds, router, searchParams, setIndex]);

  if (plan === undefined) return null;

  if (plan === null || !setIndex || !position || !nextPath) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-8 text-slate-900">
        <section className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold tracking-wide text-red-500">
            Fixation Error
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">
            固視点ページを開始できません
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            URLの set または position が不正です。setupからやり直してください。
          </p>
          <Link
            href="/experiment/setup"
            className="mt-7 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white"
          >
            setupへ戻る
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="relative flex h-screen cursor-none items-center justify-center overflow-hidden bg-slate-500 text-white">
      <div className="relative h-12 w-12" aria-label="fixation cross">
        <div className="absolute left-1/2 top-0 h-full w-[4px] -translate-x-1/2 rounded-full bg-white" />
        <div className="absolute left-0 top-1/2 h-[4px] w-full -translate-y-1/2 rounded-full bg-white" />
      </div>
    </main>
  );
}
