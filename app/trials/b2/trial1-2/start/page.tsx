import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial1_2Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b2", "trial1-2", "product");

export default function StartPageB2Trial12() {
  return (
    <TrialStartPage
      purchaseConditions={trial1_2Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
