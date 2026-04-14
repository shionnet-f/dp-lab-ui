export type Trial2Product = {
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

export const trial2Data = {
  purchaseConditions: {
    budgetYen: 1200,
    quantityCondition: "長さが2m以上であること",
    specificCondition: "カテゴリ6以上であること",
  },
  products: [
    {
      id: "a1-t2-p1",
      role: "budget_over",
      failReason: "budget",
      name: "高速通信対応LANケーブル",
      priceYen: 1280,
      description: "家庭内の有線接続に使いやすいLANケーブルです。端末やルーターとの接続に利用できます。",
      specsAndNotes: ["長さ：3m", "規格：Cat6", "端子：RJ45"],
      prePurchaseCheck: [
        "必要な長さと規格を確認してから選択してください",
        "接続する機器側の端子形状をご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t2-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "家庭用LANケーブル",
      priceYen: 880,
      description: "一般的な有線接続向けのLANケーブルです。日常的な使用を想定した定番商品です。",
      specsAndNotes: ["長さ：2m", "規格：Cat5e", "端子：RJ45"],
      prePurchaseCheck: [
        "必要な通信規格を確認してから選択してください",
        "接続する機器側の端子形状をご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t2-p3",
      role: "correct",
      failReason: null,
      name: "LANケーブル スタンダードモデル",
      priceYen: 980,
      description: "家庭内の有線接続に使いやすいスタンダードなLANケーブルです。基本的な用途に対応します。",
      specsAndNotes: ["長さ：2m", "規格：Cat6", "端子：RJ45"],
      prePurchaseCheck: [
        "必要な長さと規格を確認してから選択してください",
        "接続する機器側の端子形状をご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t2-p4",
      role: "dp_candidate",
      failReason: null,
      name: "LANケーブル 高速モデル",
      priceYen: 1080,
      description: "高速通信に対応したLANケーブルです。接続環境に応じて安定した通信をサポートします。",
      specsAndNotes: ["長さ：2m", "規格：Cat6A", "端子：RJ45"],
      prePurchaseCheck: [
        "必要な長さと規格を確認してから選択してください",
        "接続する機器側の端子形状をご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { label: "27人がこの商品を見ています" },
    },
  ] satisfies Trial2Product[],
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
    trial2Data.products.find((product) => product.id === productId) ??
    trial2Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial2Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial2Data.options.filter((option) => optionIds.includes(option.id));
}
