export type Trial1_3Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  imageSrc: string;
  dpDisplay?: null;
};

export type ShippingMethod = {
  id: string;
  name: string;
  priceYen: number;
  shortDescription: string;
};

export type AddonOption = {
  id: string;
  name: string;
  priceYen: number;
  shortDescription: string;
};

export type Trial1_3Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial1_3Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial1_3Data: Trial1_3Data = {
  purchaseConditions: {
    budgetYen: 1200,
    quantityCondition: "芯径0.5mmであること",
    specificCondition: "消しゴム付きであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "シャーペン LX-214",
      priceYen: 1380,
      description:
        "長時間の筆記にも使いやすい、しっかりとした握り心地のシャーペンです。",
      specsAndNotes: [
        "芯径：0.5mm",
        "消しゴム：あり",
        "グリップ：ラバーグリップ",
      ],
      prePurchaseCheck: [
        "芯径や付属機能を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/ballpoint-pen.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "シャーペン NX-380",
      priceYen: 680,
      description:
        "軽量で持ち運びやすいシャーペンです。日常的な筆記に適しています。",
      specsAndNotes: [
        "芯径：0.5mm",
        "消しゴム：なし",
        "グリップ：樹脂グリップ",
      ],
      prePurchaseCheck: [
        "消しゴムが付いているかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/ballpoint-pen.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "シャーペン PX-126",
      priceYen: 780,
      description:
        "必要な機能を備えた標準的なシャーペンです。条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "芯径：0.5mm",
        "消しゴム：あり",
        "グリップ：樹脂グリップ",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/ballpoint-pen.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "dp_candidate",
      failReason: null,
      name: "シャーペン RX-452",
      priceYen: 980,
      description:
        "安定した書き心地を重視したシャーペンです。条件を満たす中ではやや高めの商品です。",
      specsAndNotes: [
        "芯径：0.5mm",
        "消しゴム：あり",
        "グリップ：ラバーグリップ",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/ballpoint-pen.svg",
      dpDisplay: null,
    },
  ],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 200,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 500,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "当日便",
      priceYen: 800,
      shortDescription: "本日中のお届けが可能です",
    },
  ],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 300,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 200,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial1_3Data.products.find((product) => product.id === productId) ??
    trial1_3Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_3Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_3Data.options.filter((option) => optionIds.includes(option.id));
}