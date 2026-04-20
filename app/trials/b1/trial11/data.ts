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

export const trial11Data = {
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "1点であること",
    specificCondition: "月ごとの一覧が見やすいタイプであること",
  },
  products: [
    {
      id: "b1-t11-p1",
      role: "budget_over",
      failReason: "budget",
      name: "壁かけカレンダー 年間一覧付き プレミアム",
      priceYen: 1180,
      description:
        "月ごとの予定が確認しやすい壁かけカレンダーです。大きめサイズで書き込みもしやすいですが、予算を超えます。",
      specsAndNotes: [
        "サイズ：A2相当",
        "冊数：1点",
        "表示：1か月ごとの一覧が大きく見やすい構成",
      ],
      prePurchaseCheck: [
        "設置場所に合うサイズか確認してください",
        "月ごとの一覧が見やすい構成か確認してから選択してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "折り曲げ防止の簡易梱包で発送されます",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t11-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "壁かけカレンダー 写真重視タイプ",
      priceYen: 760,
      description:
        "写真を大きく見せるレイアウトの壁かけカレンダーです。装飾性は高いですが、月ごとの一覧は小さめです。",
      specsAndNotes: [
        "サイズ：A3相当",
        "冊数：1点",
        "表示：写真領域が大きく、月ごとの一覧欄は小さめ",
      ],
      prePurchaseCheck: [
        "見た目重視の商品です",
        "月ごとの一覧の見やすさを確認してから選択してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "通常梱包で発送されます",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t11-p3",
      role: "correct",
      failReason: null,
      name: "壁かけカレンダー ベーシック一覧タイプ",
      priceYen: 680,
      description:
        "月ごとの予定が見やすい、シンプルな壁かけカレンダーです。条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "サイズ：A3相当",
        "冊数：1点",
        "表示：1か月ごとの一覧が見やすい標準レイアウト",
      ],
      prePurchaseCheck: [
        "月ごとの予定欄の見やすさを確認してください",
        "必要な設置場所に合うか確認してから選択してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t11-p4",
      role: "dp_candidate",
      failReason: null,
      name: "壁かけカレンダー すっきり予定管理タイプ",
      priceYen: 840,
      description:
        "壁面になじみやすい、すっきりしたデザインの壁かけカレンダーです。条件は満たしていますが、正解よりやや高い商品です。",
      specsAndNotes: [
        "サイズ：A3相当",
        "冊数：1点",
        "表示：1か月ごとの一覧を見やすく配置した予定管理向けレイアウト",
      ],
      prePurchaseCheck: [
        "デザインだけでなく月ごとの一覧の見やすさも確認してください",
        "設置スペースに合うサイズか確認してから選択してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
  ] satisfies Trial11Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 180,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 420,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 360,
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
  return trial11Data.products.find((product) => product.id === productId) ?? trial11Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial11Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial11Data.options.filter((option) => optionIds.includes(option.id));
}
