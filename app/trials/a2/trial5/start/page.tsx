import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial5Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a2", "trial5", "product")

export default function TrialStartPageA1Trial2() {

  return (
    <TrialStartPage
      purchaseConditions={trial5Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}