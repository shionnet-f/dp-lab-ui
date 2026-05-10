import { TrialStartPage } from "@/app/practice/_components/TrialStartPage";
import { practice1_4Data } from "../data";
import { getPracticePath } from "@/app/trials/_lib/path";

const nextPath = getPracticePath("trial1-4", "product");

export default function TrialStartPageA1Trial2() {
  return (
    <TrialStartPage
      purchaseConditions={practice1_4Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
