export type Trial3Product = {
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

export type Trial3Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial3Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const SHIPPING_PRICE_TABLE: Record<
  string,
  Record<string, number>
> = {
  p1: {
    standard: 900,
    express: 1200,
    scheduled: 1500,
  },
  p2: {
    standard: 200,
    express: 500,
    scheduled: 800,
  },
  p3: {
    standard: 200,
    express: 500,
    scheduled: 800,
  },
  p4: {
    standard: 300,
    express: 600,
    scheduled: 900,
  },
};

export const trial3Data: Trial3Data = {
  purchaseConditions: {
    budgetYen: 8000,
    quantityCondition: "10kg以上であること",
    specificCondition: "白米であること",
  },
  products: [
    {
      id: "p1",
      role: "dp_target",
      failReason: "not_lowest",
      name: "米 レギュラー",
      priceYen: 6200,
      description: "家庭用に使いやすい米です。",
      specsAndNotes: [
        "内容量：10kg",
        "種類：白米",
        "精米時期：商品ラベルに記載",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送料金は最終確認画面で表示されます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/rice.png",
      dpDisplay: {
        label: "配送料金は最終確認で表示",
      },
    },
    {
      id: "p2",
      role: "budget_over",
      failReason: "budget",
      name: "米 スタンダード",
      priceYen: 8280,
      description: "まとめ買い向けの米です。",
      specsAndNotes: [
        "内容量：10kg",
        "種類：白米",
        "精米時期：商品ラベルに記載",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送料金は最終確認画面で表示されます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/rice.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "米 ベーシック",
      priceYen: 6480,
      description: "日常使いしやすい米です。",
      specsAndNotes: [
        "内容量：10kg",
        "種類：白米",
        "精米時期：商品ラベルに記載",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送料金は最終確認画面で表示されます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/rice.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "米 シンプル",
      priceYen: 7280,
      description: "保管しやすい米です。",
      specsAndNotes: [
        "内容量：10kg",
        "種類：白米",
        "精米時期：商品ラベルに記載",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送料金は最終確認画面で表示されます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/rice.png",
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
      priceYen: 1500,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 1400,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial3Data.products.find((product) => product.id === productId) ??
    trial3Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial3Data.shippingMethods.find((method) => method.id === shippingId) ??
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
  return trial3Data.options.filter((option) => optionIds.includes(option.id));
}