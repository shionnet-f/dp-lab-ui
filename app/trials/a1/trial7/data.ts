
export type Trial7Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
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

export const trial7Data = {
  purchaseConditions: {
    budgetYen: 3500,
    quantityCondition: "5号鉢であること",
    specificCondition: "カーネーションを含むこと",
  },
  products: [
    {
      id: "a1-t7-p1",
      role: "budget_over",
      failReason: "budget",
      name: "母の日 カーネーション鉢植え 5号 プレミアム",
      priceYen: 3980,
      description:
        "母の日向けの定番ギフトです。カーネーションを中心にした5号鉢のフラワーギフトです。",
      specsAndNotes: ["サイズ：5号鉢", "花材：カーネーション入り", "用途：母の日向け"],
      prePurchaseCheck: [
        "必要なサイズと花材を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: {
        rankingLabel: "売れ筋ランキング 1位",
        awardLabel: "母の日ギフト特集 受賞",
      },
    },
    {
      id: "a1-t7-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "母の日 フラワーギフト 5号 ピンクアレンジ",
      priceYen: 2980,
      description:
        "華やかな色合いの母の日向けフラワーギフトです。見た目のボリューム感がある商品です。",
      specsAndNotes: ["サイズ：5号鉢", "花材：バラ・ガーベラ中心", "用途：母の日向け"],
      prePurchaseCheck: [
        "カーネーションを含むか確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: {
        rankingLabel: "売れ筋ランキング 2位",
      },
    },
    {
      id: "a1-t7-p3",
      role: "correct",
      failReason: null,
      name: "母の日 カーネーション鉢植え 5号 ベーシック",
      priceYen: 2680,
      description:
        "母の日の贈り物として選びやすい、カーネーション入りのベーシックな5号鉢です。",
      specsAndNotes: ["サイズ：5号鉢", "花材：カーネーション入り", "用途：母の日向け"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t7-p4",
      role: "dp_candidate",
      failReason: null,
      name: "母の日 カーネーション鉢植え 5号 人気セット",
      priceYen: 2980,
      description:
        "カーネーションを含む5号鉢の母の日向け人気セットです。条件を満たす中ではやや高めの商品です。",
      specsAndNotes: ["サイズ：5号鉢", "花材：カーネーション入り", "用途：母の日向け"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: {
        rankingLabel: "売れ筋ランキング 3位",
        awardLabel: "ギフト特集 スタッフ推薦",
      },
    },
  ] satisfies Trial7Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 500, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 800, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "日時指定便", priceYen: 700, shortDescription: "受け取り日時を指定できます" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "message", name: "メッセージカード", priceYen: 200, shortDescription: "メッセージカードを追加します" },
    { id: "giftwrap", name: "ギフト包装", priceYen: 300, shortDescription: "プレゼント用に包装します" },
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
