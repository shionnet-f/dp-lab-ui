export type Trial1_1Product = {
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

export const trial1_1Data = {
  purchaseConditions: {
  "budgetYen": 1200,
  "quantityCondition": "1200ml以上であること",
  "specificCondition": "詰め替え用であること"
},
  products: [
  {
    "id": "a1-t1-1-p1",
    "role": "budget_over",
    "failReason": "budget",
    "name": "柔軟剤 詰め替え 1400ml プレミアム",
    "priceYen": 1280,
    "description": "大容量で使いやすい詰め替え用柔軟剤です。まとめ買い向けのプレミアム商品です。",
    "specsAndNotes": [
      "内容量：1400ml",
      "形態：詰め替え用",
      "香り：フローラル"
    ],
    "prePurchaseCheck": [
      "必要な容量と形態を確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-1-p2",
    "role": "condition_ng",
    "failReason": "specific_condition",
    "name": "柔軟剤 本体ボトル 1200ml",
    "priceYen": 980,
    "description": "毎日の洗濯に使いやすい柔軟剤です。容量は満たしますが詰め替え用ではありません。",
    "specsAndNotes": [
      "内容量：1200ml",
      "形態：本体ボトル",
      "香り：フローラル"
    ],
    "prePurchaseCheck": [
      "詰め替え用かどうかを確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-1-p3",
    "role": "correct",
    "failReason": null,
    "name": "柔軟剤 詰め替え 1200ml ベーシック",
    "priceYen": 920,
    "description": "使いやすい詰め替え用柔軟剤です。条件を満たす中で最も安い商品です。",
    "specsAndNotes": [
      "内容量：1200ml",
      "形態：詰め替え用",
      "香り：シトラス"
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
    "id": "a1-t1-1-p4",
    "role": "dp_candidate",
    "failReason": null,
    "name": "柔軟剤 詰め替え 1300ml しっとりタイプ",
    "priceYen": 1080,
    "description": "詰め替え用の大容量柔軟剤です。条件を満たす中ではやや高めの商品です。",
    "specsAndNotes": [
      "内容量：1300ml",
      "形態：詰め替え用",
      "香り：ホワイトフローラル"
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
] satisfies Trial1_1Product[],
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
    trial1_1Data.products.find((product) => product.id === productId) ??
    trial1_1Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_1Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_1Data.options.filter((option) => optionIds.includes(option.id));
}
