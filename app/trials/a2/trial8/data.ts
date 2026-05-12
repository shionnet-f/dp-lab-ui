export type Trial8Product = {
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
  dpDisplay?: {
    relativeDeltaYen?: number;
    highlight?: boolean;
  } | null;
};

export type AddonOption = {
  id: string;
  name: string;
  priceYen: number;
  shortDescription: string;
};

export type Trial8Data = {
  purchaseConditions: {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
  };
  products: Trial8Product[];
  shippingMethods: ShippingMethod[];
  options: AddonOption[];
};

export const trial8Data: Trial8Data = {
  purchaseConditions: {
    budgetYen: 3000,
    quantityCondition: "500ml×24本以上であること",
    specificCondition: "無糖であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "無糖コーヒー レギュラー",
      priceYen: 2890,
      description: "日常の飲用に使いやすいボトルコーヒーです。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：無糖コーヒー",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/water.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "無糖コーヒー 通常タイプ",
      priceYen: 2380,
      description: "まとめ買いに使いやすいボトルコーヒーです。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：無糖コーヒー",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/water.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "無糖コーヒー ベーシック",
      priceYen: 2180,
      description: "日常使いしやすいボトルコーヒーです。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：無糖コーヒー",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/water.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "無糖コーヒー 標準タイプ",
      priceYen: 2480,
      description: "食事と合わせやすいボトルコーヒーです。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：無糖コーヒー",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/water.png",
      dpDisplay: null,
    },
  ] satisfies Trial8Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 200,
      shortDescription: "3〜5日でお届け",
      dpDisplay: { relativeDeltaYen: -300, highlight: false },
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 500,
      shortDescription: "最短で翌日にお届け",
      dpDisplay: { relativeDeltaYen: 0, highlight: true },
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 800,
      shortDescription: "受け取り日時を指定できます",
      dpDisplay: { relativeDeltaYen: 300, highlight: false },
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

export default trial8Data;
