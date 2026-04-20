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

export const trial8Data = {
  trialId: "b1-trial8",
  dpType: "商品名は購入条件に近く見えるが商品詳細を見ると実は条件とずれる",
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "500ml×24本以上であること",
    specificCondition: "無糖であること",
  },
  products: [
    {
      id: "b1-t8-p1",
      role: "budget_over",
      failReason: "budget",
      name: "炭酸水 500ml×24本 無糖 プレミアム",
      priceYen: 1780,
      description:
        "500ml×24本の無糖炭酸水です。購入条件は満たしますが、予算を超える商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：炭酸水",
        "味：無糖・プレーン",
        "ケース販売商品です",
        "高温・直射日光を避けて保管してください",
      ],
      prePurchaseCheck: [
        "容量・本数・味の条件が合っているか確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t8-p2",
      role: "condition_ng",
      failReason: "quantity_condition",
      name: "炭酸水 500ml×20本 無糖",
      priceYen: 1180,
      description:
        "無糖の炭酸水ですが、20本入りのため購入条件の本数を満たさない商品です。",
      specsAndNotes: [
        "内容量：500ml×20本",
        "種類：炭酸水",
        "味：無糖・プレーン",
        "ケース販売商品です",
        "高温・直射日光を避けて保管してください",
      ],
      prePurchaseCheck: [
        "容量・本数・味の条件が合っているか確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t8-p3",
      role: "correct",
      failReason: null,
      name: "炭酸水 500ml×24本 無糖",
      priceYen: 1280,
      description:
        "500ml×24本の無糖炭酸水で、購入条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：炭酸水",
        "味：無糖・プレーン",
        "ケース販売商品です",
        "日常使いしやすい標準的な商品です",
      ],
      prePurchaseCheck: [
        "容量・本数・味の条件が合っているか確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t8-p4",
      role: "dp_candidate",
      failReason: "specific_condition",
      name: "炭酸水 500ml×24本 クリアテイスト",
      priceYen: 1380,
      description:
        "商品名だけ見ると条件に近く見えますが、詳細を見ると無糖ではない商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：炭酸飲料",
        "味：レモン風味・微糖",
        "甘さを少し加えた飲みやすい仕上がりです",
        "ケース販売商品です",
        "高温・直射日光を避けて保管してください",
      ],
      prePurchaseCheck: [
        "商品名だけで判断せず、仕様や味の表記を確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
  ] satisfies Trial8Product[],
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
      priceYen: 480,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 320,
      shortDescription: "受け取り日時を指定できます",
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 180,
      shortDescription: "簡易ギフト包装を追加します",
    },
    {
      id: "bag",
      name: "手提げ袋を追加",
      priceYen: 80,
      shortDescription: "持ち運び用の手提げ袋を追加します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial8Data.products.find((product) => product.id === productId) ??
    trial8Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial8Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial8Data.options.filter((option) => optionIds.includes(option.id));
}
