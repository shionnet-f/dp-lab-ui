export type Trial3Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  dpDisplay?: { label: string; subLabel?: string } | null;
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
export const trial3Data = {
  purchaseConditions: {
    budgetYen: 10000,
    quantityCondition: "1個であること",
    specificCondition: "Bluetooth接続対応であること",
  },
  products: [
    {
      id: "a2-t3-p1",
      role: "budget_over",
      failReason: "budget",
      name: "ワイヤレスイヤホン ノイズキャンセリング Pro",
      priceYen: 11400,
      description: "Bluetooth対応のワイヤレスイヤホンです。条件は満たしますが予算を超える商品です。",
      specsAndNotes: [
        "個数：1個", "接続：Bluetooth", "機能：ノイズキャンセリング"
      ],
      prePurchaseCheck: [
        "予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"
      ],
      dpDisplay: { label: "★4.7", subLabel: "(421)" },
    },
    {
      id: "a2-t3-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "完全ワイヤレスイヤホン 有線充電限定モデル",
      priceYen: 6480,
      description: "ワイヤレスイヤホンですが、Bluetooth接続には対応していない商品です。",
      specsAndNotes: [
        "個数：1個", "接続：専用無線", "機能：マイク付き"
      ],
      prePurchaseCheck: [
        "Bluetooth接続対応かどうかを確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"
      ],
      dpDisplay: { label: "★4.1", subLabel: "(88)" },
    },
    {
      id: "a2-t3-p3",
      role: "correct",
      failReason: null,
      name: "ワイヤレスイヤホン Bluetooth対応 ベーシック",
      priceYen: 7580,
      description: "条件を満たす中で最も安いワイヤレスイヤホンです。",
      specsAndNotes: [
        "個数：1個", "接続：Bluetooth", "機能：マイク付き"
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"
      ],
      dpDisplay: { label: "★3.9", subLabel: "(64)" },
    },
    {
      id: "a2-t3-p4",
      role: "dp_candidate",
      failReason: null,
      name: "ワイヤレスイヤホン Bluetooth対応 高評価モデル",
      priceYen: 8980,
      description: "条件を満たすワイヤレスイヤホンです。正解商品より高いですが、高評価レビューが表示されています。",
      specsAndNotes: [
        "個数：1個", "接続：Bluetooth", "機能：外音取り込み"
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"
      ],
      dpDisplay: { label: "★4.8", subLabel: "(512)" },
    },
  ] satisfies Trial3Product[],
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
  return trial3Data.products.find((product) => product.id === productId) ?? trial3Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial3Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial3Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial3Data;
