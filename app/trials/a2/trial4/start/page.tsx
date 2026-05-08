import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial4Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a2", "trial4", "product")

export default function StartPageA2Trial4() {

  return (
    <TrialStartPage
      purchaseConditions={trial4Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}