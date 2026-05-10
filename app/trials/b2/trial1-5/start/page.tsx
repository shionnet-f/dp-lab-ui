import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial1_5Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b2", "trial1-5", "product");

export default function StartPageB2Trial15() {
  return (
    <TrialStartPage
      purchaseConditions={trial1_5Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
