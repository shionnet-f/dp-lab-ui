import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial5Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b2", "trial5", "product");

export default function StartPageB2Trial5() {
  return (
    <TrialStartPage
      purchaseConditions={trial5Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
