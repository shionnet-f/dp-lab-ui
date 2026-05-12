export type Trial5Product = {
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
  detailParagraphs: string[];
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

export type Trial5Data = {
  trialId: string;
  dpType: string;
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial5Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial5Data: Trial5Data = {
  trialId: "b1-trial5",
  dpType: "商品詳細にすべての情報をまとめて入れる",
  purchaseConditions: {
    budgetYen: 5000,
    quantityCondition: "350ml×24本以上であること",
    specificCondition: "炭酸タイプであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "エナジードリンク レギュラー",
      priceYen: 5480,
      description: "まとめ買い向けのエナジードリンクです。",
      specsAndNotes: [
        "容量：350ml",
        "入数：24本",
        "タイプ：炭酸",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      detailParagraphs: [
        "ケース販売の商品です。",
        "容量：350ml",
        "入数：24本",
        "タイプ：炭酸",
        "味：シトラス系",
        "保存方法：高温・直射日光を避けて保存してください。",
        "開封後は早めにお飲みください。",
        "配送方法は購入手続き画面で選択できます。",
      ],
      imageSrc: "/images/products/can.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "エナジードリンク 通常タイプ",
      priceYen: 4760,
      description: "日常使いしやすいエナジードリンクです。",
      specsAndNotes: [
        "容量：350ml",
        "入数：24本",
        "タイプ：炭酸",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      detailParagraphs: [
        "ケース販売の商品です。",
        "容量：350ml",
        "入数：24本",
        "タイプ：炭酸",
        "味：ベリー系",
        "保存方法：高温・直射日光を避けて保存してください。",
        "開封後は早めにお飲みください。",
        "配送方法は購入手続き画面で選択できます。",
      ],
      imageSrc: "/images/products/can.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "エナジードリンク ベーシック",
      priceYen: 4380,
      description: "日常のリフレッシュに使いやすいエナジードリンクです。",
      specsAndNotes: [
        "容量：350ml",
        "入数：24本",
        "タイプ：炭酸",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      detailParagraphs: [
        "ケース販売の商品です。",
        "容量：350ml",
        "入数：24本",
        "タイプ：炭酸",
        "味：レモン系",
        "保存方法：高温・直射日光を避けて保存してください。",
        "開封後は早めにお飲みください。",
        "配送方法は購入手続き画面で選択できます。",
      ],
      imageSrc: "/images/products/can.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "dp_target",
      failReason: "specific_condition",
      name: "エナジードリンク シンプル",
      priceYen: 4180,
      description: "ストックしやすいエナジードリンクです。",
      specsAndNotes: [
        "容量：350ml",
        "入数：24本",
        "タイプ：非炭酸",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      detailParagraphs: [
        "ケース販売の商品です。",
        "容量：350ml",
        "入数：24本",
        "味：グレープ系",
        "保存方法：高温・直射日光を避けて保存してください。",
        "タイプ：非炭酸",
        "開封後は早めにお飲みください。",
        "配送方法は購入手続き画面で選択できます。",
      ],
      imageSrc: "/images/products/can.svg",
      dpDisplay: null,
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
      priceYen: 600,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 500,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial5Data.products.find((product) => product.id === productId) ??
    trial5Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial5Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial5Data.options.filter((option) => optionIds.includes(option.id));
}