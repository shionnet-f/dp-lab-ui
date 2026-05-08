import { TrialStartPage } from "@/app/trials/_components/TrialStartPage";
import { practice1_2Data } from "../data";
import { getPracticePath } from "@/app/trials/_lib/path";

const nextPath = getPracticePath("trial1-2", "product");

export default function TrialStartPageA1Trial2() {
  return (
    <TrialStartPage
      purchaseConditions={practice1_2Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
