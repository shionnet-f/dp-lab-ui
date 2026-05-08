import { TrialCompletePage } from "@/app/trials/_components/TrialCompletePage";

type Props = {
  searchParams: Promise<{
    set?: string;
  }>;
};

export default async function TrialCompletePageA1Trial11({
  searchParams,
}: Props) {
  const sp = await searchParams;
  const set = sp?.set ?? "1";

  return (
    <TrialCompletePage
      set={set}
      nextPath="/experiment/fixation"
      nextParams={{ position: "after" }}
    />
  );
}
