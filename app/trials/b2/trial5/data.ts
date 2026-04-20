export type Trial5Product = {
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

export const trial5Data = {
  purchaseConditions: {
    budgetYen: 3200,
    quantityCondition: "200ml×30本以上であること",
    specificCondition: "食塩無添加であること",
  },
  products: [
    {
      id: "b2-t5-p1",
      role: "budget_over",
      failReason: "budget",
      name: "野菜ジュース 200ml×30本 食塩無添加 プレミアム",
      priceYen: 3380,
      description:
        "200ml×30本で食塩無添加の野菜ジュースです。条件は満たしますが予算を超える商品です。",
      specsAndNotes: ["内容量：200ml×30本", "種類：野菜ジュース", "食塩：無添加"],
      prePurchaseCheck: [
        "予算内に収まるか確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b2-t5-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "野菜ジュース 200ml×30本 まろやかブレンド",
      priceYen: 2480,
      description:
        "200ml×30本の野菜ジュースですが、食塩無添加ではない商品です。",
      specsAndNotes: ["内容量：200ml×30本", "種類：野菜ジュース", "食塩：あり"],
      prePurchaseCheck: [
        "食塩無添加であることを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b2-t5-p3",
      role: "correct",
      failReason: null,
      name: "野菜ジュース 200ml×30本 食塩無添加 ベーシック",
      priceYen: 2680,
      description:
        "条件を満たす中で最も安い食塩無添加の野菜ジュースです。",
      specsAndNotes: ["内容量：200ml×30本", "種類：野菜ジュース", "食塩：無添加"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b2-t5-p4",
      role: "dp_candidate",
      failReason: null,
      name: "野菜ジュース 200ml×36本 食塩無添加 バランス",
      priceYen: 2980,
      description:
        "条件は満たしますが、正解商品よりやや高い食塩無添加の野菜ジュースです。",
      specsAndNotes: ["内容量：200ml×36本", "種類：野菜ジュース", "食塩：無添加"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
  ] satisfies Trial5Product[],
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
  return trial5Data.products.find((product) => product.id === productId) ?? trial5Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial5Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial5Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial5Data;
