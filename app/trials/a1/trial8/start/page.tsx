import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial8Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a1", "trial8", "product")

export default function StartPageA1Trial8() {

  return (
    <TrialStartPage
      purchaseConditions={trial8Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}