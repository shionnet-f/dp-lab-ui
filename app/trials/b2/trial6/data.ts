export type Trial6Product = {
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

export const trial6Data = {
  purchaseConditions: {
    budgetYen: 2000,
    quantityCondition: "20本以上であること",
    specificCondition: "黒色の油性ペンであること",
  },
  products: [
    {
      id: "b2-t6-p1",
      role: "budget_over",
      failReason: "budget",
      name: "油性ペン 黒 24本 速乾プレミアム",
      priceYen: 2180,
      description: "24本入りの黒色油性ペンです。条件は満たしますが、予算を超える商品です。",
      specsAndNotes: [
        "本数：24本",
        "インク色：黒",
        "油性インク",
        "丸芯",
        "筆記線幅：約1.5mm",
        "長時間の保管時はキャップをしっかり閉めてください",
        "使用環境により筆記感が異なる場合があります",
      ],
      prePurchaseCheck: [
        "予算内に収まるかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b2-t6-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "油性ペン 青 24本 スタンダード",
      priceYen: 1680,
      description: "24本入りの油性ペンですが、黒色ではなく青色の商品です。",
      specsAndNotes: [
        "本数：24本",
        "インク色：青",
        "油性インク",
        "丸芯",
        "筆記線幅：約1.5mm",
        "長時間の保管時はキャップをしっかり閉めてください",
      ],
      prePurchaseCheck: [
        "黒色の油性ペンであることを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b2-t6-p3",
      role: "correct",
      failReason: null,
      name: "油性ペン 黒 20本 ベーシック",
      priceYen: 1480,
      description: "条件を満たす中で最も安い黒色の油性ペンです。",
      specsAndNotes: [
        "本数：20本",
        "インク色：黒",
        "油性インク",
        "丸芯",
        "筆記線幅：約1.2mm",
        "この商品は初回価格が表示されています",
        "2回目以降は毎月同数をお届けする定期便価格での契約となります",
        "定期便はマイページから解約手続きが可能です",
        "長時間の保管時はキャップをしっかり閉めてください",
        "パッケージデザインは変更される場合があります",
        "在庫状況により発送元が異なる場合があります",
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
      id: "b2-t6-p4",
      role: "dp_candidate",
      failReason: null,
      name: "油性ペン 黒 22本 なめらか書き味",
      priceYen: 1760,
      description: "条件は満たしますが、正解商品よりやや高い黒色の油性ペンです。",
      specsAndNotes: [
        "本数：22本",
        "インク色：黒",
        "油性インク",
        "丸芯",
        "筆記線幅：約1.4mm",
        "長時間の保管時はキャップをしっかり閉めてください",
        "使用環境により筆記感が異なる場合があります",
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
  ] satisfies Trial6Product[],
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
  return trial6Data.products.find((product) => product.id === productId) ?? trial6Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial6Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial6Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial6Data;
