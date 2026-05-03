import Link from "next/link";

type Props = {
  searchParams: Promise<{
    set?: string;
  }>;
};

export default async function TrialCompletePageB1Trial11({
  searchParams,
}: Props) {
  const sp = await searchParams;
  const set = sp.set ?? "1";

  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">セット完了</h1>

        <p className="text-sm text-gray-600">購入手続き完了です</p>

        <Link
          href={`/experiment/fixation?set=${set}&position=after`}
          className="inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white"
        >
          次へ進む
        </Link>
      </div>
    </main>
  );
}
