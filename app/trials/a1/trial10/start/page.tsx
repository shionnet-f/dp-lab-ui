import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial10Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a1", "trial10", "product")

export default function StartPageA1Trial10() {

  return (
    <TrialStartPage
      purchaseConditions={trial10Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}