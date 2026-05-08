import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial9Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a1", "trial9", "product")

export default function StartPageA1Trial9() {

  return (
    <TrialStartPage
      purchaseConditions={trial9Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}