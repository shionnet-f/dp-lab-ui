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
  "purchaseConditions": {
    "budgetYen": 700,
    "quantityCondition": "400ml×2本以上であること",
    "specificCondition": "浴室用であること"
  },
  "products": [
    {
      "id": "b1-t1-1-p1",
      "role": "budget_over",
      "failReason": "budget",
      "name": "浴室用カビ取り剤 450ml×2本 プレミアム",
      "priceYen": 780,
      "description": "浴室のカビやぬめり対策に使える大容量の浴室用カビ取り剤です。条件は満たしますが予算を超えています。",
      "specsAndNotes": [
        "内容量：450ml×2本",
        "用途：浴室用",
        "タイプ：スプレー式"
      ],
      "prePurchaseCheck": [
        "必要な容量と用途を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      "deliveryInfo": [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ]
    },
    {
      "id": "b1-t1-1-p2",
      "role": "condition_ng",
      "failReason": "specific_condition",
      "name": "カビ取り剤 500ml×2本 多目的用",
      "priceYen": 620,
      "description": "大容量で使いやすいカビ取り剤ですが、浴室専用ではなく多目的用途の商品です。",
      "specsAndNotes": [
        "内容量：500ml×2本",
        "用途：キッチン・洗面所などの多目的用",
        "タイプ：スプレー式"
      ],
      "prePurchaseCheck": [
        "浴室用であることを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      "deliveryInfo": [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ]
    },
    {
      "id": "b1-t1-1-p3",
      "role": "correct",
      "failReason": null,
      "name": "浴室用カビ取り剤 400ml×2本",
      "priceYen": 640,
      "description": "浴室掃除向けの定番カビ取り剤です。必要な容量と用途を満たす中で最も安い商品です。",
      "specsAndNotes": [
        "内容量：400ml×2本",
        "用途：浴室用",
        "タイプ：スプレー式"
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
      "id": "b1-t1-1-p4",
      "role": "dp_candidate",
      "failReason": null,
      "name": "浴室用カビ取り剤 420ml×2本 しっかり洗浄",
      "priceYen": 690,
      "description": "浴室のカビ対策に使える浴室用カビ取り剤です。条件は満たしますが、正解商品より少し高い商品です。",
      "specsAndNotes": [
        "内容量：420ml×2本",
        "用途：浴室用",
        "タイプ：スプレー式"
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
  ],
  "shippingMethods": [
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
  ],
  "options": [
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
  ]
} satisfies {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial1_1Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
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
