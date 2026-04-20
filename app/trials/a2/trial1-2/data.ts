export type Trial1Product = {
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
    budgetYen: 1800,
    quantityCondition: "30Lで合計200枚以上であること",
    specificCondition: "半透明タイプであること",
  },
  products: [
    {
      id: "a2-t1-2-p1",
      role: "budget_over",
      failReason: "budget",
      name: "30L 半透明 ゴミ袋 100枚×3個セット",
      priceYen: 1980,
      description: "30Lで合計300枚の半透明ゴミ袋です。条件は満たしますが予算を超える商品です。",
      specsAndNotes: ["容量：30L", "枚数：100枚×3個", "タイプ：半透明"],
      prePurchaseCheck: ["予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-2-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "30L 透明 ゴミ袋 100枚×2個セット",
      priceYen: 1280,
      description: "30Lで合計200枚の商品ですが、半透明ではなく透明タイプです。",
      specsAndNotes: ["容量：30L", "枚数：100枚×2個", "タイプ：透明"],
      prePurchaseCheck: ["半透明タイプであることか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-2-p3",
      role: "correct",
      failReason: null,
      name: "30L 半透明 ゴミ袋 50枚×4個セット",
      priceYen: 1380,
      description: "条件を満たす中で最も安い半透明タイプのゴミ袋です。",
      specsAndNotes: ["容量：30L", "枚数：50枚×4個", "タイプ：半透明"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-2-p4",
      role: "dp_candidate",
      failReason: null,
      name: "30L 半透明 ゴミ袋 70枚×3個セット",
      priceYen: 1560,
      description: "条件は満たしますが、正解商品よりやや高い半透明タイプのゴミ袋です。",
      specsAndNotes: ["容量：30L", "枚数：70枚×3個", "タイプ：半透明"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
  ] satisfies Trial1Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 0, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 300, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "日時指定便", priceYen: 200, shortDescription: "受け取り日時を指定できます" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 150, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "gift", name: "ギフト包装", priceYen: 100, shortDescription: "プレゼント用に包装します" },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return trial1_2Data.products.find((product) => product.id === productId) ?? trial1_2Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial1_2Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_2Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial1_2Data;
