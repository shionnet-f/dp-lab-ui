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
  trialId: "b1-trial9",
  dpType: "商品一覧では本体価格のみ表示し、商品ごとに異なる送料は checkout / confirm で初めて具体表示する",
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "100枚以上であること",
    specificCondition: "使い捨てタイプであること",
  },
  products: [
    {
      id: "b1-t9-p1",
      role: "budget_over",
      failReason: "budget",
      name: "不織布マスク 120枚 使い捨て プレミアム",
      priceYen: 1680,
      description:
        "120枚入りの使い捨て不織布マスクです。条件は満たしますが、本体価格の時点で予算を超えています。",
      specsAndNotes: [
        "枚数：120枚入り",
        "種類：不織布マスク",
        "形態：使い捨てタイプ",
        "個包装ではありません",
        "日常使い向けの標準サイズです",
      ],
      prePurchaseCheck: [
        "枚数と使い捨てタイプかどうかを確認してから選択してください",
        "送料は購入手続き画面で具体的に表示されます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "商品ごとに送料が異なります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t9-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "不織布風マスク 100枚 再利用タイプ",
      priceYen: 960,
      description:
        "100枚入りですが、洗って再利用する前提のタイプであり、使い捨て条件を満たさない商品です。",
      specsAndNotes: [
        "枚数：100枚入り",
        "種類：マスク",
        "形態：再利用タイプ",
        "洗って繰り返し使う想定です",
        "収納用ケース付きです",
      ],
      prePurchaseCheck: [
        "枚数だけでなく、使い捨てタイプかどうかも確認してください",
        "送料は購入手続き画面で具体的に表示されます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "商品ごとに送料が異なります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t9-p3",
      role: "correct",
      failReason: null,
      name: "不織布マスク 100枚 使い捨て ベーシック",
      priceYen: 980,
      description:
        "100枚入りの使い捨て不織布マスクです。条件を満たす中で、送料込み総額が最も安い商品です。",
      specsAndNotes: [
        "枚数：100枚入り",
        "種類：不織布マスク",
        "形態：使い捨てタイプ",
        "普段使いしやすい標準仕様です",
        "日常備蓄向けの商品です",
      ],
      prePurchaseCheck: [
        "枚数と使い捨てタイプかどうかを確認してから選択してください",
        "送料は購入手続き画面で具体的に表示されます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "商品ごとに送料が異なります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t9-p4",
      role: "dp_candidate",
      failReason: null,
      name: "不織布マスク 100枚 使い捨て お買い得版",
      priceYen: 860,
      description:
        "本体価格だけを見ると安く見える使い捨て不織布マスクです。具体的な送料は購入手続き画面で表示されます。",
      specsAndNotes: [
        "枚数：100枚入り",
        "種類：不織布マスク",
        "形態：使い捨てタイプ",
        "薄型パッケージで配送されます",
        "まとめ買い向けの簡易包装商品です",
      ],
      prePurchaseCheck: [
        "本体価格だけでなく、購入手続き画面で表示される送料も確認してください",
        "枚数と使い捨てタイプの条件は満たしています",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "商品ごとに送料が異なります",
      ],
      dpDisplay: null,
    },
  ] satisfies Trial9Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 0,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 0,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 0,
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
} as const;

const SHIPPING_PRICE_TABLE = {
  "b1-t9-p1": { standard: 260, express: 560, scheduled: 420 },
  "b1-t9-p2": { standard: 240, express: 540, scheduled: 400 },
  "b1-t9-p3": { standard: 300, express: 600, scheduled: 460 },
  "b1-t9-p4": { standard: 540, express: 840, scheduled: 700 },
} as const;

export function getProductById(productId?: string) {
  return (
    trial9Data.products.find((product) => product.id === productId) ??
    trial9Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial9Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getShippingPrice(productId: string, shippingId?: string) {
  if (!shippingId) return 0;

  const prices =
    SHIPPING_PRICE_TABLE[productId as keyof typeof SHIPPING_PRICE_TABLE] ??
    SHIPPING_PRICE_TABLE[trial9Data.products[0].id as keyof typeof SHIPPING_PRICE_TABLE];

  return prices[shippingId as keyof typeof prices] ?? 0;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial9Data.options.filter((option) => optionIds.includes(option.id));
}
