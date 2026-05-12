export type Trial8Product = {
  id: string;
  role:
  | "budget_over"
  | "condition_ng"
  | "correct"
  | "valid_but_expensive"
  | "dp_target";
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

export type Trial8Data = {
  trialId?: string;
  dpType?: string;
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial8Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial8Data: Trial8Data = {
  trialId: "b1-trial8",
  dpType: "商品名は購入条件に近く見えるが商品詳細を見ると実は条件とずれる",
  purchaseConditions: {
    budgetYen: 12000,
    quantityCondition: "256GB以上であること",
    specificCondition: "microSDカードであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "SDカード MC-512R",
      priceYen: 12800,
      description: "日常使いしやすいメモリーカードです。",
      specsAndNotes: [
        "容量：512GB",
        "種類：microSDカード",
        "速度規格：UHS-I",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/microsd-card.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "dp_target",
      failReason: "specific_condition",
      name: "SDカード MC-256N",
      priceYen: 9800,
      description: "扱いやすい標準的なメモリーカードです。",
      specsAndNotes: [
        "容量：256GB",
        "種類：SDカード",
        "速度規格：UHS-I",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/microsd-card.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "SDカード MC-256B",
      priceYen: 10800,
      description: "毎日の使用に適したメモリーカードです。",
      specsAndNotes: [
        "容量：256GB",
        "種類：microSDカード",
        "速度規格：UHS-I",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/microsd-card.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "SDカード MC-512S",
      priceYen: 11600,
      description: "幅広い場面で使いやすいメモリーカードです。",
      specsAndNotes: [
        "容量：512GB",
        "種類：microSDカード",
        "速度規格：UHS-I",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/microsd-card.svg",
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
      priceYen: 1200,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 1100,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial8Data.products.find((product) => product.id === productId) ??
    trial8Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial8Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial8Data.options.filter((option) => optionIds.includes(option.id));
}