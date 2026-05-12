export type practice1_3Product = {
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
  dpDisplay?: { label: string } | null;
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
export type practice1_3Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: practice1_3Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const practice1_3Data: practice1_3Data = {
  purchaseConditions: {
    budgetYen: 4000,
    quantityCondition: "タンク容量が2L以上であること",
    specificCondition: "自動停止機能があること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "加湿器 3L 自動停止機能付き",
      priceYen: 4500,
      description: "3Lタンクで自動停止機能付きの加湿器です。",
      specsAndNotes: ["タンク容量：3L", "自動停止機能：あり"],
      prePurchaseCheck: ["タンク容量と機能を確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      imageSrc: "/images/products/humidifier.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "加湿器 2L シンプルモデル",
      priceYen: 2500,
      description: "2Lタンクのシンプルな加湿器です。",
      specsAndNotes: ["タンク容量：2L", "自動停止機能：なし"],
      prePurchaseCheck: ["自動停止機能があるか確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      imageSrc: "/images/products/humidifier.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "加湿器 2L 自動停止機能付き",
      priceYen: 3000,
      description: "2Lタンクで自動停止機能付きの加湿器です。",
      specsAndNotes: ["タンク容量：2L", "自動停止機能：あり"],
      prePurchaseCheck: ["条件に合う商品か確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      imageSrc: "/images/products/humidifier.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "dp_candidate",
      failReason: null,
      name: "加湿器 2.5L 自動停止機能付き",
      priceYen: 3600,
      description: "2.5Lタンクで自動停止機能付きの加湿器です。",
      specsAndNotes: ["タンク容量：2.5L", "自動停止機能：あり"],
      prePurchaseCheck: ["条件に合う商品か確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      imageSrc: "/images/products/humidifier.png",
      dpDisplay: null,
    },
  ],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 300,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 600,
      shortDescription: "最短で翌日にお届け",
    },
  ],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 300,
      shortDescription: "破損・紛失時の補償を追加します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    practice1_3Data.products.find((product) => product.id === productId) ??
    practice1_3Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    practice1_3Data.shippingMethods.find(
      (method) => method.id === shippingId,
    ) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return practice1_3Data.options.filter((option) =>
    optionIds.includes(option.id),
  );
}

export default practice1_3Data;
