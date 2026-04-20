export type Trial8Product = {
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

export const trial8Data = {
  purchaseConditions: {
    budgetYen: 2000,
    quantityCondition: "1回あたり24本以上届くこと",
    specificCondition: "単発購入ではなく定期契約であること",
  },
  products: [
    {
      id: "b2-t8-p1",
      role: "budget_over",
      failReason: "budget",
      name: "天然水 定期便 24本 毎月お届け プレミアム",
      priceYen: 2180,
      description: "1回あたり24本が届く定期便です。条件は満たしますが、予算を超える商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "契約形態：毎月お届けの定期契約",
        "お届け単位：1回あたり24本",
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
      id: "b2-t8-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "天然水 おトク便 24本コース",
      priceYen: 1760,
      description: "商品名は定期便のように見えますが、実際は今回限りの単発購入商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "契約形態：単発購入（継続契約ではありません）",
        "お届け単位：1回限り24本",
      ],
      prePurchaseCheck: [
        "単発購入ではなく定期契約の商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { label: "おトク便" },
    },
    {
      id: "b2-t8-p3",
      role: "correct",
      failReason: null,
      name: "天然水 定期便 24本 ベーシック",
      priceYen: 1580,
      description: "条件を満たす中で最も安い定期契約の天然水です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "契約形態：毎月お届けの定期契約",
        "お届け単位：1回あたり24本",
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
      id: "b2-t8-p4",
      role: "dp_candidate",
      failReason: null,
      name: "天然水 定期便 24本 すっきり飲み口",
      priceYen: 1890,
      description: "条件は満たしますが、正解商品よりやや高い定期契約の天然水です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "契約形態：毎月お届けの定期契約",
        "お届け単位：1回あたり24本",
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
  ] satisfies Trial8Product[],
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
  return trial8Data.products.find((product) => product.id === productId) ?? trial8Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial8Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial8Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial8Data;
