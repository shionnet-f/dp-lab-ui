
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
  dpDisplay?: {
    emphasizeFreeShipping?: boolean;
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

export const trial11Data = {
  purchaseConditions: {
    budgetYen: 900,
    quantityCondition: "1000ml以上であること",
    specificCondition: "詰め替え用であること",
  },
  products: [
    {
      id: "a2-t11-p1",
      role: "budget_over",
      failReason: "budget",
      name: "ボディソープ 詰め替え 1200ml 大容量パック",
      priceYen: 980,
      description: "詰め替え用で1200mlですが、予算900円を超える商品です。",
      specsAndNotes: [
        "内容量：1200ml",
        "タイプ：詰め替え用",
        "香り：フローラル",
      ],
      prePurchaseCheck: [
        "予算内に収まるかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は送料無料です",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t11-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "ボディソープ 本体 1100ml ポンプタイプ",
      priceYen: 820,
      description: "1100mlですが、本体ボトルのため詰め替え用条件を満たしません。",
      specsAndNotes: [
        "内容量：1100ml",
        "タイプ：本体ボトル",
        "香り：シトラス",
      ],
      prePurchaseCheck: [
        "容量だけでなく、詰め替え用かどうかも確認してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は送料無料です",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t11-p3",
      role: "correct",
      failReason: null,
      name: "ボディソープ 詰め替え 1000ml スタンダード",
      priceYen: 760,
      description: "1000mlの詰め替え用で、条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "内容量：1000ml",
        "タイプ：詰め替え用",
        "香り：せっけん",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は送料無料です",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t11-p4",
      role: "dp_candidate",
      failReason: null,
      name: "ボディソープ 詰め替え 1100ml やさしい泡タイプ",
      priceYen: 860,
      description: "1100mlの詰め替え用です。商品一覧では送料無料が強調表示されています。",
      specsAndNotes: [
        "内容量：1100ml",
        "タイプ：詰め替え用",
        "香り：無香料",
      ],
      prePurchaseCheck: [
        "最終的な金額を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は送料無料です",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: {
        emphasizeFreeShipping: true,
      },
    },
  ] satisfies Trial11Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 0,
      shortDescription: "3〜5日でお届け（送料無料）",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 300,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 250,
      shortDescription: "受け取り日時を指定できます",
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 120,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "簡易ギフト包装",
      priceYen: 80,
      shortDescription: "簡易包装を追加します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return trial11Data.products.find((product) => product.id === productId) ?? trial11Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial11Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial11Data.options.filter((option) => optionIds.includes(option.id));
}
