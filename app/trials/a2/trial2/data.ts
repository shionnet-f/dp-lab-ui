export type Trial2Product = {
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
export const trial2Data = {
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "2m以上であること",
    specificCondition: "4K対応であること",
  },
  products: [
    {
      id: "a2-t2-p1",
      role: "budget_over",
      failReason: "budget",
      name: "HDMIケーブル 3m 4K対応 高耐久モデル",
      priceYen: 1180,
      description: "3mで4K対応のHDMIケーブルです。条件は満たしますが予算を超える商品です。",
      specsAndNotes: [
        "長さ：3m", "対応：4K", "端子：HDMI Type-A"
      ],
      prePurchaseCheck: [
        "予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t2-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "HDMIケーブル 2m フルHD対応",
      priceYen: 680,
      description: "2mの商品ですが、4Kには対応していないHDMIケーブルです。",
      specsAndNotes: [
        "長さ：2m", "対応：フルHD", "端子：HDMI Type-A"
      ],
      prePurchaseCheck: [
        "4K対応かどうかを確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t2-p3",
      role: "correct",
      failReason: null,
      name: "HDMIケーブル 2m 4K対応 ベーシック",
      priceYen: 780,
      description: "条件を満たす中で最も安いHDMIケーブルです。",
      specsAndNotes: [
        "長さ：2m", "対応：4K", "端子：HDMI Type-A"
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t2-p4",
      role: "dp_candidate",
      failReason: null,
      name: "HDMIケーブル 2.5m 4K対応 人気モデル",
      priceYen: 920,
      description: "条件を満たすHDMIケーブルです。正解商品より高めですが、閲覧中の人数が表示されています。",
      specsAndNotes: [
        "長さ：2.5m", "対応：4K", "端子：HDMI Type-A"
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"
      ],
      dpDisplay: { label: "現在 23人が見ています" },
    },
  ] satisfies Trial2Product[],
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
  return trial2Data.products.find((product) => product.id === productId) ?? trial2Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial2Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial2Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial2Data;
