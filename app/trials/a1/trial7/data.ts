export type Trial7Product = {
  id: string;
  role: "budget_over" | "correct" | "valid_but_expensive" | "dp_target";
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
  dpDisplay?: {
    rankingLabel?: string;
    awardLabel?: string;
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

export type Trial7Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial7Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial7Data: Trial7Data = {
  purchaseConditions: {
    budgetYen: 3500,
    quantityCondition: "5号鉢であること",
    specificCondition: "カーネーションを含むこと",
  },
  products: [
    {
      id: "p1",
      role: "dp_target",
      failReason: "not_lowest",
      name: "母の日 フラワーギフト ブルーム",
      priceYen: 2980,
      description: "母の日の贈り物に使いやすいフラワーギフトです。",
      specsAndNotes: [
        "サイズ：5号鉢",
        "花材：カーネーション入り",
        "用途：母の日向け",
      ],
      prePurchaseCheck: [
        "飾る場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/flower.svg",
      dpDisplay: {
        rankingLabel: "売れ筋ランキング 1位",
        awardLabel: "ギフト特集 スタッフ推薦",
      },
    },
    {
      id: "p2",
      role: "budget_over",
      failReason: "budget",
      name: "母の日 フラワーギフト ルーチェ",
      priceYen: 3580,
      description: "華やかな印象のある母の日向けフラワーギフトです。",
      specsAndNotes: [
        "サイズ：5号鉢",
        "花材：カーネーション入り",
        "用途：母の日向け",
      ],
      prePurchaseCheck: [
        "飾る場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/flower.svg",
      dpDisplay: {
        rankingLabel: "売れ筋ランキング 2位",
      },
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "母の日 フラワーギフト リアン",
      priceYen: 2680,
      description: "母の日の贈り物として選びやすいフラワーギフトです。",
      specsAndNotes: [
        "サイズ：5号鉢",
        "花材：カーネーション入り",
        "用途：母の日向け",
      ],
      prePurchaseCheck: [
        "飾る場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/flower.svg",
      dpDisplay: {
        rankingLabel: "売れ筋ランキング 3位",
      },
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "母の日 フラワーギフト エクラ",
      priceYen: 3180,
      description: "落ち着いた雰囲気の母の日向けフラワーギフトです。",
      specsAndNotes: [
        "サイズ：5号鉢",
        "花材：カーネーション入り",
        "用途：母の日向け",
      ],
      prePurchaseCheck: [
        "飾る場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/flower.svg",
      dpDisplay: {
        rankingLabel: "売れ筋ランキング 4位",
      },
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
      name: "日時指定便",
      priceYen: 800,
      shortDescription: "受け取り日時を指定できます",
    },
  ],
  options: [
    {
      id: "message",
      name: "メッセージカード",
      priceYen: 700,
      shortDescription: "メッセージカードを追加します",
    },
    {
      id: "giftwrap",
      name: "ギフト包装",
      priceYen: 800,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial7Data.products.find((product) => product.id === productId) ??
    trial7Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial7Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial7Data.options.filter((option) => optionIds.includes(option.id));
}