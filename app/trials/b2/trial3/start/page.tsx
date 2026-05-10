import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial3Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b2", "trial3", "product");

export default function StartPageB2Trial3() {
  return (
    <TrialStartPage
      purchaseConditions={trial3Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
