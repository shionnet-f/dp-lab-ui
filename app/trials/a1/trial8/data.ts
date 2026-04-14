
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
  purchaseConditions: {
    budgetYen: 3500,
    quantityCondition: "350ml×24本以上であること",
    specificCondition: "1ケース販売であること",
  },
  products: [
    {
      id: "a1-t8-p1",
      role: "budget_over",
      failReason: "budget",
      name: "黒烏龍茶 350ml×24本 プレミアムケース",
      priceYen: 3680,
      description:
        "毎日の飲用に使いやすい黒烏龍茶のケース商品です。まとめ買い向けの定番モデルです。",
      specsAndNotes: ["内容量：350ml×24本", "販売単位：1ケース", "茶種：黒烏龍茶"],
      prePurchaseCheck: [
        "必要な本数とケース販売かどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t8-p2",
      role: "condition_ng",
      failReason: "quantity_condition",
      name: "黒烏龍茶 350ml×12本 ハーフケース",
      priceYen: 1780,
      description:
        "飲み切りやすい本数で購入できる黒烏龍茶です。少量購入向けの商品です。",
      specsAndNotes: ["内容量：350ml×12本", "販売単位：1ケース", "茶種：黒烏龍茶"],
      prePurchaseCheck: [
        "24本以上入っているかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t8-p3",
      role: "correct",
      failReason: null,
      name: "黒烏龍茶 350ml×24本 スタンダードケース",
      priceYen: 2980,
      description:
        "日常使いしやすい黒烏龍茶の1ケース商品です。条件を満たす中で最も安い商品です。",
      specsAndNotes: ["内容量：350ml×24本", "販売単位：1ケース", "茶種：黒烏龍茶"],
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
      id: "a1-t8-p4",
      role: "dp_candidate",
      failReason: null,
      name: "黒烏龍茶 350ml×24本 人気ケース",
      priceYen: 3180,
      description:
        "黒烏龍茶をまとめて購入できる人気の1ケース商品です。条件を満たす中ではやや高めです。",
      specsAndNotes: ["内容量：350ml×24本", "販売単位：1ケース", "茶種：黒烏龍茶"],
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
  ] satisfies Trial8Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 500, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 800, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "当日便", priceYen: 700, shortDescription: "本日中のお届けが可能です" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 300, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "gift", name: "ギフト包装", priceYen: 200, shortDescription: "プレゼント用に包装します" },
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
