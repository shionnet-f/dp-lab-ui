export type Trial4Product = {
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

export const trial4Data = {
  trialId: "b1-trial4",
  dpType: "dialogで料金詳細を1段深く隠す",
  purchaseConditions: {
    budgetYen: 2000,
    quantityCondition: "A4サイズで10冊以上であること",
    specificCondition: "横罫であること",
  },
  products: [
    {
      id: "b1-t4-p1",
      role: "budget_over",
      failReason: "budget",
      name: "A4 横罫ノート 10冊パック プレミアム",
      priceYen: 2280,
      description:
        "A4サイズの横罫ノート10冊セットです。条件は満たしますが、予算を超える商品です。",
      specsAndNotes: [
        "サイズ：A4",
        "罫線：横罫",
        "入数：10冊",
        "1冊あたり40枚",
      ],
      prePurchaseCheck: [
        "予算内に収まるか確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t4-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "A4 無地ノート 10冊パック",
      priceYen: 1280,
      description:
        "A4サイズで10冊入りのノートです。入数は満たしますが、横罫ではなく無地です。",
      specsAndNotes: [
        "サイズ：A4",
        "罫線：無地",
        "入数：10冊",
        "1冊あたり30枚",
      ],
      prePurchaseCheck: [
        "横罫かどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t4-p3",
      role: "correct",
      failReason: null,
      name: "A4 横罫ノート 10冊パック ベーシック",
      priceYen: 1380,
      description:
        "A4サイズ・横罫・10冊入りの条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "サイズ：A4",
        "罫線：横罫",
        "入数：10冊",
        "1冊あたり30枚",
      ],
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
      id: "b1-t4-p4",
      role: "dp_candidate",
      failReason: null,
      name: "A4 横罫ノート 12冊パック しっかり製本",
      priceYen: 1560,
      description:
        "A4サイズ・横罫・12冊入りの条件を満たす商品です。正解より少し高い設定です。",
      specsAndNotes: [
        "サイズ：A4",
        "罫線：横罫",
        "入数：12冊",
        "1冊あたり30枚",
      ],
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
  ] satisfies Trial4Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 220,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 520,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 380,
      shortDescription: "受け取り日時を指定できます",
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "cover",
      name: "透明カバー追加",
      priceYen: 180,
      shortDescription: "ノート表紙を保護する透明カバーを付けます",
    },
    {
      id: "divider",
      name: "見出しインデックス追加",
      priceYen: 120,
      shortDescription: "ノート整理用の見出しインデックスを追加します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial4Data.products.find((product) => product.id === productId) ??
    trial4Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial4Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial4Data.options.filter((option) => optionIds.includes(option.id));
}
