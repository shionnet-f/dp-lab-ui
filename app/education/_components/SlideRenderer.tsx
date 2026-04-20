import type { SlideData } from "../_data/types";
import AnswerSlide from "./AnswerSlide";
import QuizSlide from "./QuizSlide";
import TextSlide from "./TextSlide";
import TitleSlide from "./TitleSlide";

/* === education patch: block renderer === */
const renderBlock = (block, i) => {
  if (block && typeof block === 'object') {
    if (block.type === 'text') {
      return <p key={i} className="text-block">{block.content}</p>;
    }
    if (block.type === 'list' && Array.isArray(block.items)) {
      return (
        <ul key={i} className="list-block">
          {block.items.map((it, j) => <li key={j}>{it}</li>)}
        </ul>
      );
    }
  }
  // fallback for string lines
  if (typeof block === 'string') {
    if (block.trim() === '') return null;
    return <p key={i} className="text-block">{block}</p>;
  }
  return null;
};


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
        />
      );

    default:
      return null;
  }
}
