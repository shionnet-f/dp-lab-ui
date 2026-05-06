import { TrialCompletePage } from "@/app/trials/_components/TrialCompletePage";
import { getTrialPath } from "@/app/trials/_lib/path";

type Props = {
  searchParams?: Promise<{
    set?: string;
  }>;
};

const nextPath = getTrialPath("a1", "trial9", "start");

export default async function TrialCompletePageA1Trial2({
  searchParams,
}: Props) {
  const sp = await searchParams;
  const set = sp?.set ?? "1";

  return (
    <TrialCompletePage
      set={set}
      nextPath={nextPath}
    />
  );
}