export type Trial4Product = {
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

export const trial4Data = {
  purchaseConditions: {
    budgetYen: 30000,
    quantityCondition: "容量が6kg以上であること",
    specificCondition: "乾燥付きであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "洗濯機 レギュラー",
      priceYen: 32800,
      description: "家庭用に使いやすい洗濯機です。",
      specsAndNotes: [
        "種類：ドラム式洗濯乾燥機",
        "容量：8kg",
        "乾燥機能：あり",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "設置の有無によりお届け日が変わる場合があります",
        "地域により大型家電の配送条件が異なる場合があります",
      ],
      imageSrc: "/images/products/washing-machine.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "洗濯機 ベーシック",
      priceYen: 26800,
      description: "日常使いしやすい洗濯機です。",
      specsAndNotes: [
        "種類：洗濯乾燥機",
        "容量：6kg",
        "乾燥機能：あり",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "設置の有無によりお届け日が変わる場合があります",
        "地域により大型家電の配送条件が異なる場合があります",
      ],
      imageSrc: "/images/products/washing-machine.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "dp_target",
      failReason: "not_lowest",
      name: "洗濯機 標準タイプ",
      priceYen: 27400,
      description: "毎日の洗濯に使いやすい洗濯機です。",
      specsAndNotes: [
        "種類：洗濯乾燥機",
        "容量：7kg",
        "乾燥機能：あり",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "設置の有無によりお届け日が変わる場合があります",
        "地域により大型家電の配送条件が異なる場合があります",
      ],
      imageSrc: "/images/products/washing-machine.svg",
      dpDisplay: {
        label: "残り2点",
      },
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "洗濯機 通常タイプ",
      priceYen: 28900,
      description: "まとめ洗いにも使いやすい洗濯機です。",
      specsAndNotes: [
        "種類：洗濯乾燥機",
        "容量：7kg",
        "乾燥機能：あり",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "設置の有無によりお届け日が変わる場合があります",
        "地域により大型家電の配送条件が異なる場合があります",
      ],
      imageSrc: "/images/products/washing-machine.svg",
      dpDisplay: null,
    },
  ] satisfies Trial4Product[],
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
      name: "日時指定便",
      priceYen: 800,
      shortDescription: "受け取り日時を指定できます",
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 3500,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 3300,
      shortDescription: "プレゼント用に包装します",
    },
  ] satisfies AddonOption[],
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

export default trial4Data;
