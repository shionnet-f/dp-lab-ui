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

export const trial1_1Data = {
  purchaseConditions: {
    budgetYen: 800,
    quantityCondition: "1.2L以上であること",
    specificCondition: "泡タイプの詰め替え用であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "泡ハンドソープ レギュラー",
      priceYen: 880,
      description: "日常使いしやすいハンドソープです。",
      specsAndNotes: [
        "内容量：1500ml",
        "形態：泡タイプの詰め替え用",
        "香り：せっけん",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "ハンドソープ 通常タイプ",
      priceYen: 620,
      description: "手洗い用に使いやすいハンドソープです。",
      specsAndNotes: [
        "内容量：1400ml",
        "形態：液体タイプの詰め替え用",
        "香り：せっけん",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "泡ハンドソープ ベーシック",
      priceYen: 540,
      description: "家庭で使いやすいハンドソープです。",
      specsAndNotes: [
        "内容量：1200ml",
        "形態：泡タイプの詰め替え用",
        "香り：シトラス",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "泡ハンドソープ シンプル",
      priceYen: 580,
      description: "扱いやすい詰め替え用ハンドソープです。",
      specsAndNotes: [
        "内容量：1300ml",
        "形態：泡タイプの詰め替え用",
        "香り：無香料",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
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
      priceYen: 150,
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
    trial1_1Data.products.find((product) => product.id === productId) ??
    trial1_1Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial1_1Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial1_1Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial1_1Data;
