export type Trial2Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  dpDisplay?: { label: string } | null;
  imageSrc: string;
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

export type Trial2Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial2Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial2Data: Trial2Data = {
  purchaseConditions: {
    budgetYen: 1200,
    quantityCondition: "2m以上であること",
    specificCondition: "カテゴリ6以上であること",
  },
  products: [
    {
      id: "p1",
      role: "dp_candidate",
      failReason: null,
      name: "LANケーブル LX-214",
      priceYen: 920,
      description:
        "幅広い接続機器に対応した扱いやすいLANケーブルです。自宅や研究室での通常利用に適しています。",
      specsAndNotes: ["長さ：2m", "カテゴリ：Cat6", "形状：スタンダードタイプ"],
      prePurchaseCheck: [
        "接続機器や設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: {
        label: "現在23人がこの商品を見ています",
      },
      imageSrc: "/images/products/lan-cable.png",
    },
    {
      id: "p2",
      role: "budget_over",
      failReason: "budget",
      name: "LANケーブル NX-380",
      priceYen: 1380,
      description:
        "断線しにくい太めの被覆を採用したLANケーブルです。家庭用からオフィス利用まで幅広く使えます。",
      specsAndNotes: [
        "長さ：3m",
        "カテゴリ：Cat6A",
        "形状：スタンダードタイプ",
      ],
      prePurchaseCheck: [
        "接続機器や設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
      imageSrc: "/images/products/lan-cable.png",
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "LANケーブル PX-126",
      priceYen: 790,
      description:
        "家庭で使いやすい標準的なLANケーブルです。PCやルーターの接続に適しています。",
      specsAndNotes: ["長さ：2m", "カテゴリ：Cat6", "形状：スタンダードタイプ"],
      prePurchaseCheck: [
        "接続機器や設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
      imageSrc: "/images/products/lan-cable.png",
    },
    {
      id: "p4",
      role: "condition_ng",
      failReason: null,
      name: "LANケーブル RX-452",
      priceYen: 1080,
      description:
        "薄型で取り回しやすいフラットタイプのLANケーブルです。家具のすき間や壁沿いの配線に向いています。",
      specsAndNotes: ["長さ：2m", "カテゴリ：Cat6", "形状：フラットタイプ"],
      prePurchaseCheck: [
        "接続機器や設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
      imageSrc: "/images/products/lan-cable.png",
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
      priceYen: 300,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "当日便",
      priceYen: 600,
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
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial2Data.products.find((product) => product.id === productId) ??
    trial2Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial2Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial2Data.options.filter((option) => optionIds.includes(option.id));
}
