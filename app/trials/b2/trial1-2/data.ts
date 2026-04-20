export type Trial12Product = {
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
    budgetYen: 2500,
    quantityCondition: "3m以上であること",
    specificCondition: "5口以上であること",
  },
  products: [
    {
      id: "b2-trial1-2-p1",
      role: "budget_over",
      failReason: "budget",
      name: "延長コード 3m 6口 プレミアム",
      priceYen: 2680,
      description: "3m・6口の延長コードです。条件は満たしますが予算を超えます。",
      specsAndNotes: ["長さ：3m", "差込口：6口", "スイッチ：個別スイッチなし"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-trial1-2-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "延長コード 3m 4口 スリム",
      priceYen: 1580,
      description: "3mですが、差込口が4口のため条件を満たしません。",
      specsAndNotes: ["長さ：3m", "差込口：4口", "スイッチ：一括スイッチ付き"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-trial1-2-p3",
      role: "correct",
      failReason: null,
      name: "延長コード 3m 5口 ベーシック",
      priceYen: 1780,
      description: "条件を満たす中で最も安い延長コードです。",
      specsAndNotes: ["長さ：3m", "差込口：5口", "スイッチ：一括スイッチ付き"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-trial1-2-p4",
      role: "dp_candidate",
      failReason: null,
      name: "延長コード 3m 6口 省スペース",
      priceYen: 1980,
      description: "条件は満たしますが、正解商品よりやや高い延長コードです。",
      specsAndNotes: ["長さ：3m", "差込口：6口", "スイッチ：一括スイッチ付き"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
  ] satisfies Trial12Product[],
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