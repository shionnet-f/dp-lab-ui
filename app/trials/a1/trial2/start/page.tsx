import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial2Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a1", "trial2", "product")

export default function TrialStartPageA1Trial2() {

  return (
    <TrialStartPage
      purchaseConditions={trial2Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}