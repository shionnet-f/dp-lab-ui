"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";

function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");

  if (trialsIndex >= 0) {
    return segments[trialsIndex + 2] ?? null;
  }

  const setIdIndex = segments.findIndex((segment) =>
    ["a1", "a2", "b1", "b2"].includes(segment),
  );
  return setIdIndex >= 0 ? (segments[setIdIndex + 1] ?? null) : null;
}

type TrialCompletePageProps = {
  set: string;
  trial: string;
  nextPath: string;
  nextParams?: Record<string, string>;
};

export function TrialCompletePage({
  set,
  trial,
  nextPath,
  nextParams,
}: TrialCompletePageProps) {
  const didTrack = useRef(false);
  const router = useRouter();

  function createLogBase() {
    const logParams = new URLSearchParams();
    logParams.set("set", set);
    logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    const baseLog = createLogBase();

    void trackAction({
      ...baseLog,
      phase: "main",
      page: "complete",
      type: "page_view",
      meta: { implTrialId: getImplTrialId() },
      payload: {},
    });
  }, [set, trial]);

  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl space-y-8 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-[32px] font-bold text-gray-900">試行完了</h1>

        <p className="text-[20px] font-semibold leading-[32px] text-gray-700">
          この試行は完了しました。次の試行へ進んでください。
        </p>

        <button
          className="inline-block rounded-md bg-black px-8 py-4 text-[20px] font-bold text-white"
          onClick={async () => {
            const baseLog = createLogBase();

            await trackAction({
              ...baseLog,
              phase: "main",
              page: "complete",
              type: "next_trial",
              meta: { implTrialId: getImplTrialId() },
              payload: {},
            });

            const params = new URLSearchParams();
            params.set("set", set);

            if (nextParams) {
              Object.entries(nextParams).forEach(([key, value]) => {
                params.set(key, value);
              });
            }

            router.push(`${nextPath}?${params.toString()}`);
          }}
        >
          次へ進む
        </button>
      </div>
    </main>
  );
}
