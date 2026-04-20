export type Trial1_3Product = {
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

export const trial1_3Data = {
  "purchaseConditions": {
    "budgetYen": 2200,
    "quantityCondition": "3本以上であること",
    "specificCondition": "0.5mm芯対応であること"
  },
  "products": [
    {
      "id": "b1-t1-3-p1",
      "role": "budget_over",
      "failReason": "budget",
      "name": "高機能シャープペン 0.5mm 3本セット",
      "priceYen": 2480,
      "description": "筆記しやすい高機能シャープペン3本セットです。条件は満たしますが予算を超えています。",
      "specsAndNotes": [
        "本数：3本",
        "芯径：0.5mm",
        "用途：筆記用"
      ],
      "prePurchaseCheck": [
        "必要な本数と芯径を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      "deliveryInfo": [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ]
    },
    {
      "id": "b1-t1-3-p2",
      "role": "condition_ng",
      "failReason": "specific_condition",
      "name": "シャープペン 0.7mm 3本セット",
      "priceYen": 1680,
      "description": "3本セットですが、芯径が0.7mmのため条件を満たしません。",
      "specsAndNotes": [
        "本数：3本",
        "芯径：0.7mm",
        "用途：筆記用"
      ],
      "prePurchaseCheck": [
        "0.5mm芯対応かどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      "deliveryInfo": [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ]
    },
    {
      "id": "b1-t1-3-p3",
      "role": "correct",
      "failReason": null,
      "name": "シャープペン 0.5mm 3本セット",
      "priceYen": 1780,
      "description": "0.5mm芯対応のシャープペン3本セットです。条件を満たす中で最も安い商品です。",
      "specsAndNotes": [
        "本数：3本",
        "芯径：0.5mm",
        "用途：筆記用"
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
      "id": "b1-t1-3-p4",
      "role": "dp_candidate",
      "failReason": null,
      "name": "シャープペン 0.5mm 4本セット",
      "priceYen": 1980,
      "description": "0.5mm芯対応のシャープペンセットです。条件は満たしますが、正解商品より少し高い構成です。",
      "specsAndNotes": [
        "本数：4本",
        "芯径：0.5mm",
        "用途：筆記用"
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
  products: Trial1_3Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export function getProductById(productId?: string) {
  return (
    trial1_3Data.products.find((product) => product.id === productId) ??
    trial1_3Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_3Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_3Data.options.filter((option) => optionIds.includes(option.id));
}
