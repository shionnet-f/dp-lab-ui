
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
  dpDisplay?: {
    originalPriceYen?: number;
    displayPriceYen?: number;
    isDiscountTarget?: boolean;
  } | null;
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
    quantityCondition: "単3電池が20本以上入っていること",
    specificCondition: "アルカリ電池であること",
  },
  products: [
    {
      id: "a1-t10-p1",
      role: "budget_over",
      failReason: "budget",
      name: "アルカリ乾電池 単3 24本 プレミアムパック",
      priceYen: 1680,
      description:
        "防災用や日常使いのストックに向いた単3アルカリ乾電池の大容量パックです。",
      specsAndNotes: [
        "本数：24本",
        "種類：単3アルカリ乾電池",
        "保存方法：高温多湿を避けて保管してください",
      ],
      prePurchaseCheck: [
        "必要な本数と電池の種類を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t10-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "マンガン乾電池 単3 20本 お買い得パック",
      priceYen: 1180,
      description:
        "日常使い向けの単3乾電池パックです。本数は満たしますがアルカリではありません。",
      specsAndNotes: [
        "本数：20本",
        "種類：単3マンガン乾電池",
        "保存方法：高温多湿を避けて保管してください",
      ],
      prePurchaseCheck: [
        "アルカリ電池かどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: {
        originalPriceYen: 1480,
        displayPriceYen: 1180,
        isDiscountTarget: true,
      },
    },
    {
      id: "a1-t10-p3",
      role: "correct",
      failReason: null,
      name: "アルカリ乾電池 単3 20本 ベーシックパック",
      priceYen: 1280,
      description:
        "日常使いしやすい単3アルカリ乾電池の標準パックです。条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "本数：20本",
        "種類：単3アルカリ乾電池",
        "保存方法：高温多湿を避けて保管してください",
      ],
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
      id: "a1-t10-p4",
      role: "dp_candidate",
      failReason: null,
      name: "アルカリ乾電池 単3 24本 人気パック",
      priceYen: 1420,
      description:
        "まとめ買い向けの単3アルカリ乾電池パックです。条件を満たす中ではやや高めの商品です。",
      specsAndNotes: [
        "本数：24本",
        "種類：単3アルカリ乾電池",
        "保存方法：高温多湿を避けて保管してください",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: {
        originalPriceYen: 1820,
        displayPriceYen: 1420,
        isDiscountTarget: true,
      },
    },
  ] satisfies Trial10Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 200, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 500, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "当日便", priceYen: 800, shortDescription: "本日中のお届けが可能です" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 300, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "gift", name: "ギフト包装", priceYen: 200, shortDescription: "プレゼント用に包装します" },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial10Data.products.find((product) => product.id === productId) ??
    trial10Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial10Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial10Data.options.filter((option) => optionIds.includes(option.id));
}
