import type { SlideData } from "./types";

export const bSlides = {
  cover: {
    id: "b-cover",
    kind: "title",
    title: "ディセプティブパターンの理解",
    subtitle: "欧州委員会の類型化に基づく「受動的な誤解を招く省略」の学習",
  } satisfies SlideData,

  focus: {
    id: "b-focus",
    kind: "text",
    title: "今回扱う範囲",
    body: [
      "今回は、情報の非対称性に関する設計の中でも、受動的な誤解を招く省略に注目します。",
    ],
  } satisfies SlideData,

  definition: {
    id: "b-definition",
    kind: "text",
    title: "受動的な誤解を招く省略",
    body: [
      "消費者が取引の決定を行うために必要な情報を、「省略する」「隠す」「不明瞭に提供する」「曖昧に提供する」、あるいは「適切なタイミングで提供しない」こと。",
    ],
  } satisfies SlideData,

  hiddenInfo: {
    id: "b-hidden-info",
    kind: "text",
    title: "情報の隠蔽",
    body: [
      "情報の非対称性を維持するために、情報を物理的または視覚的に「アクセス困難な場所」に置く手法。",
      "「情報は提供した」という形式的な事実を作りつつ、実質的には消費者に気づかせないことを目的とします。",
    ],
  } satisfies SlideData,

  hiddenInfoExamples: {
    id: "b-hidden-info-examples",
    kind: "text",
    title: "典型的なパターン",
    body: ["規約の奥底への埋め込み", "視覚的干渉", "など"],
  } satisfies SlideData,

  quiz1: {
    id: "b-quiz-1",
    kind: "quiz",
    title: "デモ",
    prompt: "次のうち、もっとも重要な条件が見つけにくいUIはどれですか？",
    options: [
      { id: "A", label: "UI A" },
      { id: "B", label: "UI B" },
      { id: "C", label: "UI C" },
    ],
    correctOptionId: "B",
    quizUiType: "hidden_info",
  } satisfies SlideData,

  answer1: {
    id: "b-answer-1",
    kind: "answer",
    title: "回答提示",
    body: [
      "正解は B。",
      "理由：重要な条件が長文の仕様・補足の中に埋め込まれており、スクロールしなければ見つけにくい配置になっているためです。",
    ],
  } satisfies SlideData,

  delayedInfo: {
    id: "b-delayed-info",
    kind: "text",
    title: "提示の遅れ",
    body: [
      "重要な情報を最初から提示せず、消費者が取引を後戻りしにくい段階になってから初めて明らかにする手法。",
      "最終的なコストや条件を段階的に露出することで、判断を歪めやすくします。",
    ],
  } satisfies SlideData,

  delayedInfoExamples: {
    id: "b-delayed-info-examples",
    kind: "text",
    title: "典型的なパターン",
    body: ["段階的な価格提示", "情報の逐次露出", "など"],
  } satisfies SlideData,

  quiz2: {
    id: "b-quiz-2",
    kind: "quiz",
    title: "デモ",
    prompt: "次のうち、購入判断に必要な料金情報が適切なタイミングで確認しにくいUIはどれですか？",
    options: [
      { id: "A", label: "UI A" },
      { id: "B", label: "UI B" },
      { id: "C", label: "UI C" },
    ],
    correctOptionId: "C",
    quizUiType: "delayed_info",
  } satisfies SlideData,

  answer2: {
    id: "b-answer-2",
    kind: "answer",
    title: "回答提示",
    body: [
      "正解は C。",
      "理由：商品価格だけが先に見えており、送料を含む内訳は『注文内容の詳細を見る』を開かないと確認できないため、重要な料金情報の提示が遅れています。",
    ],
  } satisfies SlideData,

  organize: {
    id: "b-organize",
    kind: "text",
    title: "情報の整理",
    body: [
      "情報の隠蔽：重要な情報を見つけにくい場所や形で提示する。",
      "提示の遅れ：重要な情報を、後戻りしにくい段階になってから提示する。",
      "どちらも、消費者が十分な情報を持たないまま判断する状況を作り出す点が共通している。",
    ],
  } satisfies SlideData,

  end: {
    id: "b-end",
    kind: "text",
    title: "重要な視点",
    body: [
      "個別の例だけを覚えるのではなく、いつ・どこで・どのように重要な情報が見えにくくされているのか、という構造で捉えることが重要です。",
    ],
  } satisfies SlideData,
};
