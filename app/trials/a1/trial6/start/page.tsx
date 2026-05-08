import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial6Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a1", "trial6", "product")

export default function StartPageA1Trial6() {

  return (
    <TrialStartPage
      purchaseConditions={trial6Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}