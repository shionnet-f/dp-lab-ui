export type practice1_4Product = {
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
export type practice1_4Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: practice1_4Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const practice1_4Data: practice1_4Data = {
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "4個以上セットであること",
    specificCondition: "無香料であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "無香料石鹸 6個セット",
      priceYen: 1200,
      description: "無香料タイプの石鹸6個セットです。",
      specsAndNotes: ["個数：6個", "香り：無香料"],
      prePurchaseCheck: ["個数と香りを確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      imageSrc: "/images/products/soap.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "石鹸 4個セット フローラルの香り",
      priceYen: 500,
      description: "フローラルの香り付き石鹸4個セットです。",
      specsAndNotes: ["個数：4個", "香り：フローラル"],
      prePurchaseCheck: ["無香料か確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      imageSrc: "/images/products/soap.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "無香料石鹸 4個セット",
      priceYen: 700,
      description: "無香料タイプの石鹸4個セットです。",
      specsAndNotes: ["個数：4個", "香り：無香料"],
      prePurchaseCheck: ["条件に合う商品か確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      imageSrc: "/images/products/soap.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "dp_candidate",
      failReason: null,
      name: "無香料石鹸 5個セット",
      priceYen: 900,
      description: "無香料タイプの石鹸5個セットです。",
      specsAndNotes: ["個数：5個", "香り：無香料"],
      prePurchaseCheck: ["条件に合う商品か確認してください"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます"],
      imageSrc: "/images/products/soap.png",
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
    practice1_4Data.products.find((product) => product.id === productId) ??
    practice1_4Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    practice1_4Data.shippingMethods.find(
      (method) => method.id === shippingId,
    ) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return practice1_4Data.options.filter((option) =>
    optionIds.includes(option.id),
  );
}

export default practice1_4Data;
