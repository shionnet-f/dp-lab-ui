export type Trial10Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "valid_but_expensive" | "dp_target";
  failReason: "budget" | "quantity_condition" | "specific_condition" | "not_lowest" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string;
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

export type Trial10Data = {
  trialId?: string;
  dpType?: string;
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial10Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial10Data: Trial10Data = {
  trialId: "b1-trial10",
  dpType: "商品詳細dialogの仕様・補足に、購入条件情報を改行や箇条書きなしの連続した文章で埋め込む",
  purchaseConditions: {
    budgetYen: 2000,
    quantityCondition: "5枚以上であること",
    specificCondition: "綿100%であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "フェイスタオル レギュラー",
      priceYen: 2280,
      description: "日常使いしやすいフェイスタオルです。",
      specsAndNotes: "標準サイズのフェイスタオルで、綿100%の生地を使った5枚セットとして案内されています。吸水性を重視した仕様で、家庭内のまとめ使いにも向いています。",
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/towel.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "フェイスタオル 通常タイプ",
      priceYen: 1760,
      description: "扱いやすいフェイスタオルです。",
      specsAndNotes: "日常使いしやすいフェイスタオルで、綿100%の生地を使った5枚セットです。洗面所や浴室での使用を想定した標準的な仕様です。",
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/towel.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "dp_target",
      failReason: "not_lowest",
      name: "フェイスタオル 標準タイプ",
      priceYen: 1620,
      description: "家庭で使いやすいフェイスタオルです。",
      specsAndNotes: "家庭内で使いやすいフェイスタオルのおまとめセットとして案内されており、今回の構成は綿100%の生地を使用した5枚セットで、洗面所や入浴後などの日常使いを想定した標準サイズです。吸水性を重視した仕様ですが、パッケージ表面では素材や枚数が強く強調されていません。",
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/towel.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "correct",
      failReason: null,
      name: "フェイスタオル ベーシック",
      priceYen: 1480,
      description: "毎日の使用に適したフェイスタオルです。",
      specsAndNotes: "綿100%のフェイスタオル5枚セットです。標準サイズで、洗面所や浴室での使用に向いています。",
      prePurchaseCheck: [
          "使用環境に合うか確認してください",
          "商品仕様は購入前にご確認ください"
        ],
      deliveryInfo: [
          "配送方法は購入手続き画面で選択できます",
          "地域によりお届け日が異なる場合があります"
        ],
      imageSrc: "/images/products/towel.png",
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
      priceYen: 300,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 250,
      shortDescription: "プレゼント用に包装します",
    }
  ],
};

export function getProductById(productId?: string) {
  return (
    trial10Data.products.find((product) => product.id === productId) ??
    trial10Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial10Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial10Data.options.filter((option) => optionIds.includes(option.id));
}
