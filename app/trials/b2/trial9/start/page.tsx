import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial9Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b2", "trial9", "product");

export default function StartPageB2Trial9() {
  return (
    <TrialStartPage
      purchaseConditions={trial9Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
