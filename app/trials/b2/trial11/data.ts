
export type Trial11Product = {
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

export const trial11Data = {
  purchaseConditions: {
    budgetYen: 2000,
    quantityCondition: "A5サイズであること",
    specificCondition: "マンスリー形式であること",
  },
  products: [
    {
      id: "b2-t11-p1",
      role: "budget_over",
      failReason: "budget",
      name: "A5 マンスリー手帳 プレミアムカバー",
      priceYen: 2280,
      description: "A5サイズ・マンスリー形式の手帳です。購入条件は満たしますが、予算を超える商品です。",
      specsAndNotes: ["サイズ：A5", "中面：マンスリー", "カバー：合皮カバー付き"],
      prePurchaseCheck: ["予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t11-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "A5 ウィークリー手帳 ベーシック",
      priceYen: 1180,
      description: "A5サイズの手帳ですが、マンスリー形式ではなくウィークリー形式です。",
      specsAndNotes: ["サイズ：A5", "中面：ウィークリー", "仕様：しおり付き"],
      prePurchaseCheck: ["マンスリー形式であることを確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t11-p3",
      role: "correct",
      failReason: null,
      name: "A5 マンスリー手帳 シンプル",
      priceYen: 1320,
      description: "条件を満たす中で最も安いA5サイズ・マンスリー形式の手帳です。",
      specsAndNotes: ["サイズ：A5", "中面：マンスリー", "仕様：薄型・シンプルデザイン"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t11-p4",
      role: "dp_candidate",
      failReason: null,
      name: "A5 月間手帳 ナチュラル",
      priceYen: 1560,
      description: "条件を満たしますが、正解商品よりやや高いA5サイズの月間手帳です。",
      specsAndNotes: ["サイズ：A5", "中面：マンスリー", "仕様：ペンホルダー・透明カバー付き"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
  ] satisfies Trial11Product[],
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
  return trial11Data.products.find((product) => product.id === productId) ?? trial11Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial11Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial11Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial11Data;
