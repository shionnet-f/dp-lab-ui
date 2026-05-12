export type Trial1Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "valid_but_expensive";
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

export const trial1_4Data = {
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "90日分以上であること",
    specificCondition: "マルチビタミンであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "ビタミン粒 レギュラー",
      priceYen: 1180,
      description: "毎日の栄養補助に使いやすい粒タイプの商品です。",
      specsAndNotes: [
        "日数：120日分",
        "種類：マルチビタミン",
        "形状：粒タイプ",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/medicine.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "ビタミン粒 通常タイプ",
      priceYen: 690,
      description: "日常的に使いやすい粒タイプの商品です。",
      specsAndNotes: [
        "日数：90日分",
        "種類：ビタミンC",
        "形状：粒タイプ",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/medicine.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "ビタミン粒 ベーシック",
      priceYen: 730,
      description: "継続利用しやすい粒タイプの商品です。",
      specsAndNotes: [
        "日数：90日分",
        "種類：マルチビタミン",
        "形状：粒タイプ",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/medicine.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "ビタミン粒 シンプル",
      priceYen: 780,
      description: "まとめて管理しやすい粒タイプの商品です。",
      specsAndNotes: [
        "日数：100日分",
        "種類：マルチビタミン",
        "形状：粒タイプ",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/medicine.svg",
      dpDisplay: null,
    },
  ] satisfies Trial1Product[],
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
      priceYen: 120,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 100,
      shortDescription: "プレゼント用に包装します",
    },
  ] satisfies AddonOption[],
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

export default trial1_4Data;
