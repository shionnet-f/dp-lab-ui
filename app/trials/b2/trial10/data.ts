export type Trial10Product = {
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
export const trial10Data = {
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "200ml以上であること",
    specificCondition: "無香料であること",
  },
  products: [
    {
      id: "b2-t10-p1",
      role: "budget_over",
      failReason: "budget",
      name: "高保湿 化粧水 250ml 無香料 プレミアム",
      priceYen: 1680,
      description: "250mlの無香料化粧水です。購入条件は満たしますが、予算を超える商品です。",
      specsAndNotes: ["内容量：250ml", "香り：無香料", "タイプ：しっとり保湿"],
      prePurchaseCheck: ["予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t10-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "しっとり化粧水 230ml フローラル",
      priceYen: 980,
      description: "230mlの化粧水ですが、フローラルの香り付きで無香料ではありません。",
      specsAndNotes: ["内容量：230ml", "香り：フローラル", "タイプ：しっとり保湿"],
      prePurchaseCheck: ["無香料であることを確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t10-p3",
      role: "correct",
      failReason: null,
      name: "無香料 化粧水 200ml ベーシック",
      priceYen: 1180,
      description: "条件を満たす中で最も安い無香料の化粧水です。",
      specsAndNotes: ["内容量：200ml", "香り：無香料", "タイプ：さっぱり保湿"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t10-p4",
      role: "dp_candidate",
      failReason: null,
      name: "うるおい化粧水 220ml ナチュラル",
      priceYen: 1360,
      description: "購入条件に近く見える化粧水です。",
      specsAndNotes: ["毎日の保湿に使いやすい化粧水です。内容量は220mlでしっとりした使い心地ですが、やさしいシトラスの香り付きで無香料ではありません。ポンプ式ではなく通常キャップ式で、朝晩のスキンケア向けです。"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
  ] satisfies Trial10Product[],
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
  return trial10Data.products.find((product) => product.id === productId) ?? trial10Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial10Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial10Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial10Data;
