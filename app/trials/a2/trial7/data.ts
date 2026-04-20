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
    rankingLabel: string;
    awardLabel: string;
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
      id: "a2-t7-p1",
      role: "budget_over",
      failReason: "budget",
      name: "敬老の日 生花アレンジメント 華やかオレンジ",
      priceYen: 4380,
      description:
        "生花のアレンジメントですが、予算4,000円を超える商品です。",
      specsAndNotes: [
        "点数：1点",
        "種類：生花アレンジメント",
        "サイズ：高さ約28cm",
      ],
      prePurchaseCheck: [
        "予算内に収まるかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t7-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "敬老の日 プリザーブドフラワーアレンジ ピンク",
      priceYen: 3280,
      description:
        "1点の商品ですが、プリザーブドフラワーのため生花アレンジメント条件を満たしません。",
      specsAndNotes: [
        "点数：1点",
        "種類：プリザーブドフラワーアレンジ",
        "サイズ：高さ約20cm",
      ],
      prePurchaseCheck: [
        "生花のアレンジメントかどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t7-p3",
      role: "correct",
      failReason: null,
      name: "敬老の日 生花アレンジメント やさしい彩り",
      priceYen: 3480,
      description:
        "生花のアレンジメントで条件を満たしており、条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "点数：1点",
        "種類：生花アレンジメント",
        "サイズ：高さ約24cm",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t7-p4",
      role: "dp_candidate",
      failReason: null,
      name: "敬老の日 生花アレンジメント 感謝の華",
      priceYen: 3920,
      description:
        "生花のアレンジメントで条件を満たす商品です。条件は満たしますが、正解商品より高い商品です。",
      specsAndNotes: [
        "点数：1点",
        "種類：生花アレンジメント",
        "サイズ：高さ約26cm",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: {
        rankingLabel: "人気ランキング 1位",
        awardLabel: "フラワーギフト大賞 受賞",
      },
    },
  ] satisfies Trial7Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 500,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 800,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 700,
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
  return trial7Data.products.find((product) => product.id === productId) ?? trial7Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial7Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial7Data.options.filter((option) => optionIds.includes(option.id));
}
