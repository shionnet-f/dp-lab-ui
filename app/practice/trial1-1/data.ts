export type practice1_1Product = {
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

export type practice1_1Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: practice1_1Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const practice1_1Data: practice1_1Data = {
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "6本以上セットであること",
    specificCondition: "500ml以上であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "コーラ 500ml 8本セット",
      priceYen: 1200,
      description: "500mlのコーラ8本セットです。",
      specsAndNotes: ["内容量：500ml", "本数：8本"],
      prePurchaseCheck: ["本数と内容量を確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      dpDisplay: null,
      imageSrc: "/images/products/can.svg",
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "コーラ 350ml 6本セット",
      priceYen: 600,
      description: "350mlのコーラ6本セットです。",
      specsAndNotes: ["内容量：350ml", "本数：6本"],
      prePurchaseCheck: ["500ml以上か確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      dpDisplay: null,
      imageSrc: "/images/products/can.svg",
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "コーラ 500ml 6本セット",
      priceYen: 800,
      description: "500mlのコーラ6本セットです。",
      specsAndNotes: ["内容量：500ml", "本数：6本"],
      prePurchaseCheck: ["条件に合う商品か確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      dpDisplay: null,
      imageSrc: "/images/products/can.svg",
    },
    {
      id: "p4",
      role: "dp_candidate",
      failReason: null,
      name: "コーラ 500ml 7本セット",
      priceYen: 950,
      description: "500mlのコーラ7本セットです。",
      specsAndNotes: ["内容量：500ml", "本数：7本"],
      prePurchaseCheck: ["条件に合う商品か確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      dpDisplay: null,
      imageSrc: "/images/products/can.svg",
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
      id: "gift",
      name: "ギフト包装",
      priceYen: 200,
      shortDescription: "包装を追加します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    practice1_1Data.products.find((product) => product.id === productId) ??
    practice1_1Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    practice1_1Data.shippingMethods.find(
      (method) => method.id === shippingId,
    ) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return practice1_1Data.options.filter((option) =>
    optionIds.includes(option.id),
  );
}
