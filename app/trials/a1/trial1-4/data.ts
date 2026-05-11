export type Trial1_4Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "valid_but_expensive";
  failReason:
  | "budget"
  | "quantity_condition"
  | "specific_condition"
  | "not_lowest"
  | null;
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

export type Trial1_4Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial1_4Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial1_4Data: Trial1_4Data = {
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "60枚以上入っていること",
    specificCondition: "貼らないタイプであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "カイロ レギュラー",
      priceYen: 1680,
      description: "寒い日に使いやすいカイロセットです。",
      specsAndNotes: [
        "枚数：80枚",
        "タイプ：貼らない",
        "持続時間：12時間",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/hand-warmer.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "カイロ 通常タイプ",
      priceYen: 1020,
      description: "日常使いしやすいカイロセットです。",
      specsAndNotes: [
        "枚数：60枚",
        "タイプ：貼る",
        "持続時間：10時間",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/hand-warmer.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "カイロ ベーシック",
      priceYen: 1110,
      description: "寒い時期に備えやすいカイロセットです。",
      specsAndNotes: [
        "枚数：60枚",
        "タイプ：貼らない",
        "持続時間：10時間",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/hand-warmer.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "カイロ シンプル",
      priceYen: 1240,
      description: "まとめて使いやすいカイロセットです。",
      specsAndNotes: [
        "枚数：72枚",
        "タイプ：貼らない",
        "持続時間：14時間",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/hand-warmer.png",
      dpDisplay: null,
    }
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
      priceYen: 400,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 300,
      shortDescription: "プレゼント用に包装します",
    }
  ],
};

export function getProductById(productId?: string) {
  return (
    trial1_4Data.products.find((product) => product.id === productId) ??
    trial1_4Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_4Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_4Data.options.filter((option) => optionIds.includes(option.id));
}
