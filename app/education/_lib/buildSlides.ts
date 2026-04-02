import type { SlideData } from "../_data/types";
import { aSlides } from "../_data/a";
import { bSlides } from "../_data/b";
import { sharedSlides } from "../_data/shared";

export function buildSlides(version: "A" | "B"): SlideData[] {
  if (version === "A") {
    return [
      aSlides.cover,
      sharedSlides.dpWhat,
      sharedSlides.infoAsymmetry,
      aSlides.focus,
      aSlides.definition,
      aSlides.misleadingInfo,
      aSlides.misleadingInfoExamples,
      aSlides.quiz1,
      aSlides.answer1,
      aSlides.misleadingExpression,
      aSlides.misleadingExpressionExamples,
      aSlides.quiz2,
      aSlides.answer2,
      sharedSlides.summary,
      aSlides.end,
    ];
  }

  return [
    bSlides.cover,
    sharedSlides.dpWhat,
    sharedSlides.infoAsymmetry,
    bSlides.focus,
    bSlides.definition,
    bSlides.hiddenInfo,
    bSlides.hiddenInfoExamples,
    bSlides.quiz1,
    bSlides.answer1,
    bSlides.delayedInfo,
    bSlides.delayedInfoExamples,
    bSlides.quiz2,
    bSlides.answer2,
    sharedSlides.summary,
    bSlides.end,
  ];
}
