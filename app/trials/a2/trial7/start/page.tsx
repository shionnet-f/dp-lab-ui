import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { trial7Data } from "../data";
import { getTrialPath } from "@/app/trials/_lib/path";

const nextPath = getTrialPath("a2", "trial7", "product")

export default function StartPageA2Trial7() {

  return (
    <TrialStartPage
      purchaseConditions={trial7Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}