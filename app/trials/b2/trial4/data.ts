export type Trial4Product = {
  id: string;
  role: "correct" | "budget_over" | "condition_ng" | "dp_candidate";
  failReason: string | null;
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

export const trial4Data = {
  purchaseConditions: {
    budgetYen: 500,
    quantityCondition: "A4サイズで100枚以上であること",
    specificCondition: "30穴タイプであること",
  },
  products: [
    {
      id: "b2-t4-p1",
      role: "correct",
      failReason: null,
      name: "ルーズリーフ A4 100枚 30穴 ベーシック",
      priceYen: 348,
      description:
        "A4サイズ・100枚・30穴の条件を満たす中で、最も安いルーズリーフです。",
      specsAndNotes: ["サイズ：A4", "枚数：100枚", "穴数：30穴"],
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
      id: "b2-t4-p2",
      role: "dp_candidate",
      failReason: null,
      name: "ルーズリーフ A4 120枚 30穴 しっかり紙質",
      priceYen: 398,
      description:
        "条件は満たしますが、正解商品よりやや高いルーズリーフです。",
      specsAndNotes: ["サイズ：A4", "枚数：120枚", "穴数：30穴"],
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
      id: "b2-t4-p3",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "ルーズリーフ A4 100枚 26穴 スタンダード",
      priceYen: 298,
      description:
        "A4サイズで100枚ですが、30穴ではなく26穴タイプの商品です。",
      specsAndNotes: ["サイズ：A4", "枚数：100枚", "穴数：26穴"],
      prePurchaseCheck: [
        "30穴タイプであることを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b2-t4-p4",
      role: "condition_ng",
      failReason: "quantity_condition",
      name: "ルーズリーフ A4 80枚 30穴 コンパクト",
      priceYen: 268,
      description:
        "30穴タイプですが、枚数が80枚のため条件を満たさない商品です。",
      specsAndNotes: ["サイズ：A4", "枚数：80枚", "穴数：30穴"],
      prePurchaseCheck: [
        "100枚以上であることを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
  ] satisfies Trial4Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 0, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 280, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "日時指定便", priceYen: 180, shortDescription: "受け取り日時を指定できます" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "cover", name: "表紙付きパック", priceYen: 120, shortDescription: "持ち運びに便利な表紙を追加します" },
    { id: "divider", name: "インデックス仕切り", priceYen: 90, shortDescription: "仕切りシートを追加します" },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return trial4Data.products.find((product) => product.id === productId) ?? trial4Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial4Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial4Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial4Data;
