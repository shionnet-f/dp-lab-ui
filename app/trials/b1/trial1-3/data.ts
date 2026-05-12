export type Trial1_3Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "valid_but_expensive" | "dp_target";
  failReason: "budget" | "quantity_condition" | "specific_condition" | "not_lowest" | null;
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
    quantityCondition: "3本以上であること",
    specificCondition: "0.5mm芯であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "シャーペン レギュラー",
      priceYen: 1380,
      description: "日常使いしやすい商品です。",
      specsAndNotes: [
          "本数：5本",
          "芯径：0.5mm",
          "方式：ノック式"
        ],
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/ballpoint-pen.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "シャーペン 通常タイプ",
      priceYen: 680,
      description: "扱いやすい標準的な商品です。",
      specsAndNotes: [
          "本数：3本",
          "芯径：0.7mm",
          "方式：ノック式"
        ],
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/ballpoint-pen.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "シャーペン ベーシック",
      priceYen: 780,
      description: "毎日の使用に適した商品です。",
      specsAndNotes: [
          "本数：3本",
          "芯径：0.5mm",
          "方式：ノック式"
        ],
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/ballpoint-pen.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "シャーペン シンプル",
      priceYen: 980,
      description: "幅広い場面で使いやすい商品です。",
      specsAndNotes: [
          "本数：4本",
          "芯径：0.5mm",
          "方式：ノック式"
        ],
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/ballpoint-pen.svg",
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
    }
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
