export type Trial6Product = {
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

export const trial6Data = {
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "400ml×3本以上であること",
    specificCondition: "衣類用であること",
  },
  products: [
    {
      id: "a2-t6-p1",
      role: "budget_over",
      failReason: "budget",
      name: "衣類用漂白剤 450ml×3本 しっかり消臭",
      priceYen: 1080,
      description:
        "衣類用で本数条件も満たしていますが、予算を超える商品です。",
      specsAndNotes: [
        "内容量：450ml×3本",
        "用途：衣類用",
        "液性：酸素系",
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
      id: "a2-t6-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "キッチン用漂白剤 500ml×3本 まとめ買い",
      priceYen: 840,
      description:
        "本数条件は満たしますが、キッチン用のため衣類用条件を満たしません。",
      specsAndNotes: [
        "内容量：500ml×3本",
        "用途：キッチン用",
        "液性：塩素系",
      ],
      prePurchaseCheck: [
        "衣類用かどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t6-p3",
      role: "correct",
      failReason: null,
      name: "衣類用漂白剤 400ml×3本 ベーシック",
      priceYen: 780,
      description:
        "衣類用で本数条件も満たしており、条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "内容量：400ml×3本",
        "用途：衣類用",
        "液性：酸素系",
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
      id: "a2-t6-p4",
      role: "dp_candidate",
      failReason: null,
      name: "衣類用漂白剤 420ml×3本 抗菌プラス",
      priceYen: 940,
      description:
        "衣類用で本数条件も満たす商品です。条件は満たしますが、正解商品より高い商品です。",
      specsAndNotes: [
        "内容量：420ml×3本",
        "用途：衣類用",
        "液性：酸素系",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: { kind: "countdown", initialSeconds: 120 },
    },
  ] satisfies Trial6Product[],
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
  return trial6Data.products.find((product) => product.id === productId) ?? trial6Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial6Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial6Data.options.filter((option) => optionIds.includes(option.id));
}
