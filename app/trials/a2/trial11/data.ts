export type Trial11Product = {
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
    showFreeShipping?: boolean;
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

export const trial11Data = {
  purchaseConditions: {
    budgetYen: 900,
    quantityCondition: "1000ml以上であること",
    specificCondition: "詰め替え用であること",
  },
  products: [
    {
      id: "p2",
      role: "budget_over",
      failReason: "budget",
      name: "ボディソープ スタンダードセット",
      priceYen: 980,
      description: "まとめ買いに使いやすいボディソープです。",
      specsAndNotes: [
        "内容量：1200ml",
        "タイプ：詰め替え用",
        "香り：フローラル",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "通常配送は送料無料です",
        "地域や天候により到着が前後する場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
      dpDisplay: null,
    },
    {
      id: "p1",
      role: "dp_target",
      failReason: "not_lowest",
      name: "ボディソープ レギュラーセット",
      priceYen: 820,
      description: "毎日の入浴に使いやすいボディソープです。",
      specsAndNotes: [
        "内容量：1100ml",
        "タイプ：詰め替え用",
        "香り：無香料",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "通常配送は送料無料です",
        "地域や天候により到着が前後する場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
      dpDisplay: {
        showFreeShipping: true,
      },
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "ボディソープ ベーシックセット",
      priceYen: 760,
      description: "日常使いしやすいボディソープです。",
      specsAndNotes: [
        "内容量：1000ml",
        "タイプ：詰め替え用",
        "香り：せっけん",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "通常配送は送料無料です",
        "地域や天候により到着が前後する場合があります",
      ],
      imageSrc: "/images/products/fabric-softener.png",
      dpDisplay: null,
    },
    {
      id: "p4",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "ボディソープ シンプルセット",
      priceYen: 860,
      description: "扱いやすい容量のボディソープです。",
      specsAndNotes: [
        "内容量：1200ml",
        "タイプ：詰め替え用",
        "香り：シトラス",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "通常配送は送料無料です",
        "地域や天候により到着が前後する場合があります",
      ],
      imageSrc: "/images/products/shampoo.svg",
      dpDisplay: null,
    },
  ] satisfies Trial11Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 0,
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
      priceYen: 180,
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
    trial11Data.products.find((product) => product.id === productId) ??
    trial11Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial11Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial11Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial11Data;
