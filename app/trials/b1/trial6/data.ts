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
  trialId: "b1-trial6",
  dpType: "仕様・補足のスクロール領域内にサブスク価格であることを埋め込む",
  purchaseConditions: {
    budgetYen: 2000,
    quantityCondition: "3本以上であること",
    specificCondition: "黒インクであること",
  },
  products: [
    {
      id: "b1-t6-p1",
      role: "budget_over",
      failReason: "budget",
      name: "なめらかボールペン 0.7mm 黒 5本セット プレミアム",
      priceYen: 2280,
      description: "黒インクのボールペン5本セットです。必要本数は満たしますが、予算を超える商品です。",
      specsAndNotes: [
        "本数：5本セット",
        "インク色：黒",
        "ペン先：0.7mm",
        "ノック式",
        "筆記距離の目安：約800m",
      ],
      prePurchaseCheck: [
        "予算内に収まるか確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t6-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "さらさらボールペン 0.5mm 青 4本セット",
      priceYen: 1280,
      description: "4本セットで本数条件は満たしますが、黒インクではなく青インクの商品です。",
      specsAndNotes: [
        "本数：4本セット",
        "インク色：青",
        "ペン先：0.5mm",
        "ノック式",
        "細字タイプ",
      ],
      prePurchaseCheck: [
        "インク色が条件に合っているか確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t6-p3",
      role: "correct",
      failReason: null,
      name: "スタンダードボールペン 0.5mm 黒 3本セット",
      priceYen: 1480,
      description: "黒インクの3本セットで、条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "本数：3本セット",
        "インク色：黒",
        "ペン先：0.5mm",
        "ノック式",
        "一般的な事務用途向け",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t6-p4",
      role: "dp_candidate",
      failReason: null,
      name: "書きやすいボールペン 0.5mm 黒 4本セット",
      priceYen: 1360,
      description: "黒インクの4本セットで、一見すると条件に合う価格の商品です。",
      specsAndNotes: [
        "本数：4本セット",
        "インク色：黒",
        "ペン先：0.5mm",
        "ノック式",
        "低粘度インク採用",
        "滑らかな書き味です",
        "オフィスや学習用途向けの定番仕様です",
        "パッケージデザインは変更される場合があります",
        "在庫状況により発送時期が前後する場合があります",
        "表示価格は定期お届けコースを利用した場合の価格です",
        "定期お届けコースは毎月1回、同一商品を自動で発送します",
        "通常購入価格は1,760円です",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
  ] satisfies Trial6Product[],
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
    trial6Data.products.find((product) => product.id === productId) ??
    trial6Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial6Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial6Data.options.filter((option) => optionIds.includes(option.id));
}
