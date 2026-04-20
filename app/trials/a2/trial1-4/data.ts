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
export const trial1_4Data = {
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "90日分以上であること",
    specificCondition: "マルチビタミンであること",
  },
  products: [
    {
      id: "a2-t1-4-p1",
      role: "budget_over",
      failReason: "budget",
      name: "マルチビタミン 120日分 プレミアム",
      priceYen: 1180,
      description: "120日分のマルチビタミンです。条件は満たしますが予算を超える商品です。",
      specsAndNotes: ["日数：120日分", "種類：マルチビタミン", "形状：粒タイプ"],
      prePurchaseCheck: ["予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-4-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "ビタミンC 90日分",
      priceYen: 540,
      description: "90日分ですが、マルチビタミンではなくビタミンC単体の商品です。",
      specsAndNotes: ["日数：90日分", "種類：ビタミンC", "形状：粒タイプ"],
      prePurchaseCheck: ["マルチビタミンであることか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-4-p3",
      role: "correct",
      failReason: null,
      name: "マルチビタミン 90日分 ベーシック",
      priceYen: 780,
      description: "条件を満たす中で最も安いマルチビタミンサプリです。",
      specsAndNotes: ["日数：90日分", "種類：マルチビタミン", "形状：粒タイプ"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-4-p4",
      role: "dp_candidate",
      failReason: null,
      name: "マルチビタミン 100日分 スタンダード",
      priceYen: 920,
      description: "条件は満たしますが、正解商品よりやや高いマルチビタミンサプリです。",
      specsAndNotes: ["日数：100日分", "種類：マルチビタミン", "形状：粒タイプ"],
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
  return trial1_4Data.products.find((product) => product.id === productId) ?? trial1_4Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial1_4Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_4Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial1_4Data;
