export type Trial4Product = {
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

export type Trial4Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial4Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const SHIPPING_PRICE_TABLE: Record<string, Record<string, number>> = {
  p1: {
    standard: 200,
    express: 500,
    scheduled: 800,
  },
  p2: {
    standard: 500,
    express: 800,
    scheduled: 1100,
  },
  p3: {
    standard: 200,
    express: 500,
    scheduled: 800,
  },
  p4: {
    standard: 200,
    express: 500,
    scheduled: 800,
  },
};

export const trial4Data: Trial4Data = {
  purchaseConditions: {
    budgetYen: 2000,
    quantityCondition: "A4サイズで10冊以上であること",
    specificCondition: "横罫であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "ノート レギュラー",
      priceYen: 2280,
      description: "学習や作業に使いやすいノートです。",
      specsAndNotes: [
        "サイズ：A4",
        "罫線：横罫",
        "入数：10冊",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/notebook.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "dp_target",
      failReason: "not_lowest",
      name: "ノート 標準タイプ",
      priceYen: 1280,
      description: "まとめて使いやすいノートです。",
      specsAndNotes: [
        "サイズ：A4",
        "罫線：横罫",
        "入数：12冊",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/notebook.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "ノート ベーシック",
      priceYen: 1380,
      description: "日常使いしやすいノートです。",
      specsAndNotes: [
        "サイズ：A4",
        "罫線：横罫",
        "入数：10冊",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/notebook.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "ノート シンプル",
      priceYen: 1680,
      description: "幅広い用途で使いやすいノートです。",
      specsAndNotes: [
        "サイズ：A4",
        "罫線：横罫",
        "入数：10冊",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/notebook.svg",
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
    trial4Data.products.find((product) => product.id === productId) ??
    trial4Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial4Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getShippingPrice(productId?: string, shippingId?: string) {
  if (!productId || !shippingId) return 0;

  return (
    SHIPPING_PRICE_TABLE[productId]?.[shippingId] ??
    getShippingById(shippingId)?.priceYen ??
    0
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial4Data.options.filter((option) => optionIds.includes(option.id));
}