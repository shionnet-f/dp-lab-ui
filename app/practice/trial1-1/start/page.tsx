import { TrialStartPage } from "@/app/practice/_components/TrialStartPage";
import { practice1_1Data } from "../data";
import { getPracticePath } from "@/app/trials/_lib/path";

const nextPath = getPracticePath("trial1-1", "product");

export default function TrialStartPageA1Trial2() {
  return (
    <TrialStartPage
      purchaseConditions={practice1_1Data.purchaseConditions}
      nextPath={nextPath}
    />
  );
}
