import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial1_1Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b2", "trial1-1", "product");

export default function StartPageB2Trial11() {
  return (
    <TrialStartPage
      purchaseConditions={trial1_1Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
