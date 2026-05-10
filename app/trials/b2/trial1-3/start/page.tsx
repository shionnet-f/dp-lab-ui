import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial1_3Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b2", "trial1-3", "product");

export default function StartPageB2Trial13() {
  return (
    <TrialStartPage
      purchaseConditions={trial1_3Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
