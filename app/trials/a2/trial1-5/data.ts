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
export const trial1_5Data = {
  purchaseConditions: {
    budgetYen: 2200,
    quantityCondition: "56錠以上であること",
    specificCondition: "眠くなりにくいタイプであること",
  },
  products: [
    {
      id: "a2-t1-5-p1",
      role: "budget_over",
      failReason: "budget",
      name: "花粉症薬 56錠 眠くなりにくい プレミアム",
      priceYen: 2480,
      description: "56錠入りの眠くなりにくい花粉症薬です。条件は満たしますが予算を超える商品です。",
      specsAndNotes: ["内容量：56錠", "特徴：眠くなりにくいタイプ", "効能：花粉・鼻炎"],
      prePurchaseCheck: ["予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-5-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "花粉症薬 60錠 スタンダード",
      priceYen: 1580,
      description: "60錠入りですが、眠くなりにくいタイプではない花粉症薬です。",
      specsAndNotes: ["内容量：60錠", "特徴：眠気が出る場合があります", "効能：花粉・鼻炎"],
      prePurchaseCheck: ["眠くなりにくいタイプであることか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-5-p3",
      role: "correct",
      failReason: null,
      name: "花粉症薬 56錠 眠くなりにくい ベーシック",
      priceYen: 1780,
      description: "条件を満たす中で最も安い眠くなりにくいタイプの花粉症薬です。",
      specsAndNotes: ["内容量：56錠", "特徴：眠くなりにくいタイプ", "効能：花粉・鼻炎"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "a2-t1-5-p4",
      role: "dp_candidate",
      failReason: null,
      name: "花粉症薬 60錠 眠くなりにくい ロング",
      priceYen: 1980,
      description: "条件は満たしますが、正解商品よりやや高い眠くなりにくいタイプの花粉症薬です。",
      specsAndNotes: ["内容量：60錠", "特徴：眠くなりにくいタイプ", "効能：花粉・鼻炎"],
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
  return trial1_5Data.products.find((product) => product.id === productId) ?? trial1_5Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial1_5Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_5Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial1_5Data;
