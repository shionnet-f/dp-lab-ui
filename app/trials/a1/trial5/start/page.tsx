import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial5Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a1", "trial5", "product")

export default function StartPageA1Trial5() {

  return (
    <TrialStartPage
      purchaseConditions={trial5Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}