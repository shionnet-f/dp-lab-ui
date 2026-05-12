export type Trial11Product = {
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
  dpDisplay?: { showFreeShipping: boolean } | null;
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

export type Trial11Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial11Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial11Data: Trial11Data = {
  purchaseConditions: {
    budgetYen: 2500,
    quantityCondition: "500ml×2本以上であること",
    specificCondition: "ノンシリコンであること",
  },
  products: [
    {
      id: "p1",
      role: "dp_target",
      failReason: "not_lowest",
      name: "シャンプー スタンダードセット",
      priceYen: 2280,
      description: "毎日のヘアケアに使いやすいシャンプーセットです。",
      specsAndNotes: [
        "内容量：500ml×2本",
        "種類：ノンシリコンシャンプー",
        "香り：ホワイトフローラル",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "通常配送は無料です",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/shampoo.svg",
      dpDisplay: {
        showFreeShipping: true,
      },
    },
    {
      id: "p2",
      role: "budget_over",
      failReason: "budget",
      name: "シャンプー レギュラーセット",
      priceYen: 2680,
      description: "まとめ買い向けのシャンプーセットです。",
      specsAndNotes: [
        "内容量：500ml×2本",
        "種類：ノンシリコンシャンプー",
        "香り：フローラル",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "通常配送は無料です",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/shampoo.svg",
      dpDisplay: {
        showFreeShipping: false,
      },
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "シャンプー ベーシックセット",
      priceYen: 2080,
      description: "日常使いしやすいシャンプーセットです。",
      specsAndNotes: [
        "内容量：500ml×2本",
        "種類：ノンシリコンシャンプー",
        "香り：シトラス",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "通常配送は無料です",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/shampoo.svg",
      dpDisplay: {
        showFreeShipping: false,
      },
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "シャンプー シンプルセット",
      priceYen: 2380,
      description: "扱いやすい容量のシャンプーセットです。",
      specsAndNotes: [
        "内容量：500ml×2本",
        "種類：ノンシリコンシャンプー",
        "香り：グリーンフローラル",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "通常配送は無料です",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/shampoo.svg",
      dpDisplay: {
        showFreeShipping: false,
      },
    },
  ],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 0,
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
      priceYen: 600,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 500,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial11Data.products.find((product) => product.id === productId) ??
    trial11Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial11Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial11Data.options.filter((option) => optionIds.includes(option.id));
}