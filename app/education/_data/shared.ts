import type { SlideData } from "./types";

export const sharedSlides: {
  dpWhat: SlideData;
  infoAsymmetry: SlideData;
  summary: SlideData;
} = {
  dpWhat: {
    id: "shared-dp-what",
    kind: "text",
    title: "Deceptive Patternsとは",
    body: [
      "Deceptive Patternsとはデジタル・インターフェースにおける慣行であり、消費者を誘導、欺瞞、強制、あるいは操作し、ばしば消費者の最善の利益に反する選択をさせるものである。",
      "— 欧州委員会（2022年行動調査報告書より）",
      "単なる使いにくさではなく、提供者側の利益のためにユーザを欺く設計を指します。",
    ],
  },

  infoAsymmetry: {
    id: "shared-info-asymmetry",
    kind: "text",
    title: "情報の非対称性とは",
    body: [
      "事業者が持つ情報の優位性を利用し、消費者が本来なら行わないような選択をさせる操作。",
      "— 欧州委員会（2022年行動調査報告書より）",
      "事業者はインターフェースを操作することで、重要な情報を隠したり、解釈を難しくしたりして、知の格差を意図的に広げます。",
    ],
  },

  summary: {
    id: "shared-summary",
    kind: "text",
    title: "まとめ",
    body: [
      "ここまで、具体的な例も取り上げながら説明してきたが、それ以外にも多くのパターンが存在する。",
      "実世界では、複数のDPが組み合わさることで、さらに判断を誤らせやすくなる。",
      "そのため、提供者側はUIを通して消費者を騙しに来ているかもしれない、という視点を持つことが重要である。",
    ],
  },
};
