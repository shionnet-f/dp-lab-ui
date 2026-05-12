export type Trial1_2Product = {
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

export type Trial1_2Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial1_2Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial1_2Data: Trial1_2Data = {
  purchaseConditions: {
    budgetYen: 1300,
    quantityCondition: "Mサイズで100枚以上入っていること",
    specificCondition: "冷凍保存に対応していること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "保存バッグ レギュラー",
      priceYen: 1380,
      description: "食品の保存に使いやすい保存バッグです。",
      specsAndNotes: [
        "サイズ：M",
        "枚数：120枚",
        "対応：冷凍保存対応",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/freezer-bag.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "保存バッグ 通常タイプ",
      priceYen: 780,
      description: "日常使いしやすい保存バッグです。",
      specsAndNotes: [
        "サイズ：M",
        "枚数：110枚",
        "対応：冷蔵保存向け",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/freezer-bag.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "保存バッグ ベーシック",
      priceYen: 880,
      description: "食品の小分けに使いやすい保存バッグです。",
      specsAndNotes: [
        "サイズ：M",
        "枚数：100枚",
        "対応：冷凍保存対応",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/freezer-bag.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "保存バッグ シンプル",
      priceYen: 980,
      description: "まとめて使いやすい保存バッグです。",
      specsAndNotes: [
        "サイズ：M",
        "枚数：120枚",
        "対応：冷凍保存対応",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/freezer-bag.svg",
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
      priceYen: 300,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 250,
      shortDescription: "プレゼント用に包装します",
    }
  ],
};

export function getProductById(productId?: string) {
  return (
    trial1_2Data.products.find((product) => product.id === productId) ??
    trial1_2Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_2Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_2Data.options.filter((option) => optionIds.includes(option.id));
}
