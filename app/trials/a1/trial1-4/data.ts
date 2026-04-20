export type Trial1_4Product = {
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

export const trial1_4Data = {
  purchaseConditions: {
  "budgetYen": 1500,
  "quantityCondition": "60枚以上入っていること",
  "specificCondition": "貼らないタイプであること"
},
  products: [
  {
    "id": "a1-t1-4-p1",
    "role": "budget_over",
    "failReason": "budget",
    "name": "カイロ 貼らないタイプ 80枚 プレミアム",
    "priceYen": 1680,
    "description": "寒い日に使いやすい大容量のカイロです。貼らないタイプのまとめ買い向け商品です。",
    "specsAndNotes": [
      "枚数：80枚",
      "タイプ：貼らない",
      "持続時間：12時間"
    ],
    "prePurchaseCheck": [
      "必要な枚数とタイプを確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-4-p2",
    "role": "condition_ng",
    "failReason": "specific_condition",
    "name": "カイロ 貼るタイプ 60枚 レギュラー",
    "priceYen": 980,
    "description": "使いやすいカイロのセットです。枚数条件は満たしますが貼るタイプです。",
    "specsAndNotes": [
      "枚数：60枚",
      "タイプ：貼る",
      "持続時間：10時間"
    ],
    "prePurchaseCheck": [
      "貼らないタイプかどうかを確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-4-p3",
    "role": "correct",
    "failReason": null,
    "name": "カイロ 貼らないタイプ 60枚 ベーシック",
    "priceYen": 1080,
    "description": "日常使いしやすい貼らないタイプのカイロです。条件を満たす中で最も安い商品です。",
    "specsAndNotes": [
      "枚数：60枚",
      "タイプ：貼らない",
      "持続時間：10時間"
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
    "id": "a1-t1-4-p4",
    "role": "dp_candidate",
    "failReason": null,
    "name": "カイロ 貼らないタイプ 72枚 温感長持ち",
    "priceYen": 1240,
    "description": "長時間使いやすい貼らないタイプのカイロです。条件を満たす中ではやや高めの商品です。",
    "specsAndNotes": [
      "枚数：72枚",
      "タイプ：貼らない",
      "持続時間：14時間"
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
] satisfies Trial1_4Product[],
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
    trial1_4Data.products.find((product) => product.id === productId) ??
    trial1_4Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_4Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_4Data.options.filter((option) => optionIds.includes(option.id));
}
