export type SlideBase = {
  id: string;
  title: string;
};

export type TitleSlideData = SlideBase & {
  kind: "title";
  subtitle?: string;
};

export type TextSlideData = SlideBase & {
  kind: "text";
  body: string[];
};

export type QuizOption = {
  id: string;
  label: string;
};

export type QuizUiType = "countdown" | "price_interference" | "hidden_info" | "delayed_info";

export type QuizSlideData = SlideBase & {
  kind: "quiz";
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  quizUiType?: QuizUiType;
};

export type AnswerSlideData = SlideBase & {
  kind: "answer";
  body: string[];
};

export type SlideData =
  | TitleSlideData
  | TextSlideData
  | QuizSlideData
  | AnswerSlideData;
