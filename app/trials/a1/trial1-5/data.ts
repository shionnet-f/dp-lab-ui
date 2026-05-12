export type Trial1_5Product = {
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

export type Trial1_5Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial1_5Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial1_5Data: Trial1_5Data = {
  purchaseConditions: {
    budgetYen: 10000,
    quantityCondition: "1人用セットであること",
    specificCondition: "食品ではなく防災用品中心のセットであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "防災セット レギュラー",
      priceYen: 10800,
      description: "災害時に役立つ用品をまとめた防災セットです。",
      specsAndNotes: [
        "対象：1人用",
        "内容：防災用品中心",
        "点数：38点",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/emergency-kit.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "防災セット 通常タイプ",
      priceYen: 7620,
      description: "災害時の備えに使える防災セットです。",
      specsAndNotes: [
        "対象：1人用",
        "内容：食品中心",
        "点数：20点",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/emergency-kit.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "防災セット ベーシック",
      priceYen: 8150,
      description: "基本的な備えをまとめた防災セットです。",
      specsAndNotes: [
        "対象：1人用",
        "内容：防災用品中心",
        "点数：24点",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/emergency-kit.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "防災セット シンプル",
      priceYen: 9330,
      description: "防災用品をまとめて備えられるセットです。",
      specsAndNotes: [
        "対象：1人用",
        "内容：防災用品中心",
        "点数：30点",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/emergency-kit.png",
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
      priceYen: 2200,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 2000,
      shortDescription: "プレゼント用に包装します",
    }
  ],
};

export function getProductById(productId?: string) {
  return (
    trial1_5Data.products.find((product) => product.id === productId) ??
    trial1_5Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_5Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_5Data.options.filter((option) => optionIds.includes(option.id));
}
