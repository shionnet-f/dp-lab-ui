export type Trial3Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  dpDisplay?: { rating: number; reviewCount: number } | null;
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

export const trial3Data = {
  purchaseConditions: {
    budgetYen: 30000,
    quantityCondition: "1台であること",
    specificCondition: "冷凍室が付いていること",
  },
  products: [
    {
      id: "a1-t3-p1",
      role: "budget_over",
      failReason: "budget",
      name: "2ドア冷蔵庫 大容量モデル",
      priceYen: 32800,
      description: "まとめ買いした食品の保管にも使いやすい2ドア冷蔵庫です。冷蔵室と冷凍室を分けて使えます。",
      specsAndNotes: ["台数：1台", "容量：140L", "冷凍室：あり"],
      prePurchaseCheck: [
        "予算内かを確認してから選択してください",
        "設置スペースと容量を確認してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t3-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "小型冷蔵庫 直冷式モデル",
      priceYen: 24800,
      description: "飲料や少量の食品保管に使いやすい小型冷蔵庫です。省スペース設置向けのモデルです。",
      specsAndNotes: ["台数：1台", "容量：90L", "冷凍室：なし"],
      prePurchaseCheck: [
        "冷凍室の有無を確認してから選択してください",
        "必要な容量を確認してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { rating: 4.7, reviewCount: 186 },
    },
    {
      id: "a1-t3-p3",
      role: "correct",
      failReason: null,
      name: "2ドア冷蔵庫 ベーシックモデル",
      priceYen: 26800,
      description: "日常使いに適した2ドア冷蔵庫です。必要十分な容量と冷凍室を備えた標準モデルです。",
      specsAndNotes: ["台数：1台", "容量：121L", "冷凍室：あり"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "設置スペースと容量を確認してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t3-p4",
      role: "dp_candidate",
      failReason: null,
      name: "2ドア冷蔵庫 人気モデル",
      priceYen: 27980,
      description: "毎日の使いやすさを意識した2ドア冷蔵庫です。冷蔵室と冷凍室を分けて収納できます。",
      specsAndNotes: ["台数：1台", "容量：124L", "冷凍室：あり"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "設置スペースと容量を確認してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { rating: 4.8, reviewCount: 328 },
    },
  ] satisfies Trial3Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 500, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 800, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "当日便", priceYen: 700, shortDescription: "受け取り日時を指定できます" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 300, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "gift", name: "ギフト包装", priceYen: 200, shortDescription: "プレゼント用に包装します" },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial3Data.products.find((product) => product.id === productId) ??
    trial3Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial3Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial3Data.options.filter((option) => optionIds.includes(option.id));
}
