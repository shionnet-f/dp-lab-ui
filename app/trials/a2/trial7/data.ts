export type Trial7Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "valid_but_expensive" | "dp_target";
  failReason: "budget" | "quantity_condition" | "specific_condition" | "not_lowest" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  imageSrc: string;
  dpDisplay?: {
    label?: string;
    subscriptionPriceYen?: number;
    showFreeShipping?: boolean;
    kind?: string;
    initialSeconds?: number;
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

export const trial7Data = {
  purchaseConditions: {
    budgetYen: 4000,
    quantityCondition: "1点であること",
    specificCondition: "生花のアレンジメントであること",
  },
  products: [
    {
      id: "p2",
      role: "budget_over",
      failReason: "budget",
      name: "敬老の日 フラワーギフト ルーチェ",
      priceYen: 4380,
      description: "贈り物として使いやすいフラワーギフトです。",
      specsAndNotes: [
        "点数：1点",
        "種類：生花アレンジメント",
        "サイズ：高さ約28cm",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
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
      id: "p1",
      role: "dp_target",
      failReason: "not_lowest",
      name: "敬老の日 フラワーギフト ブルーム",
      priceYen: 3720,
      description: "敬老の日の贈り物に使いやすいフラワーギフトです。",
      specsAndNotes: [
        "点数：1点",
        "種類：生花アレンジメント",
        "サイズ：高さ約26cm",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
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
      id: "p3",
      role: "correct",
      failReason: null,
      name: "敬老の日 フラワーギフト リアン",
      priceYen: 3480,
      description: "落ち着いた印象のフラワーギフトです。",
      specsAndNotes: [
        "点数：1点",
        "種類：生花アレンジメント",
        "サイズ：高さ約24cm",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
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
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "敬老の日 フラワーギフト エクラ",
      priceYen: 3920,
      description: "華やかな印象のフラワーギフトです。",
      specsAndNotes: [
        "点数：1点",
        "種類：生花アレンジメント",
        "サイズ：高さ約28cm",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
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
  ] satisfies Trial7Product[],
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
  ] satisfies ShippingMethod[],
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
    trial7Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial7Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial7Data;
