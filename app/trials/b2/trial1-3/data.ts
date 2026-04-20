export type Trial13Product = {
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
    budgetYen: 1000,
    quantityCondition: "封筒10枚以上を含むこと",
    specificCondition: "便箋付きであること",
  },
  products: [
    {
      id: "b2-trial1-3-p1",
      role: "budget_over",
      failReason: "budget",
      name: "レターセット 封筒12枚 便箋24枚 プレミアム",
      priceYen: 1180,
      description: "封筒12枚と便箋24枚入りのレターセットです。条件は満たしますが予算を超えます。",
      specsAndNotes: ["封筒：12枚", "便箋：24枚", "セット内容：シール付き"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-trial1-3-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "メッセージカードセット 封筒10枚",
      priceYen: 620,
      description: "封筒は10枚ありますが、便箋が付いていない商品です。",
      specsAndNotes: ["封筒：10枚", "便箋：なし", "セット内容：カード10枚"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-trial1-3-p3",
      role: "correct",
      failReason: null,
      name: "レターセット 封筒10枚 便箋20枚 ベーシック",
      priceYen: 780,
      description: "条件を満たす中で最も安いレターセットです。",
      specsAndNotes: ["封筒：10枚", "便箋：20枚", "セット内容：無地デザイン"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-trial1-3-p4",
      role: "dp_candidate",
      failReason: null,
      name: "レターセット 封筒12枚 便箋16枚 フラワー",
      priceYen: 860,
      description: "条件は満たしますが、正解商品よりやや高いレターセットです。",
      specsAndNotes: ["封筒：12枚", "便箋：16枚", "セット内容：花柄デザイン"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
  ] satisfies Trial13Product[],
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