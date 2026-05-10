"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trial2Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getClientLogBase } from "@/lib/log/clientLogBase";

export default function StartPageB1Trial2() {
  const { purchaseConditions } = trial2Data;
  const searchParams = useSearchParams();
  const router = useRouter();
  const didTrack = useRef(false);

  const set = searchParams.get("set") ?? "1";
  const trial = searchParams.get("trial") ?? "1";

  function createLogBase() {
    const logParams = new URLSearchParams();

    if (set) logParams.set("set", set);
    if (trial) logParams.set("trial", trial);

    return getClientLogBase({ searchParams: logParams });
  }

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    void trackAction({
      ...createLogBase(),
      phase: "main",
      page: "start",
      type: "page_view",
      meta: { implTrialId: "trial2" },
      payload: {},
    });
  }, [searchParams]);

  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">試行開始</h1>

        <p className="text-sm text-gray-600">
          次のページで商品を選び、購入手続きを行ってください。
        </p>
        <div className="z-10 mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span className="font-semibold">購入条件：</span>
          予算{purchaseConditions.budgetYen}円以内、
          {purchaseConditions.quantityCondition}、
          {purchaseConditions.specificCondition}
        </div>

        <button
          type="button"
          onClick={async () => {
            await trackAction({
              ...createLogBase(),
              phase: "main",
              page: "start",
              type: "trial_start",
              meta: { implTrialId: "trial2" },
              payload: {},
            });

            router.push(`/trials/b1/trial2/product?set=${set}&trial=${trial}`);
          }}
          className="inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white"
        >
          試行を開始する
        </button>
      </div>
    </main>
  );
}
