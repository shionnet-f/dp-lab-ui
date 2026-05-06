import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial1_4Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a1", "trial1-4", "product")

export default function TrialStartPageA1Trial2() {

  return (
    <TrialStartPage
      purchaseConditions={trial1_4Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}