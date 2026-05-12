export type practice1_2Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  dpDisplay?: null;
  imageSrc: string;
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

export type practice1_2Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: practice1_2Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const practice1_2Data: practice1_2Data = {
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "500枚以上であること",
    specificCondition: "A4サイズであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "コピー用紙 A4 1000枚",
      priceYen: 1800,
      description: "A4サイズのコピー用紙1000枚セットです。",
      specsAndNotes: ["サイズ：A4", "枚数：1000枚"],
      prePurchaseCheck: ["サイズと枚数を確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      dpDisplay: null,
      imageSrc: "/images/products/copy-paper.png",
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "コピー用紙 B5 500枚",
      priceYen: 700,
      description: "B5サイズのコピー用紙500枚セットです。",
      specsAndNotes: ["サイズ：B5", "枚数：500枚"],
      prePurchaseCheck: ["A4サイズか確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      dpDisplay: null,
      imageSrc: "/images/products/copy-paper.png",
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "コピー用紙 A4 500枚",
      priceYen: 1000,
      description: "A4サイズのコピー用紙500枚セットです。",
      specsAndNotes: ["サイズ：A4", "枚数：500枚"],
      prePurchaseCheck: ["条件に合う商品か確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      dpDisplay: null,
      imageSrc: "/images/products/copy-paper.png",
    },
    {
      id: "p4",
      role: "dp_candidate",
      failReason: null,
      name: "コピー用紙 A4 750枚",
      priceYen: 1300,
      description: "A4サイズのコピー用紙750枚セットです。",
      specsAndNotes: ["サイズ：A4", "枚数：750枚"],
      prePurchaseCheck: ["条件に合う商品か確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      dpDisplay: null,
      imageSrc: "/images/products/copy-paper.png",
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
    practice1_2Data.products.find((product) => product.id === productId) ??
    practice1_2Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    practice1_2Data.shippingMethods.find(
      (method) => method.id === shippingId,
    ) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return practice1_2Data.options.filter((option) =>
    optionIds.includes(option.id),
  );
}
