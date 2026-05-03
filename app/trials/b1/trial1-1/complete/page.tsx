import Link from "next/link";

type Props = {
  searchParams?: Promise<{
    set?: string;
  }>;
};

export default async function TrialCompletePageA1Trial1_1({ searchParams }: Props) {
  const sp = await searchParams;
  const set = sp?.set ?? "1";

  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">試行完了</h1>

        <p className="text-sm text-gray-600">
          この試行は完了しました。次の試行へ進んでください。
        </p>

        <Link
          href={`/trials/a1/trial1-2/start?set=${set}`}
          className="inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white"
        >
          次へ進む
        </Link>
      </div>
    </main>
  );
}
