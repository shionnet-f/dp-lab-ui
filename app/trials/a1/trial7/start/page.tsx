import { Suspense } from "react";
import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial7Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a1", "trial7", "product");

export default function StartPageA1Trial7() {
  return (
    <Suspense fallback={null}>
      <TrialStartPage
        purchaseConditions={trial7Data.purchaseConditions}
        nextPath={nextPath}
      />
    </Suspense>
  );
}
