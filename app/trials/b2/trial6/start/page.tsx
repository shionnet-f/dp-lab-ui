import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial6Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b2", "trial6", "product");

export default function StartPageB2Trial6() {
  return (
    <TrialStartPage
      purchaseConditions={trial6Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
