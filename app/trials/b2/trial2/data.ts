export type Trial2Product = {
  id: string;
  role:
    | "budget_over"
    | "condition_ng"
    | "correct"
    | "valid_but_expensive"
    | "dp_target";
  failReason:
    | "budget"
    | "quantity_condition"
    | "specific_condition"
    | "not_lowest"
    | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  imageSrc: string;
  dpDisplay?: { label: string } | null;
  hiddenDetailsTitle?: string;
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

export type Trial2Data = {
  trialId: string;
  dpType: string;
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial2Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial2Data: Trial2Data = {
  trialId: "b2-trial2",
  dpType: "商品詳細 dialog の中でさらに詳細を隠す",
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "12ロール以上であること",
    specificCondition: "ダブルタイプであること",
  },
  products: [
    // display order:
    // 1: dp_target（trial2ではDP対象商品を一番上に配置）
    // 2: budget_over
    // 3: valid_but_expensive
    // 4: correct
    {
      id: "p3",
      role: "dp_target",
      failReason: "specific_condition",
      name: "トイレットペーパー 標準タイプ",
      priceYen: 690,
      description: "まとめ買いしやすいトイレットペーパーです。",
      specsAndNotes: [
        "入数：12ロール",
        "タイプ：シングル",
        "紙幅：114mm",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/toilet-paper.svg",
      dpDisplay: null,
      hiddenDetailsTitle: "詳細を見る",
    },
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "トイレットペーパー レギュラー",
      priceYen: 1080,
      description: "家庭で使いやすいトイレットペーパーです。",
      specsAndNotes: [
        "入数：12ロール",
        "タイプ：ダブル",
        "紙幅：114mm",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/toilet-paper.svg",
      dpDisplay: null,
      hiddenDetailsTitle: "詳細を見る",
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "トイレットペーパー 通常タイプ",
      priceYen: 790,
      description: "日常使いしやすいトイレットペーパーです。",
      specsAndNotes: [
        "入数：12ロール",
        "タイプ：ダブル",
        "紙幅：114mm",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/toilet-paper.svg",
      dpDisplay: null,
      hiddenDetailsTitle: "詳細を見る",
    },
    {
      id: "p4",
      role: "correct",
      failReason: null,
      name: "トイレットペーパー ベーシック",
      priceYen: 720,
      description: "毎日の使用に適したトイレットペーパーです。",
      specsAndNotes: [
        "入数：12ロール",
        "タイプ：ダブル",
        "紙幅：114mm",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/toilet-paper.svg",
      dpDisplay: null,
      hiddenDetailsTitle: "詳細を見る",
    },
  ],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 200,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 500,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "当日便",
      priceYen: 800,
      shortDescription: "本日中のお届けが可能です",
    },
  ],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 150,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 120,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial2Data.products.find((product) => product.id === productId) ??
    trial2Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial2Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial2Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial2Data;
