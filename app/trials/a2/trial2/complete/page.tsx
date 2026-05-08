import { TrialCompletePage } from "@/app/trials/_components/TrialCompletePage";
import { getNextTrialStep } from "@/app/trials/_lib/trialFlow";

type Props = {
  searchParams?: Promise<{
    set?: string;
    trial?: string;
  }>;
};

export default async function CompletePageA2Trial2({
  searchParams,
}: Props) {
  const sp = await searchParams;
  const set = sp?.set ?? "1";
  const trial = sp?.trial ?? "1";

  const next = getNextTrialStep({
    setId: "a2",
    trialIndex: trial,
  });

  return (
    <TrialCompletePage
      set={set}
      nextPath={next.nextPath}
      nextParams={next.nextParams}
    />
  );
}
