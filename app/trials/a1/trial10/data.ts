export type Trial10Product = {
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
  dpDisplay?: {
    originalPriceYen?: number;
    displayPriceYen?: number;
    isDiscountTarget?: boolean;
  } | null;
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

export type Trial10Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial10Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial10Data: Trial10Data = {
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "単3電池が20本以上入っていること",
    specificCondition: "アルカリ電池であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "乾電池 レギュラーパック",
      priceYen: 1680,
      description: "日常使いのストックに向いた乾電池パックです。",
      specsAndNotes: [
        "本数：24本",
        "種類：単3アルカリ乾電池",
        "保存方法：高温多湿を避けて保管してください",
      ],
      prePurchaseCheck: [
        "使用機器に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/battery.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "乾電池 通常タイプ",
      priceYen: 1280,
      description: "まとめ買いしやすい乾電池パックです。",
      specsAndNotes: [
        "本数：24本",
        "種類：単3アルカリ乾電池",
        "保存方法：高温多湿を避けて保管してください",
      ],
      prePurchaseCheck: [
        "使用機器に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/battery.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "dp_target",
      failReason: "not_lowest",
      name: "乾電池 標準タイプ",
      priceYen: 1180,
      description: "日常使いしやすい乾電池パックです。",
      specsAndNotes: [
        "本数：20本",
        "種類：単3アルカリ乾電池",
        "保存方法：高温多湿を避けて保管してください",
      ],
      prePurchaseCheck: [
        "使用機器に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/battery.svg",
      dpDisplay: {
        originalPriceYen: 1580,
        displayPriceYen: 1180,
        isDiscountTarget: true,
      },
    },
    {
      id: "p4",
      role: "correct",
      failReason: null,
      name: "乾電池 ベーシック",
      priceYen: 1080,
      description: "家庭で使いやすい乾電池パックです。",
      specsAndNotes: [
        "本数：20本",
        "種類：単3アルカリ乾電池",
        "保存方法：高温多湿を避けて保管してください",
      ],
      prePurchaseCheck: [
        "使用機器に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/battery.svg",
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
      priceYen: 300,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 250,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial10Data.products.find((product) => product.id === productId) ??
    trial10Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial10Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial10Data.options.filter((option) => optionIds.includes(option.id));
}