import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial3Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a1", "trial3", "product")

export default function StartPageA1Trial3() {

  return (
    <TrialStartPage
      purchaseConditions={trial3Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}