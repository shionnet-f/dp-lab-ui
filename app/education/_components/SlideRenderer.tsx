import type { SlideData } from "../_data/types";
import AnswerSlide from "./AnswerSlide";
import QuizSlide from "./QuizSlide";
import TextSlide from "./TextSlide";
import TitleSlide from "./TitleSlide";

type SlideRendererProps = {
  slide: SlideData;
  selectedOptionId: string | null;
  onSelectQuizOption: (optionId: string) => void;
};

export default function SlideRenderer({
  slide,
  selectedOptionId,
  onSelectQuizOption,
}: SlideRendererProps) {
  switch (slide.kind) {
    case "title":
      return <TitleSlide subtitle={slide.subtitle} />;

    case "text":
      return <TextSlide body={slide.body} />;

    case "answer":
      return <AnswerSlide body={slide.body} />;

    case "quiz":
      return (
        <QuizSlide
          prompt={slide.prompt}
          options={slide.options}
          selectedOptionId={selectedOptionId}
          onSelect={onSelectQuizOption}
          quizUiType={slide.quizUiType}
        />
      );

    default:
      return null;
  }
}
