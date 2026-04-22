import type { SlideData } from "./types";

export const aSlides = {
  cover: {
    id: "a-cover",
    kind: "title",
    title: "ディセプティブパターンの理解",
    subtitle: "欧州委員会の類型化に基づく「積極的な誤解を招く行為」の学習",
  } satisfies SlideData,

  focus: {
    id: "a-focus",
    kind: "text",
    title: "今回扱う範囲",
    body: [
      "今回は、情報の非対称性に関する設計の中でも、積極的な誤解を招く行為に注目します。",
    ],
  } satisfies SlideData,

  definition: {
    id: "a-definition",
    kind: "text",
    title: "積極的な誤解を招く行為",
    body: [
      "事実ではない、あるいは事実であっても提示方法によって消費者を欺く（deceive）情報の発信。",
    ],
  } satisfies SlideData,

  misleadingInfo: {
    id: "a-misleading-info",
    kind: "text",
    title: "誤解を招く情報",
    body: [
      "提示される『情報の内容そのもの』が真実ではない、あるいは事実を歪曲しているケース。",
    ],
  } satisfies SlideData,

  misleadingInfoExamples: {
    id: "a-misleading-info-examples",
    kind: "text",
    title: "典型的なパターン",
    body: ["（偽の）カウントダウンタイマー", "（偽の）社会的証明", "など"],
  } satisfies SlideData,

  quiz1: {
    id: "a-quiz-1",
    kind: "quiz",
    title: "デモ",
    prompt: "次のうち、もっとも問題のあるUIはどれですか？",
    options: [
      { id: "A", label: "UI A" },
      { id: "B", label: "UI B" },
      { id: "C", label: "UI C" },
    ],
    correctOptionId: "B",
    quizUiType: "countdown",
  } satisfies SlideData,

  answer1: {
    id: "a-answer-1",
    kind: "answer",
    title: "回答提示",
    body: [
      "正解は B。",
      "理由：表示されている情報の内容自体が事実と異なる、または誤認を招くためです。",
    ],
  } satisfies SlideData,

  misleadingExpression: {
    id: "a-misleading-expression",
    kind: "text",
    title: "誤解を招く表現",
    body: [
      "情報は形式上は提示されているものの、その『提示の仕方やデザイン』によって消費者の認識を誤らせるケース。",
    ],
  } satisfies SlideData,

  misleadingExpressionExamples: {
    id: "a-misleading-expression-examples",
    kind: "text",
    title: "典型的なパターン",
    body: ["ひっかけ問題", "視覚的干渉", "など"],
  } satisfies SlideData,

  quiz2: {
    id: "a-quiz-2",
    kind: "quiz",
    title: "デモ",
    prompt: "次のうち、もっとも判断を誤らせやすいUIはどれですか？",
    options: [
      { id: "A", label: "UI A" },
      { id: "B", label: "UI B" },
      { id: "C", label: "UI C" },
    ],
    correctOptionId: "C",
    quizUiType: "price_interference",
  } satisfies SlideData,

  answer2: {
    id: "a-answer-2",
    kind: "answer",
    title: "回答提示",
    body: [
      "正解は C。",
      "理由：元値に打消し線を引き、矢印と赤字で割引後価格だけを強く目立たせることで、価格のお得感を過度に印象づけ、判断を誤らせやすいためです。",
    ],
  } satisfies SlideData,

  organize: {
    id: "a-organize",
    kind: "text",
    title: "情報の整理",
    body: [
      "誤解を招く情報：内容そのものに問題がある。",
      "誤解を招く表現：見せ方や配置に問題がある。",
      "どちらも、消費者の判断を意図的に歪める点が共通している。",
    ],
  } satisfies SlideData,

  end: {
    id: "a-end",
    kind: "text",
    title: "重要な視点",
    body: [
      "個別の例だけを覚えるのではなく、なぜそのUIが判断を歪めるのか、という構造で捉えることが重要です。",
    ],
  } satisfies SlideData,
};
