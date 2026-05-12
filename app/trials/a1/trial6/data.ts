export type Trial6Product = {
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
  dpDisplay?: { showCountdown: boolean } | null;
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

export type Trial6Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial6Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial6Data: Trial6Data = {
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "2.0kg以上であること",
    specificCondition: "無香料であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "洗濯洗剤 レギュラー",
      priceYen: 1680,
      description: "毎日の洗濯に使いやすい液体洗剤です。",
      specsAndNotes: [
        "内容量：2.2kg",
        "香り：無香料",
        "タイプ：液体洗剤",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/laundry-detergent.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "洗濯洗剤 通常タイプ",
      priceYen: 1260,
      description: "日常使いしやすい詰め替え用の洗濯洗剤です。",
      specsAndNotes: [
        "内容量：2.1kg",
        "香り：無香料",
        "タイプ：濃縮液体洗剤",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/laundry-detergent.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "dp_target",
      failReason: "not_lowest",
      name: "洗濯洗剤 標準タイプ",
      priceYen: 1180,
      description: "使いやすい詰め替え用の洗濯洗剤です。",
      specsAndNotes: [
        "内容量：2.0kg",
        "香り：無香料",
        "タイプ：液体洗剤",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/laundry-detergent.svg",
      dpDisplay: {
        showCountdown: true,
      },
    },
    {
      id: "p4",
      role: "correct",
      failReason: null,
      name: "洗濯洗剤 ベーシック",
      priceYen: 1080,
      description: "家庭で使いやすい詰め替え用の洗濯洗剤です。",
      specsAndNotes: [
        "内容量：2.0kg",
        "香り：無香料",
        "タイプ：液体洗剤",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/laundry-detergent.svg",
      dpDisplay: null,
    },
  ],
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
  ],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 400,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 300,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial6Data.products.find((product) => product.id === productId) ??
    trial6Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial6Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial6Data.options.filter((option) => optionIds.includes(option.id));
}