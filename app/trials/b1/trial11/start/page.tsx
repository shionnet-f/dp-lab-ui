import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial11Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b1", "trial11", "product");

export default function TrialStartPageA1Trial2() {
  return (
    <TrialStartPage
      purchaseConditions={trial11Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
