export type Trial10Product = {
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
  dpDisplay?: {
    originalPriceYen?: number;
    displayPriceYen?: number;
    isDiscountTarget?: boolean;
  } | null;
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

export const trial10Data = {
  purchaseConditions: {
    budgetYen: 3400,
    quantityCondition: "A4で合計2500枚以上であること",
    specificCondition: "普通紙であること",
  },
  products: [
    {
      id: "p3",
      role: "dp_target",
      failReason: "not_lowest",
      name: "コピー用紙 標準タイプ",
      priceYen: 3020,
      description: "日常業務に使いやすいコピー用紙です。",
      specsAndNotes: [
        "サイズ：A4",
        "枚数：500枚×5冊（合計2500枚）",
        "用紙種類：普通紙",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/copy-paper.png",
      dpDisplay: {
        originalPriceYen: 3580,
        displayPriceYen: 3020,
        isDiscountTarget: true,
      },
    },
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "コピー用紙 レギュラー",
      priceYen: 3980,
      description: "事務作業に使いやすいコピー用紙です。",
      specsAndNotes: [
        "サイズ：A4",
        "枚数：500枚×6冊（合計3000枚）",
        "用紙種類：普通紙",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/copy-paper.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "コピー用紙 通常タイプ",
      priceYen: 3100,
      description: "まとめて使いやすいコピー用紙です。",
      specsAndNotes: [
        "サイズ：A4",
        "枚数：500枚×5冊（合計2500枚）",
        "用紙種類：普通紙",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/copy-paper.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "correct",
      failReason: null,
      name: "コピー用紙 ベーシック",
      priceYen: 2880,
      description: "普段使いしやすいコピー用紙です。",
      specsAndNotes: [
        "サイズ：A4",
        "枚数：500枚×5冊（合計2500枚）",
        "用紙種類：普通紙",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/copy-paper.png",
      dpDisplay: null,
    },
  ] satisfies Trial10Product[],
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
      priceYen: 350,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 350,
      shortDescription: "プレゼント用に包装します",
    },
  ] satisfies AddonOption[],
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

export default trial10Data;
