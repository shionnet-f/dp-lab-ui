import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial1_4Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b2", "trial1-4", "product");

export default function StartPageB2Trial14() {
  return (
    <TrialStartPage
      purchaseConditions={trial1_4Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
