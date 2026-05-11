export type Trial5Product = {
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

export type Trial5Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial5Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial5Data: Trial5Data = {
  purchaseConditions: {
    budgetYen: 2000,
    quantityCondition: "合計10箱以上であること",
    specificCondition: "200組タイプであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "ボックスティッシュ レギュラー",
      priceYen: 2180,
      description: "まとめ買い向けのティッシュセットです。",
      specsAndNotes: [
        "内容量：200組 × 12箱",
        "セット数：12箱",
        "タイプ：ボックスティッシュ",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/tissue.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "ボックスティッシュ 通常タイプ",
      priceYen: 1780,
      description: "日常使いしやすいティッシュセットです。",
      specsAndNotes: [
        "内容量：200組 × 10箱",
        "セット数：10箱",
        "タイプ：ボックスティッシュ",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/tissue.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "ボックスティッシュ ベーシック",
      priceYen: 1680,
      description: "毎日の使用に適したティッシュセットです。",
      specsAndNotes: [
        "内容量：200組 × 10箱",
        "セット数：10箱",
        "タイプ：ボックスティッシュ",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/tissue.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "dp_target",
      failReason: "not_lowest",
      name: "ボックスティッシュ 標準タイプ",
      priceYen: 1730,
      description: "使い勝手のよいティッシュセットです。",
      specsAndNotes: [
        "内容量：200組 × 10箱",
        "セット数：10箱",
        "タイプ：ボックスティッシュ",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/tissue.png",
      dpDisplay: {
        label: "タイムセール 残り9分",
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
      priceYen: 200,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial5Data.products.find((product) => product.id === productId) ??
    trial5Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial5Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial5Data.options.filter((option) => optionIds.includes(option.id));
}