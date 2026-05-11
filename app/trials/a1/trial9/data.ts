export type Trial9Product = {
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
    specLead?: string;
    boldPackText?: string;
    specTail?: string;
    isDpTarget?: boolean;
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

export type Trial9Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial9Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial9Data: Trial9Data = {
  purchaseConditions: {
    budgetYen: 1400,
    quantityCondition: "24本入りであること",
    specificCondition: "1本あたり500ml以上であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "天然水 レギュラー",
      priceYen: 1280,
      description: "毎日の飲用に使いやすい天然水です。",
      specsAndNotes: [
        "販売単位：1ケース",
        "保存方法：高温・直射日光を避けて保存してください",
        "内容量：500ml×24本",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/water.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "天然水 通常タイプ",
      priceYen: 1080,
      description: "自宅用のストックに使いやすい天然水です。",
      specsAndNotes: [
        "販売単位：1ケース",
        "保存方法：高温・直射日光を避けて保存してください",
        "内容量：500ml×24本",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/water.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "天然水 ベーシック",
      priceYen: 980,
      description: "日常使いしやすい天然水です。",
      specsAndNotes: [
        "販売単位：1ケース",
        "保存方法：高温・直射日光を避けて保存してください",
        "内容量：500ml×24本",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/water.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "dp_target",
      failReason: "quantity_condition",
      name: "天然水 標準タイプ",
      priceYen: 1020,
      description: "すっきり飲みやすい天然水です。",
      specsAndNotes: [
        "販売単位：1ケース",
        "保存方法：高温・直射日光を避けて保存してください",
        "内容量：350ml×24本",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/water.png",
      dpDisplay: {
        specLead: "ケース販売の商品です。内容量の表記を確認してください。",
        boldPackText: "500ml相当の使いやすさ",
        specTail: "実際の内容量は350ml×12本です。",
        isDpTarget: true,
      },
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
    trial9Data.products.find((product) => product.id === productId) ??
    trial9Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial9Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial9Data.options.filter((option) => optionIds.includes(option.id));
}