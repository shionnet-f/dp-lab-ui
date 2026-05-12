export type Trial1_3Product = {
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
    budgetYen: 4000,
    quantityCondition: "10000mAh以上であること",
    specificCondition: "USB-Cで充電できること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "モバイルバッテリー レギュラー",
      priceYen: 4380,
      description: "外出先で使いやすいモバイルバッテリーです。",
      specsAndNotes: [
        "容量：12000mAh",
        "充電端子：USB-C",
        "出力：急速充電対応",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/mobile-battery.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "モバイルバッテリー 通常タイプ",
      priceYen: 2910,
      description: "日常使いしやすいモバイルバッテリーです。",
      specsAndNotes: [
        "容量：10000mAh",
        "充電端子：Micro USB",
        "出力：標準充電",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/mobile-battery.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "モバイルバッテリー ベーシック",
      priceYen: 3120,
      description: "持ち運びしやすいモバイルバッテリーです。",
      specsAndNotes: [
        "容量：10000mAh",
        "充電端子：USB-C",
        "出力：標準充電",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/mobile-battery.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "モバイルバッテリー シンプル",
      priceYen: 3380,
      description: "充電用に備えやすいモバイルバッテリーです。",
      specsAndNotes: [
        "容量：12000mAh",
        "充電端子：USB-C",
        "出力：標準充電",
      ],
      prePurchaseCheck: [
        "使用場面に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/mobile-battery.png",
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
      priceYen: 1000,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 900,
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
