import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial1_4Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b1", "trial1-4", "product");

export default function StartPageB1Trial1_4() {
  return (
    <TrialStartPage
      purchaseConditions={trial1_4Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
