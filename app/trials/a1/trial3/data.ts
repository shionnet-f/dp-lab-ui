export type Trial3Product = {
  id: string;
  role: "budget_over" | "correct" | "valid_but_expensive" | "dp_target";
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
  dpDisplay?: { rating: number; reviewCount: number } | null;
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

export type Trial3Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial3Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial3Data: Trial3Data = {
  purchaseConditions: {
    budgetYen: 30000,
    quantityCondition: "容量が120L以上であること",
    specificCondition: "冷凍室が付いていること",
  },
  products: [
    {
      id: "p1",
      role: "dp_target",
      failReason: "not_lowest",
      name: "2ドア冷蔵庫 LX-214",
      priceYen: 27980,
      description: "毎日の食品保存に使いやすい2ドア冷蔵庫です。",
      specsAndNotes: [
        "台数：1台",
        "容量：124L",
        "冷凍室：あり",
      ],
      prePurchaseCheck: [
        "設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/refrigerator.svg",
      dpDisplay: {
        rating: 4.8,
        reviewCount: 328,
      },
    },
    {
      id: "p2",
      role: "budget_over",
      failReason: "budget",
      name: "2ドア冷蔵庫 NX-380",
      priceYen: 32800,
      description: "まとめ買いした食品も保存しやすい冷蔵庫です。",
      specsAndNotes: [
        "台数：1台",
        "容量：140L",
        "冷凍室：あり",
      ],
      prePurchaseCheck: [
        "設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/refrigerator.svg",
      dpDisplay: {
        rating: 3.9,
        reviewCount: 31,
      },
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "2ドア冷蔵庫 PX-126",
      priceYen: 26800,
      description: "日常使いに適した標準的な2ドア冷蔵庫です。",
      specsAndNotes: [
        "台数：1台",
        "容量：121L",
        "冷凍室：あり",
      ],
      prePurchaseCheck: [
        "設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/refrigerator.svg",
      dpDisplay: {
        rating: 4.1,
        reviewCount: 52,
      },
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "2ドア冷蔵庫 RX-452",
      priceYen: 28980,
      description: "省スペースで設置しやすい2ドア冷蔵庫です。",
      specsAndNotes: [
        "台数：1台",
        "容量：130L",
        "冷凍室：あり",
      ],
      prePurchaseCheck: [
        "設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/refrigerator.svg",
      dpDisplay: {
        rating: 4.3,
        reviewCount: 74,
      },
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
      priceYen: 4000,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 3500,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial3Data.products.find((product) => product.id === productId) ??
    trial3Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial3Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial3Data.options.filter((option) => optionIds.includes(option.id));
}