import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial2Data } from "../data";
import { getProductPath } from "@/app/trials/_lib/path";

export default function TrialStartPageA1Trial2() {
  const setType = "a1";
  const trialId = "trial2";

  return (
    <TrialStartPage
      purchaseConditions={trial2Data.purchaseConditions}
      nextPath={getProductPath(setType, trialId)}
    />
  );
}