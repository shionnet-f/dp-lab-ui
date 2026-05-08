import { TrialCompletePage } from "@/app/trials/_components/TrialCompletePage";

type Props = {
  searchParams?: Promise<{
    set?: string;
  }>;
};

const nextPath = "/";

export default async function PracticeCompletePageTrial1_1({
  searchParams,
}: Props) {
  const sp = await searchParams;
  const set = sp?.set ?? "1";

  return <TrialCompletePage set={set} nextPath={nextPath} />;
}
