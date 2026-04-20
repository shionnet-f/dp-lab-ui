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
export const trial1_3Data = {
  purchaseConditions: {
    budgetYen: 1200,
    quantityCondition: "90枚×5冊以上であること",
    specificCondition: "50mm×50mmサイズであること",
  },
  products: [
    {
      id: "a2-t1-3-p1",
      role: "budget_over",
      failReason: "budget",
      name: "50×50mm 90枚×8冊 付箋 プレミアム",
      priceYen: 1380,
      description: "50×50mmで90枚×8冊の付箋です。条件は満たしますが予算を超える商品です。",
      specsAndNotes: ["サイズ：50mm×50mm", "枚数：90枚×8冊", "罫線：なし"],
      prePurchaseCheck: ["予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-3-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "75×75mm 90枚×5冊 付箋",
      priceYen: 780,
      description: "90枚×5冊ですが、50×50mmではない付箋です。",
      specsAndNotes: ["サイズ：75mm×75mm", "枚数：90枚×5冊", "罫線：なし"],
      prePurchaseCheck: ["50mm×50mmサイズであることか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-3-p3",
      role: "correct",
      failReason: null,
      name: "50×50mm 90枚×5冊 付箋 ベーシック",
      priceYen: 648,
      description: "条件を満たす中で最も安い50×50mmサイズの付箋です。",
      specsAndNotes: ["サイズ：50mm×50mm", "枚数：90枚×5冊", "罫線：なし"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-3-p4",
      role: "dp_candidate",
      failReason: null,
      name: "50×50mm 100枚×5冊 付箋 カラー",
      priceYen: 790,
      description: "条件は満たしますが、正解商品よりやや高い50×50mmサイズの付箋です。",
      specsAndNotes: ["サイズ：50mm×50mm", "枚数：100枚×5冊", "罫線：なし"],
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
  return trial1_3Data.products.find((product) => product.id === productId) ?? trial1_3Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial1_3Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_3Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial1_3Data;
