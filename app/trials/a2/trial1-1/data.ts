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
export const trial1_1Data = {
  purchaseConditions: {
    budgetYen: 800,
    quantityCondition: "1.2L以上であること",
    specificCondition: "泡タイプの詰め替え用であること",
  },
  products: [
    {
      id: "a2-t1-1-p1",
      role: "budget_over",
      failReason: "budget",
      name: "泡ハンドソープ 詰め替え 1500ml プレミアム",
      priceYen: 880,
      description: "1.5Lの泡タイプ詰め替え用ハンドソープです。条件は満たしますが予算を超える商品です。",
      specsAndNotes: ["内容量：1500ml", "タイプ：泡タイプ", "形状：詰め替え用"],
      prePurchaseCheck: ["予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-1-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "液体ハンドソープ 詰め替え 1400ml",
      priceYen: 620,
      description: "1.4Lの詰め替え用ハンドソープですが、泡タイプではない商品です。",
      specsAndNotes: ["内容量：1400ml", "タイプ：液体タイプ", "形状：詰め替え用"],
      prePurchaseCheck: ["泡タイプの詰め替え用であることか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-1-p3",
      role: "correct",
      failReason: null,
      name: "泡ハンドソープ 詰め替え 1200ml ベーシック",
      priceYen: 698,
      description: "条件を満たす中で最も安い泡タイプの詰め替え用ハンドソープです。",
      specsAndNotes: ["内容量：1200ml", "タイプ：泡タイプ", "形状：詰め替え用"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-1-p4",
      role: "dp_candidate",
      failReason: null,
      name: "泡ハンドソープ 詰め替え 1300ml しっとり",
      priceYen: 760,
      description: "条件は満たしますが、正解商品よりやや高い泡タイプの詰め替え用ハンドソープです。",
      specsAndNotes: ["内容量：1300ml", "タイプ：泡タイプ", "形状：詰め替え用"],
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
  return trial1_1Data.products.find((product) => product.id === productId) ?? trial1_1Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial1_1Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_1Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial1_1Data;
