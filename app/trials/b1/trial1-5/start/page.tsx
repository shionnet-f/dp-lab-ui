import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial1_5Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b1", "trial1-5", "product");

export default function StartPageB1Trial1_5() {
  return (
    <TrialStartPage
      purchaseConditions={trial1_5Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
