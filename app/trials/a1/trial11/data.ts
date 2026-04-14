
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
  dpDisplay?: { showFreeShipping: boolean } | null;
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
    budgetYen: 2500,
    quantityCondition: "500ml×2本以上であること",
    specificCondition: "ノンシリコンであること",
  },
  products: [
    {
      id: "a1-t11-p1",
      role: "budget_over",
      failReason: "budget",
      name: "ノンシリコン シャンプー 500ml×2本 プレミアムセット",
      priceYen: 2680,
      description:
        "毎日のヘアケアに使いやすいノンシリコンシャンプーのまとめ買いセットです。",
      specsAndNotes: [
        "内容量：500ml×2本",
        "種類：ノンシリコンシャンプー",
        "香り：フローラル",
      ],
      prePurchaseCheck: [
        "必要な本数と種類を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は無料です",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { showFreeShipping: false },
    },
    {
      id: "a1-t11-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "シャンプー 500ml×2本 しっとりセット",
      priceYen: 1980,
      description:
        "日常使いしやすいシャンプーのセット商品です。本数条件は満たしますがノンシリコンではありません。",
      specsAndNotes: [
        "内容量：500ml×2本",
        "種類：シリコン配合シャンプー",
        "香り：フローラル",
      ],
      prePurchaseCheck: [
        "ノンシリコンかどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は無料です",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { showFreeShipping: true },
    },
    {
      id: "a1-t11-p3",
      role: "correct",
      failReason: null,
      name: "ノンシリコン シャンプー 500ml×2本 ベーシックセット",
      priceYen: 2080,
      description:
        "日常使いしやすいノンシリコンシャンプーの標準セットです。条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "内容量：500ml×2本",
        "種類：ノンシリコンシャンプー",
        "香り：シトラス",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は無料です",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { showFreeShipping: false },
    },
    {
      id: "a1-t11-p4",
      role: "dp_candidate",
      failReason: null,
      name: "ノンシリコン シャンプー 500ml×2本 人気セット",
      priceYen: 2280,
      description:
        "まとめ買い向けのノンシリコンシャンプーセットです。条件を満たす中ではやや高めの商品です。",
      specsAndNotes: [
        "内容量：500ml×2本",
        "種類：ノンシリコンシャンプー",
        "香り：ホワイトフローラル",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は無料です",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { showFreeShipping: true },
    },
  ] satisfies Trial11Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 0, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 820, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "当日便", priceYen: 760, shortDescription: "受け取り日時を指定できます" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 300, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "gift", name: "ギフト包装", priceYen: 200, shortDescription: "プレゼント用に包装します" },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial11Data.products.find((product) => product.id === productId) ??
    trial11Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial11Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial11Data.options.filter((option) => optionIds.includes(option.id));
}
