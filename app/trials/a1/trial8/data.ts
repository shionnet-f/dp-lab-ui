export type Trial8Product = {
  id: string;
  role: "budget_over" | "correct" | "valid_but_expensive" | "dp_target";
  failReason:
  | "budget"
  | "quantity_condition"
  | "specific_condition"
  | "not_lowest"
  | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  imageSrc: string;
  dpDisplay?: null;
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
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "黒烏龍茶 レギュラー",
      priceYen: 3480,
      description: "毎日の飲用に使いやすい黒烏龍茶です。",
      specsAndNotes: [
        "内容量：350ml×24本",
        "販売単位：1ケース",
        "茶種：黒烏龍茶",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/petbottle.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "dp_target",
      failReason: "not_lowest",
      name: "黒烏龍茶 標準タイプ",
      priceYen: 2880,
      description: "食事と合わせやすい黒烏龍茶です。",
      specsAndNotes: [
        "内容量：350ml×24本",
        "販売単位：1ケース",
        "茶種：黒烏龍茶",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/petbottle.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "黒烏龍茶 ベーシック",
      priceYen: 2680,
      description: "日常使いしやすい黒烏龍茶です。",
      specsAndNotes: [
        "内容量：350ml×24本",
        "販売単位：1ケース",
        "茶種：黒烏龍茶",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/petbottle.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "黒烏龍茶 通常タイプ",
      priceYen: 2980,
      description: "まとめ買いに使いやすい黒烏龍茶です。",
      specsAndNotes: [
        "内容量：350ml×24本",
        "販売単位：1ケース",
        "茶種：黒烏龍茶",
      ],
      prePurchaseCheck: [
        "保管場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/petbottle.png",
      dpDisplay: null,
    },
  ] satisfies Trial8Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 200,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 500,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "当日便",
      priceYen: 800,
      shortDescription: "本日中のお届けが可能です",
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 700,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 650,
      shortDescription: "プレゼント用に包装します",
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
    trial8Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial8Data.options.filter((option) => optionIds.includes(option.id));
}