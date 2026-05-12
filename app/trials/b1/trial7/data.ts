export type Trial7Product = {
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
  actualPriceYen?: number;
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

export type Trial7Data = {
  trialId?: string;
  dpType?: string;
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial7Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial7Data: Trial7Data = {
  trialId: "b1-trial7",
  dpType: "最終確認ページで初めてサブスク価格と分かるようにする",
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "1m以上であること",
    specificCondition: "USB Type-C to Type-Cであること",
  },
  products: [
    {
      id: "p1",
      role: "dp_target",
      failReason: "not_lowest",
      name: "USBケーブル レギュラー",
      priceYen: 1060,
      actualPriceYen: 1260,
      description: "充電やデータ転送に使いやすいケーブルです。",
      specsAndNotes: [
        "長さ：1.5m",
        "端子：USB Type-C to Type-C",
        "急速充電対応"
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ],
      imageSrc: "/images/products/usb-c-cable.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "USBケーブル 通常タイプ",
      priceYen: 980,
      description: "一般的な充電に使いやすいケーブルです。",
      specsAndNotes: [
        "長さ：1.5m",
        "端子：USB Type-A to Type-C",
        "急速充電対応"
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ],
      imageSrc: "/images/products/usb-c-cable.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "USBケーブル ベーシック",
      priceYen: 980,
      description: "日常使いに適したケーブルです。",
      specsAndNotes: [
        "長さ：1m",
        "端子：USB Type-C to Type-C",
        "急速充電対応"
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ],
      imageSrc: "/images/products/usb-c-cable.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "USBケーブル シンプル",
      priceYen: 1280,
      description: "取り回ししやすいケーブルです。",
      specsAndNotes: [
        "長さ：1.5m",
        "端子：USB Type-C to Type-C",
        "急速充電対応"
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください"
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります"
      ],
      imageSrc: "/images/products/usb-c-cable.svg",
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
      priceYen: 450,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 400,
      shortDescription: "プレゼント用に包装します",
    }
  ],
};

export function getProductById(productId?: string) {
  return (
    trial7Data.products.find((product) => product.id === productId) ??
    trial7Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial7Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial7Data.options.filter((option) => optionIds.includes(option.id));
}
