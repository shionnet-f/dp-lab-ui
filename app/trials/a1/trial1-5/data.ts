export type Trial1_5Product = {
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

export const trial1_5Data = {
  purchaseConditions: {
  "budgetYen": 10000,
  "quantityCondition": "1人用セットであること",
  "specificCondition": "食品ではなく防災用品中心のセットであること"
},
  products: [
  {
    "id": "a1-t1-5-p1",
    "role": "budget_over",
    "failReason": "budget",
    "name": "防災セット 1人用 プレミアム 38点",
    "priceYen": 10800,
    "description": "災害時に役立つ防災用品をまとめた1人用セットです。高機能な用品を多く含みます。",
    "specsAndNotes": [
      "対象：1人用",
      "内容：防災用品中心",
      "点数：38点"
    ],
    "prePurchaseCheck": [
      "対象人数とセット内容を確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-5-p2",
    "role": "condition_ng",
    "failReason": "specific_condition",
    "name": "非常食中心 防災セット 1人用",
    "priceYen": 6980,
    "description": "非常食を中心に構成された1人用セットです。防災用品中心ではありません。",
    "specsAndNotes": [
      "対象：1人用",
      "内容：食品中心",
      "点数：20点"
    ],
    "prePurchaseCheck": [
      "食品中心ではなく防災用品中心かを確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-5-p3",
    "role": "correct",
    "failReason": null,
    "name": "防災セット 1人用 ベーシック 24点",
    "priceYen": 7980,
    "description": "防災用品を中心にまとめた1人用の基本セットです。条件を満たす中で最も安い商品です。",
    "specsAndNotes": [
      "対象：1人用",
      "内容：防災用品中心",
      "点数：24点"
    ],
    "prePurchaseCheck": [
      "条件に合う商品か確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-5-p4",
    "role": "dp_candidate",
    "failReason": null,
    "name": "防災セット 1人用 充実 30点",
    "priceYen": 8980,
    "description": "防災用品を中心にまとめた1人用セットです。条件を満たす中ではやや高めの商品です。",
    "specsAndNotes": [
      "対象：1人用",
      "内容：防災用品中心",
      "点数：30点"
    ],
    "prePurchaseCheck": [
      "条件に合う商品か確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  }
] satisfies Trial1_5Product[],
  shippingMethods: [
  {
    "id": "standard",
    "name": "通常配送",
    "priceYen": 200,
    "shortDescription": "3〜5日でお届け"
  },
  {
    "id": "express",
    "name": "お急ぎ便",
    "priceYen": 500,
    "shortDescription": "最短で翌日にお届け"
  },
  {
    "id": "scheduled",
    "name": "当日便",
    "priceYen": 800,
    "shortDescription": "本日中のお届けが可能です"
  }
] satisfies ShippingMethod[],
  options: [
  {
    "id": "insurance",
    "name": "配送補償オプション",
    "priceYen": 300,
    "shortDescription": "破損・紛失時の補償を追加します"
  },
  {
    "id": "gift",
    "name": "ギフト包装",
    "priceYen": 200,
    "shortDescription": "プレゼント用に包装します"
  }
] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial1_5Data.products.find((product) => product.id === productId) ??
    trial1_5Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_5Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_5Data.options.filter((option) => optionIds.includes(option.id));
}
