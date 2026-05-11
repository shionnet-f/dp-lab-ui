export type Trial1_1Product = {
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

export type Trial1_1Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial1_1Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial1_1Data: Trial1_1Data = {
  purchaseConditions: {
    budgetYen: 1200,
    quantityCondition: "1200ml以上であること",
    specificCondition: "詰め替え用であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "柔軟剤 レギュラー",
      priceYen: 1280,
      description: "毎日の洗濯に使いやすい柔軟剤です。",
      specsAndNotes: [
        "内容量：1400ml",
        "形態：詰め替え用",
        "香り：シトラス",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "柔軟剤 通常タイプ",
      priceYen: 880,
      description: "日常使いしやすい柔軟剤です。",
      specsAndNotes: [
        "内容量：1200ml",
        "形態：詰め替え用",
        "香り：フローラル",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "柔軟剤 ベーシック",
      priceYen: 920,
      description: "家庭で使いやすい柔軟剤です。",
      specsAndNotes: [
        "内容量：1200ml",
        "形態：詰め替え用",
        "香り：フローラル",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "柔軟剤 シンプル",
      priceYen: 980,
      description: "扱いやすい容量の柔軟剤です。",
      specsAndNotes: [
        "内容量：1300ml",
        "形態：詰め替え用",
        "香り：フローラル",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
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
      priceYen: 200,
      shortDescription: "プレゼント用に包装します",
    }
  ],
};

export function getProductById(productId?: string) {
  return (
    trial1_1Data.products.find((product) => product.id === productId) ??
    trial1_1Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_1Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_1Data.options.filter((option) => optionIds.includes(option.id));
}
