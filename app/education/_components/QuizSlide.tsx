import type { QuizOption } from "../_data/types";

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
