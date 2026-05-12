export type Trial1_4Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "valid_but_expensive" | "dp_target";
  failReason: "budget" | "quantity_condition" | "specific_condition" | "not_lowest" | null;
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

export type Trial1_4Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial1_4Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial1_4Data: Trial1_4Data = {
  purchaseConditions: {
    budgetYen: 700,
    quantityCondition: "200ml以上であること",
    specificCondition: "肌用であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "虫よけスプレー レギュラー",
      priceYen: 780,
      description: "日常使いしやすい商品です。",
      specsAndNotes: [
          "容量：220ml",
          "用途：肌用",
          "タイプ：スプレー"
        ],
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/spray-can.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "虫よけスプレー 通常タイプ",
      priceYen: 360,
      description: "扱いやすい標準的な商品です。",
      specsAndNotes: [
          "容量：200ml",
          "用途：衣類用",
          "タイプ：スプレー"
        ],
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/spray-can.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "虫よけスプレー ベーシック",
      priceYen: 420,
      description: "毎日の使用に適した商品です。",
      specsAndNotes: [
          "容量：200ml",
          "用途：肌用",
          "タイプ：スプレー"
        ],
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/spray-can.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "虫よけスプレー シンプル",
      priceYen: 480,
      description: "幅広い場面で使いやすい商品です。",
      specsAndNotes: [
          "容量：220ml",
          "用途：肌用",
          "タイプ：スプレー"
        ],
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/spray-can.png",
      dpDisplay: null,
    }
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
    }
  ],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 120,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 100,
      shortDescription: "プレゼント用に包装します",
    }
  ],
};

export function getProductById(productId?: string) {
  return (
    trial1_4Data.products.find((product) => product.id === productId) ??
    trial1_4Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_4Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_4Data.options.filter((option) => optionIds.includes(option.id));
}
