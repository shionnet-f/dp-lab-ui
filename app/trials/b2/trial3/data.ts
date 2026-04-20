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

export const trial3Data = {
  purchaseConditions: {
    budgetYen: 3000,
    quantityCondition: "アルファ化米が10食以上であること",
    specificCondition: "水だけで食べられること",
  },
  products: [
    {
      id: "b2-t3-p1",
      role: "budget_over",
      failReason: "budget",
      name: "アルファ化米 保存食 12食セット 常備用",
      priceYen: 3180,
      description:
        "水だけで食べられるアルファ化米の12食セットです。条件は満たしますが、商品価格が予算を超えています。",
      specsAndNotes: ["内容：アルファ化米 12食", "調理方法：水で調理可能", "保存目安：5年"],
      prePurchaseCheck: [
        "予算内に収まるか確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t3-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "保存食 ごはん 10食セット お湯調理タイプ",
      priceYen: 1980,
      description:
        "アルファ化米10食の保存食セットですが、お湯での調理が必要です。水だけでは食べられません。",
      specsAndNotes: ["内容：アルファ化米 10食", "調理方法：お湯で15分", "保存目安：5年"],
      prePurchaseCheck: [
        "水だけで食べられる商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t3-p3",
      role: "correct",
      failReason: null,
      name: "アルファ化米 保存食 10食セット スタンダード",
      priceYen: 2280,
      description:
        "条件を満たす中で最も安い、水だけで食べられるアルファ化米10食セットです。",
      specsAndNotes: ["内容：アルファ化米 10食", "調理方法：水で調理可能", "保存目安：5年"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t3-p4",
      role: "dp_candidate",
      failReason: null,
      name: "アルファ化米 保存食 10食セット バランス備蓄",
      priceYen: 2390,
      description:
        "条件は満たしますが、正解商品よりやや高い、水だけで食べられるアルファ化米10食セットです。",
      specsAndNotes: ["内容：アルファ化米 10食", "調理方法：水で調理可能", "保存目安：5年"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
  ] satisfies Trial3Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 0, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 420, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "日時指定便", priceYen: 280, shortDescription: "受け取り日時を指定できます" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 180, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "compact", name: "簡易梱包オプション", priceYen: 120, shortDescription: "保管しやすい簡易梱包でお届けします" },
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
