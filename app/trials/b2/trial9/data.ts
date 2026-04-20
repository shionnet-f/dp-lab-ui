export type Trial9Product = {
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

export const trial9Data = {
  purchaseConditions: {
    budgetYen: 3000,
    quantityCondition: "30枚以上であること",
    specificCondition: "1dayタイプであること",
  },
  products: [
    {
      id: "b2-t9-p1",
      role: "budget_over",
      failReason: "budget",
      name: "1dayクリアレンズ 30枚入 プレミアム",
      priceYen: 2880,
      description: "30枚入りの1dayタイプです。商品条件は満たしますが、購入手続き画面で確認できる送料を含めると予算を超えやすい商品です。",
      specsAndNotes: ["内容量：30枚入", "タイプ：1day", "BC：8.7mm"],
      prePurchaseCheck: ["予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "商品ごとに送料が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t9-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "2weekクリアレンズ 36枚入",
      priceYen: 1980,
      description: "枚数は十分ですが、1dayではなく2weekタイプの商品です。",
      specsAndNotes: ["内容量：36枚入", "タイプ：2week", "BC：8.6mm"],
      prePurchaseCheck: ["1dayタイプであることを確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "商品ごとに送料が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t9-p3",
      role: "correct",
      failReason: null,
      name: "1dayクリアレンズ 30枚入 ベーシック",
      priceYen: 2280,
      description: "条件を満たす1dayタイプの30枚入りです。送料を含めても予算内に収まる商品です。",
      specsAndNotes: ["内容量：30枚入", "タイプ：1day", "BC：8.7mm"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "商品ごとに送料が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t9-p4",
      role: "dp_candidate",
      failReason: null,
      name: "1dayクリアレンズ 30枚入 うるおいプラス",
      priceYen: 2198,
      description: "条件を満たす1dayタイプの30枚入りです。本体価格は安く見えますが、購入手続き画面で表示される送料が高めに設定されています。",
      specsAndNotes: ["内容量：30枚入", "タイプ：1day", "BC：8.8mm"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "商品ごとに送料が異なる場合があります"],
      dpDisplay: null,
    },
  ] satisfies Trial9Product[],
  shippingMethodsByProduct: {
    "b2-t9-p1": [
      { id: "standard", name: "通常配送", priceYen: 220, shortDescription: "3〜5日でお届け" },
      { id: "express", name: "お急ぎ便", priceYen: 420, shortDescription: "最短で翌日にお届け" },
      { id: "scheduled", name: "日時指定便", priceYen: 320, shortDescription: "受け取り日時を指定できます" },
    ],
    "b2-t9-p2": [
      { id: "standard", name: "通常配送", priceYen: 180, shortDescription: "3〜5日でお届け" },
      { id: "express", name: "お急ぎ便", priceYen: 380, shortDescription: "最短で翌日にお届け" },
      { id: "scheduled", name: "日時指定便", priceYen: 280, shortDescription: "受け取り日時を指定できます" },
    ],
    "b2-t9-p3": [
      { id: "standard", name: "通常配送", priceYen: 180, shortDescription: "3〜5日でお届け" },
      { id: "express", name: "お急ぎ便", priceYen: 380, shortDescription: "最短で翌日にお届け" },
      { id: "scheduled", name: "日時指定便", priceYen: 280, shortDescription: "受け取り日時を指定できます" },
    ],
    "b2-t9-p4": [
      { id: "standard", name: "通常配送", priceYen: 420, shortDescription: "3〜5日でお届け" },
      { id: "express", name: "お急ぎ便", priceYen: 620, shortDescription: "最短で翌日にお届け" },
      { id: "scheduled", name: "日時指定便", priceYen: 520, shortDescription: "受け取り日時を指定できます" },
    ],
  } satisfies Record<string, ShippingMethod[]>,
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 150, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "gift", name: "ギフト包装", priceYen: 100, shortDescription: "プレゼント用に包装します" },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return trial9Data.products.find((product) => product.id === productId) ?? trial9Data.products[0];
}

export function getShippingMethodsForProduct(productId?: string) {
  const fallbackProductId = productId && trial9Data.shippingMethodsByProduct[productId] ? productId : trial9Data.products[0].id;
  return trial9Data.shippingMethodsByProduct[fallbackProductId] ?? [];
}

export function getShippingById(productId?: string, shippingId?: string) {
  return getShippingMethodsForProduct(productId).find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial9Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial9Data;
