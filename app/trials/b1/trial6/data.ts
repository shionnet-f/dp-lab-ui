export type Trial6Product = {
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
  dpDisplay?: { subscriptionPriceYen: number } | null;
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

export type Trial6Data = {
  trialId?: string;
  dpType?: string;
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial6Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial6Data: Trial6Data = {
  trialId: "b1-trial6",
  dpType: "仕様・補足のスクロール領域内にサブスク価格であることを埋め込む",
  purchaseConditions: {
    budgetYen: 2000,
    quantityCondition: "3本以上であること",
    specificCondition: "黒インクであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "ボールペン BP-740X",
      priceYen: 2280,
      description: "日常の筆記に使いやすいボールペンです。",
      specsAndNotes: [
        "本数：5本",
        "インク色：黒",
        "ペン先：0.7mm",
        "軸色：クリア",
        "用途：事務作業・学習向け",
        "保管方法：高温多湿を避けて保管してください",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/ballpoint-pen.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "ボールペン BP-520A",
      priceYen: 1580,
      description: "まとめて使いやすいボールペンです。",
      specsAndNotes: [
        "本数：4本",
        "インク色：青",
        "ペン先：0.5mm",
        "軸色：ホワイト",
        "用途：事務作業・学習向け",
        "保管方法：高温多湿を避けて保管してください",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/ballpoint-pen.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "dp_target",
      failReason: "not_lowest",
      name: "ボールペン BP-680R",
      priceYen: 1760,
      description: "書きやすいボールペンです。",
      specsAndNotes: [
        "本数：4本",
        "インク色：黒",
        "ペン先：0.5mm",
        "軸色：ブラック",
        "用途：事務作業・学習向け",
        "保管方法：高温多湿を避けて保管してください",
        "表示価格は定期お届けコースを利用した場合の価格です",
        "通常購入価格は1,760円です",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/ballpoint-pen.svg",
      dpDisplay: {
        subscriptionPriceYen: 1360,
      },
    },
    {
      id: "p4",
      role: "correct",
      failReason: null,
      name: "ボールペン BP-310B",
      priceYen: 1480,
      description: "学習や作業に使いやすいボールペンです。",
      specsAndNotes: [
        "本数：3本",
        "インク色：黒",
        "ペン先：0.5mm",
        "軸色：ネイビー",
        "用途：事務作業・学習向け",
        "保管方法：高温多湿を避けて保管してください",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/ballpoint-pen.svg",
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

export function getProductById(productId?: string) {
  return (
    trial6Data.products.find((product) => product.id === productId) ??
    trial6Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial6Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial6Data.options.filter((option) => optionIds.includes(option.id));
}