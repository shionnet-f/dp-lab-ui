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
  "purchaseConditions": {
    "budgetYen": 1000,
    "quantityCondition": "600ml×4個以上であること",
    "specificCondition": "電子レンジ対応であること"
  },
  "products": [
    {
      "id": "b1-t1-2-p1",
      "role": "budget_over",
      "failReason": "budget",
      "name": "耐熱タッパー 650ml×4個 プレミアム",
      "priceYen": 1180,
      "description": "レンジ対応の耐熱タッパー4個セットです。条件は満たしますが予算を超えています。",
      "specsAndNotes": [
        "容量：650ml×4個",
        "対応：電子レンジ対応",
        "材質：ポリプロピレン"
      ],
      "prePurchaseCheck": [
        "必要な容量・個数・対応可否を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      "deliveryInfo": [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ]
    },
    {
      "id": "b1-t1-2-p2",
      "role": "condition_ng",
      "failReason": "specific_condition",
      "name": "保存容器 700ml×4個 冷蔵用",
      "priceYen": 880,
      "description": "容量と個数は満たしますが、電子レンジには対応していない保存容器です。",
      "specsAndNotes": [
        "容量：700ml×4個",
        "対応：電子レンジ非対応",
        "材質：ポリプロピレン"
      ],
      "prePurchaseCheck": [
        "電子レンジ対応かどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      "deliveryInfo": [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ]
    },
    {
      "id": "b1-t1-2-p3",
      "role": "correct",
      "failReason": null,
      "name": "耐熱タッパー 600ml×4個セット",
      "priceYen": 920,
      "description": "電子レンジで使える耐熱タッパー4個セットです。条件を満たす中で最も安い商品です。",
      "specsAndNotes": [
        "容量：600ml×4個",
        "対応：電子レンジ対応",
        "材質：ポリプロピレン"
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
      "id": "b1-t1-2-p4",
      "role": "dp_candidate",
      "failReason": null,
      "name": "耐熱タッパー 650ml×4個セット",
      "priceYen": 980,
      "description": "電子レンジ対応の耐熱タッパーです。条件は満たしますが、正解商品より少し高い構成です。",
      "specsAndNotes": [
        "容量：650ml×4個",
        "対応：電子レンジ対応",
        "材質：ポリプロピレン"
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
  products: Trial1_2Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
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
