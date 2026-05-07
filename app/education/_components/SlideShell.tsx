import type { ReactNode } from "react";

type SlideShellProps = {
  title: string;
  currentIndex: number;
  totalSlides: number;
  children: ReactNode;
};

export default function SlideShell({
  title,
  currentIndex,
  totalSlides,
  children,
}: SlideShellProps) {
  return (
    <div className="mx-auto flex h-screen w-[1280px] flex-col pt-[40px]">
      <div className="mb-[16px] flex h-[24px] items-center justify-between text-[14px] leading-none text-gray-500">
        <span>教育フェーズ</span>
        <span>
          {currentIndex + 1} / {totalSlides}
        </span>
      </div>

      <section className="h-[800px] rounded-3xl border border-gray-200 bg-white px-[56px] py-[44px] shadow-sm">
        <h1 className="mb-[28px] flex h-[72px] items-center text-[34px] font-bold leading-[1.35] text-gray-900">
          {title}
        </h1>
        <div className="h-[600px] overflow-hidden">{children}</div>
      </section>
    </div>
  );
}
