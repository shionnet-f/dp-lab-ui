import type { QuizOption, QuizUiType } from "../_data/types";
import QuizCountdownOptions from "./QuizCountdownOptions";
import QuizPriceInterferenceOptions from "./QuizPriceInterferenceOptions";
import QuizHiddenInfoOptions from "./QuizHiddenInfoOptions";
import QuizDelayedInfoOptions from "./QuizDelayedInfoOptions";

type QuizSlideProps = {
  prompt: string;
  options?: QuizOption[];
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  quizUiType?: QuizUiType;
};

function DefaultQuizOptions({
  options = [],
  selectedOptionId,
  onSelect,
}: {
  options?: QuizOption[];
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {options.map((option) => {
        const isSelected = selectedOptionId === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={[
              "rounded-xl border bg-white px-5 py-6 text-left transition",
              "focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
              isSelected
                ? "border-gray-900 ring-2 ring-gray-900/10"
                : "border-gray-200 hover:border-gray-400",
            ].join(" ")}
          >
            <div className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-700">
              {option.id}
            </div>
            <p className="text-sm font-medium leading-6 text-gray-900">
              {option.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export default function QuizSlide({
  prompt,
  options,
  selectedOptionId,
  onSelect,
  quizUiType,
}: QuizSlideProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
        <div className="mb-2 inline-flex rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
          クイズ
        </div>

        <p className="text-lg font-semibold leading-7 text-gray-900">
          {prompt}
        </p>

        <p className="mt-1 text-xs text-gray-600">
          A / B / C を見比べて選択してください
        </p>
      </section>

      {quizUiType === "countdown" ? (
        <QuizCountdownOptions
          selectedId={selectedOptionId}
          onSelect={onSelect}
        />
      ) : quizUiType === "price_interference" ? (
        <QuizPriceInterferenceOptions
          selectedId={selectedOptionId}
          onSelect={onSelect}
        />
      ) : quizUiType === "hidden_info" ? (
        <QuizHiddenInfoOptions
          selectedId={selectedOptionId}
          onSelect={onSelect}
        />
      ) : quizUiType === "delayed_info" ? (
        <QuizDelayedInfoOptions
          selectedId={selectedOptionId}
          onSelect={onSelect}
        />
      ) : (
        <DefaultQuizOptions
          options={options}
          selectedOptionId={selectedOptionId}
          onSelect={onSelect}
        />
      )}

      <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-3">
        <p className="text-xs text-gray-600">
          {selectedOptionId
            ? `${selectedOptionId} を選択中です`
            : "選択してください"}
        </p>
      </div>
    </div>
  );
}
