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
    budgetYen: 2000,
    quantityCondition: "合計10箱以上であること",
    specificCondition: "200組タイプであること",
  },
  products: [
    {
      id: "a1-t5-p1",
      role: "budget_over",
      failReason: "budget",
      name: "ティッシュペーパー 大容量セット",
      priceYen: 2180,
      description: "まとめ買い向けのティッシュセットです。日常使いしやすい標準タイプです。",
      specsAndNotes: ["内容量：200組 × 12箱", "セット数：12箱", "タイプ：ボックスティッシュ"],
      prePurchaseCheck: [
        "予算内かを確認してから選択してください",
        "必要な箱数と組数を確認してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t5-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "ティッシュペーパー まとめ買いセット",
      priceYen: 1580,
      description: "日常使い向けのティッシュセットです。保管しやすい箱数で届きます。",
      specsAndNotes: ["内容量：150組 × 10箱", "セット数：10箱", "タイプ：ボックスティッシュ"],
      prePurchaseCheck: [
        "必要な箱数と組数を確認してから選択してください",
        "購入手続き画面で最終確認ができます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { label: "タイムセール 残り18分" },
    },
    {
      id: "a1-t5-p3",
      role: "correct",
      failReason: null,
      name: "ティッシュペーパー 標準セット",
      priceYen: 1680,
      description: "毎日の使用に適したティッシュセットです。必要十分な箱数をまとめて購入できます。",
      specsAndNotes: ["内容量：200組 × 10箱", "セット数：10箱", "タイプ：ボックスティッシュ"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で最終確認ができます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t5-p4",
      role: "dp_candidate",
      failReason: null,
      name: "ティッシュペーパー 人気セット",
      priceYen: 1780,
      description: "使い勝手のよい人気のティッシュセットです。日常使い向けに十分な箱数が入っています。",
      specsAndNotes: ["内容量：200組 × 10箱", "セット数：10箱", "タイプ：ボックスティッシュ"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で最終確認ができます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { label: "タイムセール 残り9分" },
    },
  ] satisfies Trial5Product[],
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
    trial5Data.products.find((product) => product.id === productId) ??
    trial5Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial5Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial5Data.options.filter((option) => optionIds.includes(option.id));
}
