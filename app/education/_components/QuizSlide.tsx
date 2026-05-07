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
    <div className="grid grid-cols-3 gap-[16px]">
      {options.map((option) => {
        const isSelected = selectedOptionId === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={[
              "h-[220px] rounded-xl border bg-white px-[24px] py-[24px] text-left transition",
              "focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
              isSelected
                ? "border-gray-900 ring-2 ring-gray-900/10"
                : "border-gray-200 hover:border-gray-400",
            ].join(" ")}
          >
            <div className="mb-[20px] inline-flex h-[32px] w-[32px] items-center justify-center rounded-full border border-gray-300 text-[14px] font-bold text-gray-700">
              {option.id}
            </div>
            <p className="text-[18px] font-medium leading-[1.7] text-gray-900">
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
    <div className="space-y-[16px]">
      <section className="h-[112px] rounded-xl border border-gray-200 bg-gray-50 px-[24px] py-[18px]">
        <div className="mb-[8px] inline-flex rounded-full bg-white px-[12px] py-[4px] text-[13px] font-medium leading-none text-gray-600 ring-1 ring-gray-200">
          クイズ
        </div>

        <p className="text-[22px] font-semibold leading-[1.45] text-gray-900">
          {prompt}
        </p>

        <p className="mt-[4px] text-[14px] leading-none text-gray-600">
          A / B / C を見比べて選択してください
        </p>
      </section>

      <div className="h-[390px] overflow-hidden">
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
      </div>

      <div className="h-[48px] rounded-xl border border-dashed border-gray-300 bg-white px-[18px] py-[14px]">
        <p className="text-[14px] leading-none text-gray-600">
          {selectedOptionId
            ? `${selectedOptionId} を選択中です`
            : "選択してください"}
        </p>
      </div>
    </div>
  );
}
