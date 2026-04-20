export type Trial3Product = {
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

export const trial3Data = {
  trialId: "b1-trial3",
  dpType: "配送方法や追加オプションの金額を最終確認ページで提示する",
  purchaseConditions: {
    budgetYen: 8000,
    quantityCondition: "10kg以上であること",
    specificCondition: "白米であること",
  },
  products: [
    {
      id: "b1-t3-p1",
      role: "budget_over",
      failReason: "budget",
      name: "白米 10kg 特選ブレンド米",
      priceYen: 8280,
      description:
        "毎日の食卓で使いやすい白米10kgの商品です。条件は満たしますが、予算を超える価格です。",
      specsAndNotes: [
        "内容量：10kg",
        "種類：白米",
        "精米時期：商品ラベルに記載",
        "保存は高温多湿を避けてください",
      ],
      prePurchaseCheck: [
        "必要な重量と米の種類を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
    },
    {
      id: "b1-t3-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "無洗米 10kg 家庭用パック",
      priceYen: 6980,
      description:
        "10kg入りで価格は抑えめですが、白米ではなく無洗米の商品です。",
      specsAndNotes: [
        "内容量：10kg",
        "種類：無洗米",
        "精米時期：商品ラベルに記載",
        "保存は高温多湿を避けてください",
      ],
      prePurchaseCheck: [
        "白米かどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
    },
    {
      id: "b1-t3-p3",
      role: "correct",
      failReason: null,
      name: "白米 10kg ベーシック",
      priceYen: 6480,
      description:
        "日常使いしやすい白米10kgの商品です。条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "内容量：10kg",
        "種類：白米",
        "精米時期：商品ラベルに記載",
        "保存は高温多湿を避けてください",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
    },
    {
      id: "b1-t3-p4",
      role: "dp_candidate",
      failReason: null,
      name: "白米 10kg 食べ比べブレンド",
      priceYen: 6920,
      description:
        "白米10kgの商品です。条件を満たしますが、正解商品より少し高い価格です。",
      specsAndNotes: [
        "内容量：10kg",
        "種類：白米",
        "精米時期：商品ラベルに記載",
        "風味の異なる原料米を使用しています",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
    },
  ] satisfies Trial3Product[],
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
      shortDescription: "希望日時にあわせてお届け",
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
  return trial3Data.products.find((product) => product.id === productId) ?? trial3Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial3Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial3Data.options.filter((option) => optionIds.includes(option.id));
}
