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
  "purchaseConditions": {
    "budgetYen": 700,
    "quantityCondition": "200ml以上であること",
    "specificCondition": "肌用であること"
  },
  "products": [
    {
      "id": "b1-t1-4-p1",
      "role": "budget_over",
      "failReason": "budget",
      "name": "肌用虫よけスプレー 250ml プレミアム",
      "priceYen": 780,
      "description": "肌に使える虫よけスプレーです。条件は満たしますが予算を超えています。",
      "specsAndNotes": [
        "内容量：250ml",
        "用途：肌用",
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
      "id": "b1-t1-4-p2",
      "role": "condition_ng",
      "failReason": "specific_condition",
      "name": "虫よけスプレー 220ml 衣類用",
      "priceYen": 560,
      "description": "容量は満たしますが、肌用ではなく衣類・空間向けの商品です。",
      "specsAndNotes": [
        "内容量：220ml",
        "用途：衣類・空間用",
        "タイプ：スプレー式"
      ],
      "prePurchaseCheck": [
        "肌用であることを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      "deliveryInfo": [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ]
    },
    {
      "id": "b1-t1-4-p3",
      "role": "correct",
      "failReason": null,
      "name": "肌用虫よけスプレー 200ml",
      "priceYen": 620,
      "description": "外出時に使いやすい肌用虫よけスプレーです。条件を満たす中で最も安い商品です。",
      "specsAndNotes": [
        "内容量：200ml",
        "用途：肌用",
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
      "id": "b1-t1-4-p4",
      "role": "dp_candidate",
      "failReason": null,
      "name": "肌用虫よけスプレー 230ml",
      "priceYen": 680,
      "description": "肌に使える虫よけスプレーです。条件は満たしますが、正解商品より少し高い商品です。",
      "specsAndNotes": [
        "内容量：230ml",
        "用途：肌用",
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
  products: Trial1_4Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
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
