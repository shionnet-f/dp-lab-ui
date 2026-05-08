import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial10Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("b1", "trial10", "product");

export default function TrialStartPageA1Trial2() {
  return (
    <TrialStartPage
      purchaseConditions={trial10Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
