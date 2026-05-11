export type Trial4Product = {
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

export type Trial4Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial4Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial4Data: Trial4Data = {
  purchaseConditions: {
    budgetYen: 20000,
    quantityCondition: "画面サイズが23インチ以上であること",
    specificCondition: "解像度が1920×1080以上であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "フルHDモニター NX-380",
      priceYen: 21400,
      description: "在宅作業や日常使いに向いた24インチモニターです。",
      specsAndNotes: [
        "台数：1台",
        "画面サイズ：21.5インチ",
        "解像度：1920×1080",
      ],
      prePurchaseCheck: [
        "設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/monitor.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "dp_target",
      failReason: "not_lowest",
      name: "人気モニター LX-214",
      priceYen: 18600,
      description: "見やすさと設置性を両立した24インチモニターです。",
      specsAndNotes: [
        "台数：1台",
        "画面サイズ：24インチ",
        "解像度：1920×1080",
      ],
      prePurchaseCheck: [
        "設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/monitor.svg",
      dpDisplay: {
        label: "残り3点",
      },
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "スタンダードモニター PX-126",
      priceYen: 17600,
      description: "作業にも動画視聴にも使いやすい23.8インチモニターです。",
      specsAndNotes: [
        "台数：1台",
        "画面サイズ：23.8インチ",
        "解像度：1920×1080",
      ],
      prePurchaseCheck: [
        "設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/monitor.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "ベゼルレスモニター RX-452",
      priceYen: 19200,
      description: "画面まわりがすっきりした24インチモニターです。",
      specsAndNotes: [
        "台数：1台",
        "画面サイズ：24インチ",
        "解像度：1920×1080",
      ],
      prePurchaseCheck: [
        "設置場所に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/monitor.svg",
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
      priceYen: 3000,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 2800,
      shortDescription: "プレゼント用に包装します",
    },
  ],
};

export function getProductById(productId?: string) {
  return (
    trial4Data.products.find((product) => product.id === productId) ??
    trial4Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial4Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial4Data.options.filter((option) => optionIds.includes(option.id));
}