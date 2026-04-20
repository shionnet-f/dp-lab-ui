export type Trial5Product = {
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

export const trial5Data = {
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "2L以上であること",
    specificCondition: "詰め替え用であること",
  },
  products: [
    {
      id: "a2-t5-p1",
      role: "budget_over",
      failReason: "budget",
      name: "食器用洗剤 詰め替え 2.2L 大容量",
      priceYen: 1580,
      description:
        "詰め替え用で容量条件も満たしていますが、予算を超える商品です。",
      specsAndNotes: [
        "内容量：2.2L",
        "タイプ：詰め替え用",
        "用途：食器用",
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
      id: "a2-t5-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "食器用洗剤 本体 2.4L ファミリーサイズ",
      priceYen: 1180,
      description:
        "容量は満たしますが、本体ボトル商品のため詰め替え用条件を満たしません。",
      specsAndNotes: [
        "内容量：2.4L",
        "タイプ：本体ボトル",
        "用途：食器用",
      ],
      prePurchaseCheck: [
        "詰め替え用かどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t5-p3",
      role: "correct",
      failReason: null,
      name: "食器用洗剤 詰め替え 2.0L ベーシック",
      priceYen: 1180,
      description:
        "詰め替え用で容量条件も満たしており、条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "内容量：2.0L",
        "タイプ：詰め替え用",
        "用途：食器用",
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
      id: "a2-t5-p4",
      role: "dp_candidate",
      failReason: null,
      name: "食器用洗剤 詰め替え 2.1L 速乾クリア",
      priceYen: 1360,
      description:
        "詰め替え用で容量条件も満たす商品です。条件は満たしますが、正解商品より高い商品です。",
      specsAndNotes: [
        "内容量：2.1L",
        "タイプ：詰め替え用",
        "用途：食器用",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: { label: "本日限定タイムセール" },
    },
  ] satisfies Trial5Product[],
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
  return trial5Data.products.find((product) => product.id === productId) ?? trial5Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial5Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial5Data.options.filter((option) => optionIds.includes(option.id));
}
