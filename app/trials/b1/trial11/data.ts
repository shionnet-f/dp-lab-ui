export type Trial11Product = {
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
    budgetYen: 1000,
    quantityCondition: "1点であること",
    specificCondition: "1枚1か月表示で、A3相当の大きさであること",
  },
  products: [
    {
      id: "p1",
      role: "dp_target",
      failReason: "specific_condition",
      name: "壁かけカレンダー レギュラー",
      priceYen: 620,
      description: "予定管理に使いやすい壁かけカレンダーです。",
      specsAndNotes: [
        "サイズ：A3相当",
        "点数：1点",
        "表示：1枚につき2か月分",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/calendar.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "budget_over",
      failReason: "budget",
      name: "壁かけカレンダー スタンダード",
      priceYen: 1180,
      description: "書き込みしやすい壁かけカレンダーです。",
      specsAndNotes: [
        "サイズ：A3相当",
        "点数：1点",
        "表示：1枚につき1か月分",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/calendar.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "壁かけカレンダー ベーシック",
      priceYen: 680,
      description: "日常の予定管理に使いやすいカレンダーです。",
      specsAndNotes: [
        "サイズ：A3相当",
        "点数：1点",
        "表示：1枚につき1か月分",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/calendar.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "壁かけカレンダー シンプル",
      priceYen: 780,
      description: "すっきりしたレイアウトのカレンダーです。",
      specsAndNotes: [
        "サイズ：A3相当",
        "点数：1点",
        "表示：1枚につき1か月分",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/calendar.svg",
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
      priceYen: 180,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 150,
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