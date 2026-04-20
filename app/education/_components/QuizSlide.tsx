import type { QuizOption } from "../_data/types";

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


type QuizSlideProps = {
  prompt: string;
  options: QuizOption[];
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
};

export default function QuizSlide({
  prompt,
  options,
  selectedOptionId,
  onSelect,
}: QuizSlideProps) {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-9 text-gray-800">{prompt}</p>

      <div className="grid gap-4">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={[
                "rounded-2xl border px-5 py-4 text-left text-lg transition",
                isSelected
                  ? "border-gray-900 bg-gray-100"
                  : "border-gray-300 bg-white hover:bg-gray-50",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-500">
        いずれかを選択すると次へ進めます。
      </p>
    </div>
  );
}
