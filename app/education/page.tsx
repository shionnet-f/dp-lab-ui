"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SlideRenderer from "./_components/SlideRenderer";
import SlideShell from "./_components/SlideShell";
import { buildSlides } from "./_lib/buildSlides";
import type { SlideData } from "./_data/types";

type Version = "A" | "B";

export default function EducationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const versionParam = searchParams.get("version");
  const version: Version = versionParam === "B" ? "B" : "A";
  const next = searchParams.get("next") ?? "/";

  const slides = useMemo(() => buildSlides(version), [version]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const currentSlide: SlideData = slides[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;

  const selectedOptionId =
    currentSlide.kind === "quiz"
      ? (quizAnswers[currentSlide.id] ?? null)
      : null;

  const canGoNext = currentSlide.kind !== "quiz" || selectedOptionId !== null;

  const handlePrev = () => {
    if (isFirst) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;

    if (isLast) {
      router.push(next);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleSelectQuizOption = (optionId: string) => {
    if (currentSlide.kind !== "quiz") return;

    setQuizAnswers((prev) => ({
      ...prev,
      [currentSlide.id]: optionId,
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <SlideShell
        title={currentSlide.title}
        currentIndex={currentIndex}
        totalSlides={slides.length}
      >
        <SlideRenderer
          slide={currentSlide}
          selectedOptionId={selectedOptionId}
          onSelectQuizOption={handleSelectQuizOption}
        />
      </SlideShell>

      <div className="pointer-events-none fixed inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 pb-8">
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className="rounded-2xl border border-gray-300 bg-white px-5 py-3 text-base disabled:cursor-not-allowed disabled:opacity-40"
            >
              戻る
            </button>
          </div>

          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext}
              className="rounded-2xl bg-gray-900 px-6 py-3 text-base text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? "教育を終了する" : "次へ"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
