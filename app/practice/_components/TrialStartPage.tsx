"use client";

import { useRouter, useSearchParams } from "next/navigation";

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

    const router = useRouter();

    return (
        <main className="w-[1920px] h-[1080px] overflow-hidden bg-gray-50 flex items-center justify-center">
            <div className="w-[960px] h-[720px] border border-gray-300 bg-white px-[80px] py-[70px] text-center">
                <div className="flex h-full flex-col items-center gap-[60px]">
                    <h1 className="h-[48px] text-[32px] font-bold leading-[48px] text-gray-900">
                        試行開始
                    </h1>

                    <p className="h-[72px] text-[28px] leading-[36px] text-gray-700">
                        次のページで商品を選び、購入手続きを行ってください。
                    </p>

                    <div className="w-[760px] h-[260px] border border-blue-300 bg-blue-50 px-[48px] py-[36px] text-left text-[24px] leading-[36px] text-blue-900">
                        <p className="mb-[24px] h-[40px] text-[28px] font-bold leading-[40px]">
                            購入条件
                        </p>

                        <ul className="list-disc space-y-[16px] pl-[32px]">
                            <li>予算{purchaseConditions.budgetYen}円以内</li>
                            <li>{purchaseConditions.quantityCondition}</li>
                            <li>{purchaseConditions.specificCondition}</li>
                        </ul>
                    </div>

                    <button
                        className="inline-flex h-[72px] w-[240px] items-center justify-center border border-black bg-black text-[28px] font-medium leading-none text-white"
                        onClick={() => {
                            router.push(`${nextPath}?set=${set}`);
                        }}
                    >
                        開始する
                    </button>
                </div>
            </div>
        </main>
    );
}