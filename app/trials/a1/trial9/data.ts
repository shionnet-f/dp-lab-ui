
export type Trial9Product = {
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
    specLead?: string;
    boldPackText?: string;
    specTail?: string;
    isDpTarget?: boolean;
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

export const trial9Data = {
  purchaseConditions: {
    budgetYen: 1200,
    quantityCondition: "24本入りであること",
    specificCondition: "1本あたり500ml以上であること",
  },
  products: [
    {
      id: "a1-t9-p1",
      role: "budget_over",
      failReason: "budget",
      name: "天然水 500ml×24本 プレミアムケース",
      priceYen: 1380,
      description:
        "毎日の飲用に使いやすい定番のケース商品です。自宅用のストックにも向いています。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "販売単位：1ケース",
        "保存方法：高温・直射日光を避けて保存してください",
      ],
      prePurchaseCheck: [
        "必要な本数と内容量を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t9-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "天然水 350ml×24本 スタンダードケース",
      priceYen: 980,
      description:
        "毎日の飲用に使いやすいケース商品です。必要本数は満たしますが、1本あたりの内容量が小さい商品です。",
      specsAndNotes: [
        "内容量：350ml×24本",
        "販売単位：1ケース",
        "保存方法：高温・直射日光を避けて保存してください",
      ],
      prePurchaseCheck: [
        "1本あたりの内容量を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t9-p3",
      role: "correct",
      failReason: null,
      name: "天然水 500ml×24本 ベーシックケース",
      priceYen: 1080,
      description:
        "日常使いしやすい天然水のケース商品です。条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "販売単位：1ケース",
        "保存方法：高温・直射日光を避けて保存してください",
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
      id: "a1-t9-p4",
      role: "dp_candidate",
      failReason: "quantity_condition",
      name: "天然水 人気ケース",
      priceYen: 1120,
      description:
        "すっきり飲みやすい天然水のケース商品です。詳細情報の見せ方に注意が必要な商品です。",
      specsAndNotes: [
        "ケース単位での販売商品です",
        "保存方法：高温・直射日光を避けて保存してください",
      ],
      prePurchaseCheck: [
        "内容量と本数を詳細画面で確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: {
        specLead: "ケース単位での販売商品で、普段使いしやすいサイズ感が案内されています。",
        boldPackText: "500ml × 12本",
        specTail: "という構成が目に入りやすい案内ですが、実際の内容量は350mlボトルが12本のセットです。容量を確認したうえで選択してください。",
        isDpTarget: true,
      },
    },
  ] satisfies Trial9Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 200, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 500, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "当日便", priceYen: 800, shortDescription: "本日中のお届けが可能です" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 300, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "gift", name: "ギフト包装", priceYen: 200, shortDescription: "プレゼント用に包装します" },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial9Data.products.find((product) => product.id === productId) ??
    trial9Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial9Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial9Data.options.filter((option) => optionIds.includes(option.id));
}
