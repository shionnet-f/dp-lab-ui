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
  "purchaseConditions": {
    "budgetYen": 12000,
    "quantityCondition": "256GB以上であること",
    "specificCondition": "microSDXC対応であること"
  },
  "products": [
    {
      "id": "b1-t1-5-p1",
      "role": "budget_over",
      "failReason": "budget",
      "name": "microSDXCカード 256GB 高速版",
      "priceYen": 12800,
      "description": "大容量のmicroSDXCカードです。条件は満たしますが予算を超えています。",
      "specsAndNotes": [
        "容量：256GB",
        "規格：microSDXC",
        "速度：UHS-I"
      ],
      "prePurchaseCheck": [
        "必要な容量と規格を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      "deliveryInfo": [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ]
    },
    {
      "id": "b1-t1-5-p2",
      "role": "condition_ng",
      "failReason": "specific_condition",
      "name": "microSDHCカード 256GB相当モデル",
      "priceYen": 9800,
      "description": "容量表記は条件に近いですが、規格がmicroSDXCではなく条件を満たしません。",
      "specsAndNotes": [
        "容量：256GB相当表記",
        "規格：microSDHC",
        "速度：Class 10"
      ],
      "prePurchaseCheck": [
        "microSDXC対応かどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      "deliveryInfo": [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ]
    },
    {
      "id": "b1-t1-5-p3",
      "role": "correct",
      "failReason": null,
      "name": "microSDXCカード 256GB",
      "priceYen": 10800,
      "description": "保存容量をしっかり確保できるmicroSDXCカードです。条件を満たす中で最も安い商品です。",
      "specsAndNotes": [
        "容量：256GB",
        "規格：microSDXC",
        "速度：UHS-I"
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
      "id": "b1-t1-5-p4",
      "role": "dp_candidate",
      "failReason": null,
      "name": "microSDXCカード 512GB",
      "priceYen": 11800,
      "description": "大容量のmicroSDXCカードです。条件は満たしますが、正解商品より少し高い商品です。",
      "specsAndNotes": [
        "容量：512GB",
        "規格：microSDXC",
        "速度：UHS-I"
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
  products: Trial1_5Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
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
