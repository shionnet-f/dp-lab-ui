
export type Trial6Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  dpDisplay?: { showCountdown: boolean } | null;
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

export const trial6Data = {
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "2.0kg以上であること",
    specificCondition: "無香料であること",
  },
  products: [
    {
      id: "a1-t6-p1",
      role: "budget_over",
      failReason: "budget",
      name: "大容量 洗濯洗剤 詰め替え 2.2kg",
      priceYen: 1680,
      description:
        "毎日の洗濯に使いやすい大容量タイプの洗濯洗剤です。詰め替え向けの定番商品です。",
      specsAndNotes: ["内容量：2.2kg", "香り：無香料", "タイプ：液体洗剤"],
      prePurchaseCheck: [
        "必要な容量と香りの有無を確認してから選択してください",
        "使用方法を確認したうえで購入してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { showCountdown: true },
    },
    {
      id: "a1-t6-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "洗濯洗剤 詰め替え 2.0kg フローラル",
      priceYen: 1180,
      description:
        "たっぷり使える詰め替え用の洗濯洗剤です。日常使いに向いた標準的なモデルです。",
      specsAndNotes: ["内容量：2.0kg", "香り：フローラル", "タイプ：液体洗剤"],
      prePurchaseCheck: [
        "無香料かどうかを確認してから選択してください",
        "使用方法を確認したうえで購入してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { showCountdown: true },
    },
    {
      id: "a1-t6-p3",
      role: "correct",
      failReason: null,
      name: "無香料 洗濯洗剤 詰め替え 2.0kg",
      priceYen: 1080,
      description:
        "無香料で使いやすい詰め替え用の洗濯洗剤です。容量条件を満たすベーシックなモデルです。",
      specsAndNotes: ["内容量：2.0kg", "香り：無香料", "タイプ：液体洗剤"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "使用方法を確認したうえで購入してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { showCountdown: true },
    },
    {
      id: "a1-t6-p4",
      role: "dp_candidate",
      failReason: null,
      name: "無香料 洗濯洗剤 濃縮タイプ 2.1kg",
      priceYen: 1260,
      description:
        "無香料で使いやすい濃縮タイプの洗濯洗剤です。条件を満たす中ではやや高めのモデルです。",
      specsAndNotes: ["内容量：2.1kg", "香り：無香料", "タイプ：濃縮液体洗剤"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "使用方法を確認したうえで購入してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
  ] satisfies Trial6Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 200, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 500, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "当日便", priceYen: 800, shortDescription: "本日中のお届けが可能です" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 300, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "gift", name: "ギフト包装", priceYen: 200, shortDescription: "プレゼント用に包装します" },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial6Data.products.find((product) => product.id === productId) ??
    trial6Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial6Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial6Data.options.filter((option) => optionIds.includes(option.id));
}
