import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial1_2Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b1", "trial1-2", "product");

export default function StartPageB1Trial1_2() {
  return (
    <TrialStartPage
      purchaseConditions={trial1_2Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
