import { TrialCompletePage } from "@/app/trials/_components/TrialCompletePage";
import { getPracticePath } from "@/app/trials/_lib/path";

type Props = {
  searchParams?: Promise<{
    set?: string;
  }>;
};

const nextPath = getPracticePath("trial1-2", "start");

export default async function PracticeCompletePageTrial1_1({
  searchParams,
}: Props) {
  const sp = await searchParams;
  const set = sp?.set ?? "1";

  return <TrialCompletePage set={set} nextPath={nextPath} />;
}
