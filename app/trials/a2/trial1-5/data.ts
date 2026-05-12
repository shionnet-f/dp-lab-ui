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

export const trial1_5Data = {
  purchaseConditions: {
    budgetYen: 2200,
    quantityCondition: "56錠以上であること",
    specificCondition: "眠くなりにくいタイプであること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "花粉対策薬 AG-X12",
      priceYen: 2480,
      description: "花粉の季節に使いやすい錠剤タイプの商品です。",
      specsAndNotes: [
        "内容量：56錠",
        "特徴：眠くなりにくいタイプ",
        "形状：錠剤",
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
      name: "花粉対策薬 AC-N27",
      priceYen: 1760,
      description: "日常的に使いやすい錠剤タイプの商品です。",
      specsAndNotes: [
        "内容量：60錠",
        "特徴：通常タイプ",
        "形状：錠剤",
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
      name: "花粉対策薬 AL-E18",
      priceYen: 1880,
      description: "季節の備えに使いやすい錠剤タイプの商品です。",
      specsAndNotes: [
        "内容量：56錠",
        "特徴：眠くなりにくいタイプ",
        "形状：錠剤",
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
      name: "花粉対策薬 AL-E32",
      priceYen: 1980,
      description: "継続利用しやすい錠剤タイプの商品です。",
      specsAndNotes: [
        "内容量：60錠",
        "特徴：眠くなりにくいタイプ",
        "形状：錠剤",
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
      priceYen: 300,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 250,
      shortDescription: "プレゼント用に包装します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial1_5Data.products.find((product) => product.id === productId) ??
    trial1_5Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_5Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_5Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial1_5Data;
