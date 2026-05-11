"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
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

type PurchaseConditions = {
  budgetYen: number;
  quantityCondition: string;
  specificCondition: string;
};

type TrialStartPageProps = {
  purchaseConditions: PurchaseConditions;
  nextPath: string;
};

export function TrialStartPage({
  purchaseConditions,
  nextPath,
}: TrialStartPageProps) {
  const searchParams = useSearchParams();
  const set = searchParams.get("set") ?? "1";
  const trial = searchParams.get("trial") ?? "1";

  const didTrack = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    const baseLog = getClientLogBase({ searchParams });

    trackAction({
      ...baseLog,
      phase: "main",
      page: "start",
      type: "page_view",
      meta: { implTrialId: getImplTrialId() },
      payload: {},
    });
  }, [searchParams]);

  return (
    <main className="flex h-[1080px] w-[1920px] items-center justify-center overflow-hidden bg-gray-50">
      <div className="h-[720px] w-[960px] border border-gray-300 bg-white px-[80px] py-[70px] text-center">
        <div className="flex h-full flex-col items-center gap-[52px]">
          <h1 className="h-[48px] text-[36px] font-bold leading-[48px] text-gray-900">
            試行開始
          </h1>

          <div className="space-y-[10px] text-[20px] font-semibold leading-[30px] text-gray-700">
            <p>
              あなたが実際に購入する場面を想定して、以下の条件を満たす商品を購入してください。
            </p>
            <p>商品はいつ届いても構いません。 オプションの選択は自由です。</p>
          </div>

          <div className="h-[260px] w-[760px] border border-blue-300 bg-blue-50 px-[48px] py-[36px] text-left text-[26px] font-semibold leading-[36px] text-blue-900">
            <p className="mb-[24px] h-[40px] text-[30px] font-bold leading-[40px]">
              購入条件
            </p>

            <ul className="list-disc space-y-[16px] pl-[32px]">
              <li>予算{purchaseConditions.budgetYen}円以内</li>
              <li>{purchaseConditions.quantityCondition}</li>
              <li>{purchaseConditions.specificCondition}</li>
            </ul>
          </div>

          <button
            className="inline-flex h-[72px] w-[240px] items-center justify-center border border-black bg-black text-[20px] font-bold leading-none text-white"
            onClick={async () => {
              const baseLog = getClientLogBase({ searchParams });

              await trackAction({
                ...baseLog,
                phase: "main",
                page: "start",
                type: "trial_start",
                meta: { implTrialId: getImplTrialId() },
                payload: {},
              });

              router.push(`${nextPath}?set=${set}&trial=${trial}`);
            }}
          >
            開始する
          </button>
        </div>
      </div>
    </main>
  );
}
