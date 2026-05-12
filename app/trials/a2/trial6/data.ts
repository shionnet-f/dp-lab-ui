export type Trial6Product = {
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
  dpDisplay?: { kind: "countdown"; initialSeconds: number } | null;
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

export const trial6Data = {
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "400ml×3本以上であること",
    specificCondition: "衣類用であること",
  },
  products: [
    {
      id: "p3",
      role: "dp_target",
      failReason: "not_lowest",
      name: "漂白剤 標準タイプ",
      priceYen: 740,
      description: "日常使いしやすい漂白剤です。",
      specsAndNotes: [
        "内容量：410ml×3本",
        "用途：衣類用",
        "種類：漂白剤",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/laundry-detergent.svg",
      dpDisplay: {
        kind: "countdown",
        initialSeconds: 161,
      },
    },
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "漂白剤 レギュラー",
      priceYen: 1080,
      description: "毎日の洗濯に使いやすい漂白剤です。",
      specsAndNotes: [
        "内容量：450ml×3本",
        "用途：衣類用",
        "種類：漂白剤",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/laundry-detergent.svg",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "漂白剤 通常タイプ",
      priceYen: 790,
      description: "まとめて使いやすい漂白剤です。",
      specsAndNotes: [
        "内容量：420ml×3本",
        "用途：衣類用",
        "種類：漂白剤",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/laundry-detergent.svg",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "correct",
      failReason: null,
      name: "漂白剤 ベーシック",
      priceYen: 680,
      description: "家庭で使いやすい漂白剤です。",
      specsAndNotes: [
        "内容量：400ml×3本",
        "用途：衣類用",
        "種類：漂白剤",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/laundry-detergent.svg",
      dpDisplay: null,
    },
  ] satisfies Trial6Product[],
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
      priceYen: 130,
      shortDescription: "プレゼント用に包装します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial6Data.products.find((product) => product.id === productId) ??
    trial6Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial6Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial6Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial6Data;
