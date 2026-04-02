type SlideShellProps = {
  title: string;
  currentIndex: number;
  totalSlides: number;
  children: React.ReactNode;
};

export default function SlideShell({
  title,
  currentIndex,
  totalSlides,
  children,
}: SlideShellProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-8 py-10">
      <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
        <span>教育フェーズ</span>
        <span>
          {currentIndex + 1} / {totalSlides}
        </span>
      </div>

      <section className="flex-1 rounded-3xl border border-gray-200 bg-white px-10 py-10 shadow-sm">
        <h1 className="mb-8 text-3xl font-bold leading-tight text-gray-900">
          {title}
        </h1>
        <div className="min-h-[420px]">{children}</div>
      </section>
    </div>
  );
}
