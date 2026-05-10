import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial11Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b2", "trial11", "product");

export default function StartPageB2Trial11() {
  return (
    <TrialStartPage
      purchaseConditions={trial11Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
