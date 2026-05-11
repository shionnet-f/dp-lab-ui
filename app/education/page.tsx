"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trackAction } from "@/app/actions/track";
import SlideRenderer from "./_components/SlideRenderer";
import SlideShell from "./_components/SlideShell";
import { buildSlides } from "./_lib/buildSlides";
import type { SlideData } from "./_data/types";

type Version = "A" | "B";

type ExperimentPlanForEducationLog = {
  sessionId?: string;
  participantId?: string;
  setOrder?: string;
  educationVersion?: Version;
};

function loadExperimentPlanForEducationLog(): ExperimentPlanForEducationLog {
  const rawPlan = localStorage.getItem("experimentPlan");

  if (!rawPlan) return {};

  try {
    return JSON.parse(rawPlan) as ExperimentPlanForEducationLog;
  } catch {
    return {};
  }
}

function getEducationLogBase(version: Version) {
  const plan = loadExperimentPlanForEducationLog();

  return {
    sessionId: plan.sessionId,
    participantId: plan.participantId,
    phase: "education",
    page: "education",
    meta: {
      educationVersion: plan.educationVersion ?? version,
      setOrder: plan.setOrder ?? null,
    },
  };
}

export default function EducationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const versionParam = searchParams.get("version");
  const version: Version = versionParam === "B" ? "B" : "A";
  const next = searchParams.get("next") ?? "/";

  const slides = useMemo(() => buildSlides(version), [version]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const didLogStart = useRef(false);

  const currentSlide: SlideData = slides[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;

  const selectedOptionId =
    currentSlide.kind === "quiz"
      ? (quizAnswers[currentSlide.id] ?? null)
      : null;

  const canGoNext = currentSlide.kind !== "quiz" || selectedOptionId !== null;

  useEffect(() => {
    if (didLogStart.current) return;
    didLogStart.current = true;

    const baseLog = getEducationLogBase(version);

    void trackAction({
      ...baseLog,
      type: "page_view",
      payload: {
        version,
        totalSlides: slides.length,
        next,
      },
    });

    void trackAction({
      ...baseLog,
      type: "education_start",
      payload: {
        version,
        totalSlides: slides.length,
        next,
      },
    });
  }, [next, slides.length, version]);

  useEffect(() => {
    const baseLog = getEducationLogBase(version);

    void trackAction({
      ...baseLog,
      type: "slide_view",
      payload: {
        version,
        slideIndex: currentIndex,
        slideNumber: currentIndex + 1,
        slideId: currentSlide.id,
        slideKind: currentSlide.kind,
        title: currentSlide.title,
      },
    });
  }, [currentIndex, currentSlide.id, currentSlide.kind, currentSlide.title, version]);

  const handlePrev = () => {
    if (isFirst) return;

    const fromSlide = currentSlide;
    const fromIndex = currentIndex;
    const toIndex = currentIndex - 1;
    const toSlide = slides[toIndex];
    const baseLog = getEducationLogBase(version);

    void trackAction({
      ...baseLog,
      type: "slide_prev",
      payload: {
        version,
        fromSlideIndex: fromIndex,
        fromSlideNumber: fromIndex + 1,
        fromSlideId: fromSlide.id,
        toSlideIndex: toIndex,
        toSlideNumber: toIndex + 1,
        toSlideId: toSlide.id,
      },
    });

    setCurrentIndex(toIndex);
  };

  const handleNext = () => {
    if (!canGoNext) return;

    const baseLog = getEducationLogBase(version);

    if (isLast) {
      void trackAction({
        ...baseLog,
        type: "education_finish_confirm_open",
        payload: {
          version,
          slideIndex: currentIndex,
          slideNumber: currentIndex + 1,
          slideId: currentSlide.id,
          next,
        },
      });

      setShowFinishConfirm(true);
      return;
    }

    const fromSlide = currentSlide;
    const fromIndex = currentIndex;
    const toIndex = currentIndex + 1;
    const toSlide = slides[toIndex];

    void trackAction({
      ...baseLog,
      type: "slide_next",
      payload: {
        version,
        fromSlideIndex: fromIndex,
        fromSlideNumber: fromIndex + 1,
        fromSlideId: fromSlide.id,
        toSlideIndex: toIndex,
        toSlideNumber: toIndex + 1,
        toSlideId: toSlide.id,
      },
    });

    setCurrentIndex(toIndex);
  };

  const handleCancelFinish = () => {
    const baseLog = getEducationLogBase(version);

    void trackAction({
      ...baseLog,
      type: "education_finish_confirm_cancel",
      payload: {
        version,
        slideIndex: currentIndex,
        slideNumber: currentIndex + 1,
        slideId: currentSlide.id,
      },
    });

    setShowFinishConfirm(false);
  };

  const handleConfirmFinish = async () => {
    if (isFinishing) return;
    setIsFinishing(true);

    const baseLog = getEducationLogBase(version);

    try {
      await trackAction({
        ...baseLog,
        type: "education_finish_confirm_ok",
        payload: {
          version,
          slideIndex: currentIndex,
          slideNumber: currentIndex + 1,
          slideId: currentSlide.id,
          next,
        },
      });

      await trackAction({
        ...baseLog,
        type: "education_end",
        payload: {
          version,
          totalSlides: slides.length,
          next,
          quizAnswers,
        },
      });
    } finally {
      router.push(next);
    }
  };

  const handleSelectQuizOption = (optionId: string) => {
    if (currentSlide.kind !== "quiz") return;

    setQuizAnswers((prev) => ({
      ...prev,
      [currentSlide.id]: optionId,
    }));

    const baseLog = getEducationLogBase(version);

    void trackAction({
      ...baseLog,
      type: "answer_select",
      payload: {
        version,
        slideIndex: currentIndex,
        slideNumber: currentIndex + 1,
        slideId: currentSlide.id,
        question: currentSlide.prompt,
        selectedOptionId: optionId,
        correctOptionId: currentSlide.correctOptionId,
        isCorrect: optionId === currentSlide.correctOptionId,
      },
    });
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-50 text-gray-900">
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

      <div className="pointer-events-none fixed inset-x-0 bottom-[32px]">
        <div className="mx-auto flex w-[1280px] items-center justify-between">
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className="h-[48px] w-[180px] rounded-2xl border border-gray-300 bg-white text-[18px] font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              戻る
            </button>
          </div>

          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext}
              className="h-[48px] w-[180px] rounded-2xl bg-gray-900 text-[18px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? "教育を終了する" : "次へ"}
            </button>
          </div>
        </div>
      </div>

      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-[520px] rounded-3xl bg-white px-[40px] py-[32px] shadow-xl">
            <h2 className="text-[28px] font-bold text-gray-900">
              教育を終了しますか？
            </h2>
            <p className="mt-[16px] text-[18px] leading-[1.8] text-gray-700">
              OKを押すと教育フェーズを終了し、次の画面へ進みます。
              誤って終了しないように確認してください。
            </p>

            <div className="mt-[28px] flex justify-end gap-[16px]">
              <button
                type="button"
                onClick={handleCancelFinish}
                disabled={isFinishing}
                className="h-[48px] w-[120px] rounded-2xl border border-gray-300 bg-white text-[18px] font-medium text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleConfirmFinish}
                disabled={isFinishing}
                className="h-[48px] w-[160px] rounded-2xl bg-gray-900 text-[18px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isFinishing ? "終了中..." : "終了する"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
