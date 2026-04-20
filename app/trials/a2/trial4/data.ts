export type Trial4Product = {
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

export const trial4Data = {
  purchaseConditions: {
    budgetYen: 30000,
    quantityCondition: "1台であること",
    specificCondition: "乾燥付きであること",
  },
  products: [
    {
      id: "a2-t4-p1",
      role: "budget_over",
      failReason: "budget",
      name: "ドラム式洗濯乾燥機 8kg ハイグレード",
      priceYen: 32800,
      description:
        "乾燥機能付きのドラム式洗濯機です。条件は満たしますが、予算を超える商品です。",
      specsAndNotes: [
        "種類：ドラム式洗濯乾燥機",
        "容量：8kg",
        "乾燥機能：あり",
      ],
      prePurchaseCheck: [
        "予算内に収まるかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "設置の有無によりお届け日が変わる場合があります",
        "地域により大型家電の配送条件が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t4-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "全自動洗濯機 7kg スタンダード",
      priceYen: 24800,
      description:
        "価格は抑えめですが、乾燥機能は付いていない洗濯機です。",
      specsAndNotes: [
        "種類：全自動洗濯機",
        "容量：7kg",
        "乾燥機能：なし",
      ],
      prePurchaseCheck: [
        "乾燥付きかどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "設置の有無によりお届け日が変わる場合があります",
        "地域により大型家電の配送条件が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t4-p3",
      role: "correct",
      failReason: null,
      name: "洗濯乾燥機 6kg ベーシック",
      priceYen: 26800,
      description:
        "乾燥機能付きで、条件を満たす中では最も安い商品です。",
      specsAndNotes: [
        "種類：洗濯乾燥機",
        "容量：6kg",
        "乾燥機能：あり",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "設置の有無によりお届け日が変わる場合があります",
        "地域により大型家電の配送条件が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t4-p4",
      role: "dp_candidate",
      failReason: null,
      name: "洗濯乾燥機 7kg 省エネモデル",
      priceYen: 28900,
      description:
        "乾燥機能付きの省エネモデルです。条件は満たしますが、正解商品より高い商品です。",
      specsAndNotes: [
        "種類：洗濯乾燥機",
        "容量：7kg",
        "乾燥機能：あり",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "設置の有無によりお届け日が変わる場合があります",
        "地域により大型家電の配送条件が異なる場合があります",
      ],
      dpDisplay: { label: "残り2点" },
    },
  ] satisfies Trial4Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 500,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 800,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 700,
      shortDescription: "受け取り日時を指定できます",
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 300,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 200,
      shortDescription: "プレゼント用に包装します",
    },
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
