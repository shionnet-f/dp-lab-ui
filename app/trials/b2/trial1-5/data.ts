export type Trial15Product = {
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
  purchaseConditions: {
    budgetYen: 2500,
    quantityCondition: "1本であること",
    specificCondition: "ジャンプ式であること",
  },
  products: [
    {
      id: "b2-trial1-5-p1",
      role: "budget_over",
      failReason: "budget",
      name: "長傘 1本 ジャンプ式 プレミアム",
      priceYen: 2780,
      description: "1本入りのジャンプ式長傘です。条件は満たしますが予算を超えます。",
      specsAndNotes: ["本数：1本", "開閉方式：ジャンプ式", "親骨長さ：65cm"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-trial1-5-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "長傘 1本 手開き ベーシック",
      priceYen: 1480,
      description: "1本入りですが、手開き式のため条件を満たしません。",
      specsAndNotes: ["本数：1本", "開閉方式：手開き", "親骨長さ：65cm"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-trial1-5-p3",
      role: "correct",
      failReason: null,
      name: "長傘 1本 ジャンプ式 ベーシック",
      priceYen: 1980,
      description: "条件を満たす中で最も安いジャンプ式の長傘です。",
      specsAndNotes: ["本数：1本", "開閉方式：ジャンプ式", "親骨長さ：65cm"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-trial1-5-p4",
      role: "dp_candidate",
      failReason: null,
      name: "長傘 1本 ジャンプ式 撥水",
      priceYen: 2280,
      description: "条件は満たしますが、正解商品よりやや高いジャンプ式の長傘です。",
      specsAndNotes: ["本数：1本", "開閉方式：ジャンプ式", "親骨長さ：65cm"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
  ] satisfies Trial15Product[],
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
  return trial1_5Data.products.find((product) => product.id === productId) ?? trial1_5Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial1_5Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_5Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial1_5Data;