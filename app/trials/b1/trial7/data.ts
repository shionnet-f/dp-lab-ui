export type Trial7Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  actualPriceYen?: number;
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

export const trial7Data = {
  trialId: "b1-trial7",
  dpType: "最終確認ページで初めてサブスク価格と分かるようにする",
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "1m以上であること",
    specificCondition: "USB Type-C to Type-Cであること",
  },
  products: [
    {
      id: "b1-t7-p1",
      role: "budget_over",
      failReason: "budget",
      name: "高耐久 USB Type-C to Type-C ケーブル 2m",
      priceYen: 1780,
      description: "Type-C to Type-C の2mケーブルです。長さと端子条件は満たしますが、予算を超える商品です。",
      specsAndNotes: [
        "長さ：2m",
        "端子：USB Type-C to Type-C",
        "急速充電対応",
        "ナイロン編み込み被覆",
        "データ転送対応",
      ],
      prePurchaseCheck: [
        "長さと端子形状が条件に合うか確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t7-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "USB Type-A to Type-C ケーブル 1.5m",
      priceYen: 980,
      description: "長さは1.5mありますが、端子が Type-C to Type-C ではない商品です。",
      specsAndNotes: [
        "長さ：1.5m",
        "端子：USB Type-A to Type-C",
        "急速充電対応",
        "一般的な充電用ケーブルです",
        "データ転送対応",
      ],
      prePurchaseCheck: [
        "端子形状が条件に合っているか確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t7-p3",
      role: "correct",
      failReason: null,
      name: "USB Type-C to Type-C ケーブル 1m",
      priceYen: 1280,
      description: "Type-C to Type-C の1mケーブルで、条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "長さ：1m",
        "端子：USB Type-C to Type-C",
        "急速充電対応",
        "データ転送対応",
        "日常使い向けの標準的なケーブルです",
      ],
      prePurchaseCheck: [
        "長さと端子形状が条件に合うか確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t7-p4",
      role: "dp_candidate",
      failReason: null,
      name: "USB Type-C to Type-C ケーブル 1.5m おすすめ版",
      priceYen: 1160,
      actualPriceYen: 1560,
      description: "Type-C to Type-C の1.5mケーブルで、一見すると予算内で購入できそうに見える商品です。",
      specsAndNotes: [
        "長さ：1.5m",
        "端子：USB Type-C to Type-C",
        "急速充電対応",
        "データ転送対応",
        "やわらかい被覆で取り回ししやすい仕様です",
        "在庫状況により発送時期が前後する場合があります",
      ],
      prePurchaseCheck: [
        "長さと端子形状が条件に合うか確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
  ] satisfies Trial7Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 220,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 480,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 320,
      shortDescription: "受け取り日時を指定できます",
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 180,
      shortDescription: "簡易ギフト包装を追加します",
    },
    {
      id: "bag",
      name: "手提げ袋を追加",
      priceYen: 80,
      shortDescription: "持ち運び用の手提げ袋を追加します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial7Data.products.find((product) => product.id === productId) ??
    trial7Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial7Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial7Data.options.filter((option) => optionIds.includes(option.id));
}
