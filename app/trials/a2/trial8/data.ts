export type Trial8Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
};

export type ShippingMethod = {
  id: string;
  name: string;
  priceYen: number;
  shortDescription: string;
  dpDisplay?: {
    relativeDeltaYen?: number;
    highlight?: boolean;
  } | null;
};

export type AddonOption = {
  id: string;
  name: string;
  priceYen: number;
  shortDescription: string;
};

export const trial8Data = {
  purchaseConditions: {
    budgetYen: 2700,
    quantityCondition: "500ml×24本以上であること",
    specificCondition: "無糖であること",
  },
  products: [
    {
      id: "a2-t8-p1",
      role: "budget_over",
      failReason: "budget",
      name: "無糖コーヒー ボトル 500ml×24本 プレミアムブレンド",
      priceYen: 2890,
      description:
        "無糖・500ml×24本の商品ですが、予算2,700円を超える商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：無糖コーヒー",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "予算内に収まるかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
    },
    {
      id: "a2-t8-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "微糖コーヒー ボトル 500ml×24本 すっきりテイスト",
      priceYen: 2180,
      description:
        "500ml×24本の商品ですが、微糖のため無糖条件を満たしません。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：微糖コーヒー",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "無糖タイプかどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
    },
    {
      id: "a2-t8-p3",
      role: "correct",
      failReason: null,
      name: "無糖コーヒー ボトル 500ml×24本 スタンダード",
      priceYen: 2280,
      description:
        "無糖・500ml×24本で条件を満たしており、条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：無糖コーヒー",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
    },
    {
      id: "a2-t8-p4",
      role: "dp_candidate",
      failReason: null,
      name: "無糖コーヒー ボトル 500ml×24本 香り深煎り",
      priceYen: 2480,
      description:
        "無糖・500ml×24本で条件を満たす商品です。条件は満たしますが、正解商品より高い商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：無糖コーヒー",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
    },
  ] satisfies Trial8Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 0,
      shortDescription: "3〜5日でお届け",
      dpDisplay: {
        relativeDeltaYen: -200,
        highlight: true,
      },
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 200,
      shortDescription: "最短で翌日にお届け",
      dpDisplay: {
        relativeDeltaYen: 0,
        highlight: true,
      },
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 300,
      shortDescription: "受け取り日時を指定できます",
      dpDisplay: {
        relativeDeltaYen: 100,
        highlight: true,
      },
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 200,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 150,
      shortDescription: "簡易ギフト包装を追加します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return trial8Data.products.find((product) => product.id === productId) ?? trial8Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial8Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial8Data.options.filter((option) => optionIds.includes(option.id));
}
