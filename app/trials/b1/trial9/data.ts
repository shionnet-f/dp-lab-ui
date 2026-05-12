export type Trial9Product = {
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

export type Trial9Data = {
  trialId?: string;
  dpType?: string;
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
  trialId: "b1-trial9",
  dpType:
    "商品一覧では本体価格のみ表示し、商品ごとに異なる送料は checkout / confirm で具体表示する",
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "100枚以上であること",
    specificCondition: "使い捨てタイプであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "不織布マスク XTC-01",
      priceYen: 1680,
      description: "日常使いしやすいマスクです。",
      specsAndNotes: [
        "枚数：120枚入り",
        "種類：不織布マスク",
        "形態：使い捨てタイプ",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "商品によっては送料が異なる場合があります",
      ],
      imageSrc: "/images/products/mask.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "不織布マスク T-0001",
      priceYen: 1040,
      description: "保管しやすいマスクです。",
      specsAndNotes: [
        "枚数：100枚入り",
        "種類：不織布マスク",
        "形態：使い捨てタイプ",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "商品によっては送料が異なる場合があります",
      ],
      imageSrc: "/images/products/mask.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "不織布マスク 586R2U",
      priceYen: 980,
      description: "毎日の使用に適したマスクです。",
      specsAndNotes: [
        "枚数：100枚入り",
        "種類：不織布マスク",
        "形態：使い捨てタイプ",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "商品によっては送料が異なる場合があります",
      ],
      imageSrc: "/images/products/mask.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "dp_target",
      failReason: "not_lowest",
      name: "不織布マスク E2I",
      priceYen: 860,
      description: "まとめ買いしやすいマスクです。",
      specsAndNotes: [
        "枚数：100枚入り",
        "種類：不織布マスク",
        "形態：使い捨てタイプ",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "商品によっては送料が異なる場合があります",
      ],
      imageSrc: "/images/products/mask.png",
      dpDisplay: null,
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
      priceYen: 0,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 0,
      shortDescription: "受け取り日時を指定できます",
    },
  ],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 400,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 350,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

const SHIPPING_PRICE_TABLE = {
  p1: {
    standard: 260,
    express: 560,
    scheduled: 420,
  },
  p2: {
    standard: 240,
    express: 540,
    scheduled: 400,
  },
  p3: {
    standard: 200,
    express: 500,
    scheduled: 800,
  },
  p4: {
    standard: 540,
    express: 840,
    scheduled: 700,
  },
} as const;

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

export function getShippingPrice(productId?: string, shippingId?: string) {
  if (!productId || !shippingId) return 0;

  const prices =
    SHIPPING_PRICE_TABLE[productId as keyof typeof SHIPPING_PRICE_TABLE] ??
    SHIPPING_PRICE_TABLE[
    trial9Data.products[0].id as keyof typeof SHIPPING_PRICE_TABLE
    ];

  return prices[shippingId as keyof typeof prices] ?? 0;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial9Data.options.filter((option) => optionIds.includes(option.id));
}