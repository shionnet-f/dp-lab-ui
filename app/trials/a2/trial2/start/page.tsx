import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial2Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a2", "trial2", "product")

export default function StartPageA2Trial2() {

  return (
    <TrialStartPage
      purchaseConditions={trial2Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}