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
  purchaseConditions: {
  "budgetYen": 4000,
  "quantityCondition": "10000mAh以上であること",
  "specificCondition": "USB-Cで充電できること"
},
  products: [
  {
    "id": "a1-t1-3-p1",
    "role": "budget_over",
    "failReason": "budget",
    "name": "モバイルバッテリー 12000mAh 急速充電対応",
    "priceYen": 4380,
    "description": "外出先で使いやすい大容量モバイルバッテリーです。急速充電対応モデルです。",
    "specsAndNotes": [
      "容量：12000mAh",
      "充電端子：USB-C",
      "出力：急速充電対応"
    ],
    "prePurchaseCheck": [
      "必要な容量と充電端子を確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-3-p2",
    "role": "condition_ng",
    "failReason": "specific_condition",
    "name": "モバイルバッテリー 10000mAh Micro USB対応",
    "priceYen": 2680,
    "description": "日常使いしやすいモバイルバッテリーです。容量条件は満たしますがUSB-C充電ではありません。",
    "specsAndNotes": [
      "容量：10000mAh",
      "充電端子：Micro USB",
      "出力：標準充電"
    ],
    "prePurchaseCheck": [
      "USB-Cで充電できるかを確認してから選択してください",
      "購入手続き画面で配送方法や金額を最終確認できます"
    ],
    "deliveryInfo": [
      "配送方法は購入手続き画面で選択できます",
      "地域によりお届け日が異なる場合があります"
    ]
  },
  {
    "id": "a1-t1-3-p3",
    "role": "correct",
    "failReason": null,
    "name": "モバイルバッテリー 10000mAh USB-C ベーシック",
    "priceYen": 2980,
    "description": "必要十分な容量を備えたUSB-C充電対応のモバイルバッテリーです。条件を満たす中で最も安い商品です。",
    "specsAndNotes": [
      "容量：10000mAh",
      "充電端子：USB-C",
      "出力：標準充電"
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
    "id": "a1-t1-3-p4",
    "role": "dp_candidate",
    "failReason": null,
    "name": "モバイルバッテリー 12000mAh USB-C スリムモデル",
    "priceYen": 3380,
    "description": "持ち運びしやすいスリムタイプのモバイルバッテリーです。条件を満たす中ではやや高めの商品です。",
    "specsAndNotes": [
      "容量：12000mAh",
      "充電端子：USB-C",
      "出力：急速充電対応"
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
] satisfies Trial1_3Product[],
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
