export type Trial9Product = {
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
    emphasizedVolumeText?: string;
    actualVolumeText?: string;
    isDpTarget?: boolean;
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

export const trial9Data = {
  purchaseConditions: {
    budgetYen: 1900,
    quantityCondition: "24本入りであること",
    specificCondition: "1本あたり500ml以上であること",
  },
  products: [
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "緑茶 レギュラー",
      priceYen: 1980,
      description: "毎日の飲用に使いやすい緑茶です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：緑茶",
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
      imageSrc: "/images/products/petbottle.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "緑茶 通常タイプ",
      priceYen: 1680,
      description: "自宅用のストックに使いやすい緑茶です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：緑茶",
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
      imageSrc: "/images/products/petbottle.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "緑茶 ベーシック",
      priceYen: 1620,
      description: "日常使いしやすい緑茶です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：緑茶",
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
      imageSrc: "/images/products/petbottle.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "dp_target",
      failReason: "quantity_condition",
      name: "緑茶 標準タイプ",
      priceYen: 1580,
      description: "すっきり飲みやすい緑茶です。",
      specsAndNotes: [
        "内容量：350ml×12本",
        "種類：緑茶",
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
      imageSrc: "/images/products/petbottle.png",
      dpDisplay: {
        emphasizedVolumeText: "500mlクラスの使いやすさ",
        actualVolumeText: "内容量：350ml×12本",
        isDpTarget: true,
      },
    },
  ] satisfies Trial9Product[],
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
      priceYen: 200,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 150,
      shortDescription: "プレゼント用に包装します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial9Data.products.find((product) => product.id === productId) ??
    trial9Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial9Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial9Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial9Data;
