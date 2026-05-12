export type Trial5Product = {
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

export const trial5Data = {
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "2L以上であること",
    specificCondition: "詰め替え用であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "食器用洗剤 レギュラー",
      priceYen: 1580,
      description: "毎日の食器洗いに使いやすい洗剤です。",
      specsAndNotes: [
        "内容量：2.2L",
        "形態：詰め替え用",
        "種類：食器用洗剤",
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
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "食器用洗剤 通常タイプ",
      priceYen: 1260,
      description: "日常使いしやすい食器用洗剤です。",
      specsAndNotes: [
        "内容量：2.4L",
        "形態：詰め替え用",
        "種類：食器用洗剤",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/shampoo.svg",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "食器用洗剤 ベーシック",
      priceYen: 1080,
      description: "家庭で使いやすい食器用洗剤です。",
      specsAndNotes: [
        "内容量：2.0L",
        "形態：詰め替え用",
        "種類：食器用洗剤",
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
      role: "dp_target",
      failReason: "not_lowest",
      name: "食器用洗剤 標準タイプ",
      priceYen: 1180,
      description: "扱いやすい詰め替え用の食器用洗剤です。",
      specsAndNotes: [
        "内容量：2.1L",
        "形態：詰め替え用",
        "種類：食器用洗剤",
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
      dpDisplay: {
        label: "本日限定タイムセール",
      },
    },
  ] satisfies Trial5Product[],
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
      priceYen: 250,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 220,
      shortDescription: "プレゼント用に包装します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial5Data.products.find((product) => product.id === productId) ??
    trial5Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial5Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial5Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial5Data;
