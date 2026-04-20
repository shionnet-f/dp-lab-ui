export type Trial1_2Product = {
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

export const trial1_2Data = {
  purchaseConditions: {
  "budgetYen": 1300,
  "quantityCondition": "Mサイズで100枚以上入っていること",
  "specificCondition": "冷凍保存に対応していること"
},
  products: [
  {
    "id": "a1-t1-2-p1",
    "role": "budget_over",
    "failReason": "budget",
    "name": "フリーザーバッグ Mサイズ 120枚 プレミアム",
    "priceYen": 1380,
    "description": "冷凍保存にも使える便利な保存バッグです。大容量のプレミアムパックです。",
    "specsAndNotes": [
      "サイズ：M",
      "枚数：120枚",
      "対応：冷凍保存対応"
    ],
    "prePurchaseCheck": [
      "必要なサイズと枚数を確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-2-p2",
    "role": "condition_ng",
    "failReason": "specific_condition",
    "name": "保存バッグ Mサイズ 110枚 キッチン用",
    "priceYen": 980,
    "description": "日常使いしやすい保存バッグです。枚数条件は満たしますが冷凍保存には対応していません。",
    "specsAndNotes": [
      "サイズ：M",
      "枚数：110枚",
      "対応：冷蔵保存向け"
    ],
    "prePurchaseCheck": [
      "冷凍保存に対応しているかを確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-2-p3",
    "role": "correct",
    "failReason": null,
    "name": "フリーザーバッグ Mサイズ 100枚 ベーシック",
    "priceYen": 880,
    "description": "冷凍保存に対応した使いやすいフリーザーバッグです。条件を満たす中で最も安い商品です。",
    "specsAndNotes": [
      "サイズ：M",
      "枚数：100枚",
      "対応：冷凍保存対応"
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
    "id": "a1-t1-2-p4",
    "role": "dp_candidate",
    "failReason": null,
    "name": "フリーザーバッグ Mサイズ 120枚 ダブルジッパー",
    "priceYen": 1080,
    "description": "冷凍保存に対応した保存バッグです。条件を満たす中ではやや高めの商品です。",
    "specsAndNotes": [
      "サイズ：M",
      "枚数：120枚",
      "対応：冷凍保存対応"
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
] satisfies Trial1_2Product[],
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
    trial1_2Data.products.find((product) => product.id === productId) ??
    trial1_2Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_2Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_2Data.options.filter((option) => optionIds.includes(option.id));
}
