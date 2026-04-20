export type Trial7Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
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

export const trial7Data = {
  purchaseConditions: {
    budgetYen: 1500,
    quantityCondition: "64GB以上であること",
    specificCondition: "USB 3.0以上に対応していること",
  },
  products: [
    {
      id: "b2-t7-p1",
      role: "budget_over",
      failReason: "budget",
      name: "USBメモリ 128GB USB 3.2 プレミアム",
      priceYen: 1680,
      description: "128GBでUSB 3.2に対応したUSBメモリです。条件は満たしますが、予算を超える商品です。",
      specsAndNotes: [
        "容量：128GB",
        "対応規格：USB 3.2 Gen1",
        "端子：USB Type-A",
      ],
      prePurchaseCheck: [
        "予算内に収まるかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b2-t7-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "USBメモリ 64GB USB 2.0 スタンダード",
      priceYen: 980,
      description: "64GBのUSBメモリですが、USB 2.0対応で条件を満たさない商品です。",
      specsAndNotes: [
        "容量：64GB",
        "対応規格：USB 2.0",
        "端子：USB Type-A",
      ],
      prePurchaseCheck: [
        "USB 3.0以上に対応しているか確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b2-t7-p3",
      role: "correct",
      failReason: null,
      name: "USBメモリ 64GB USB 3.0 ベーシック",
      priceYen: 1180,
      description: "条件を満たす中で最も安いUSBメモリです。",
      specsAndNotes: [
        "容量：64GB",
        "対応規格：USB 3.0",
        "端子：USB Type-A",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "b2-t7-p4",
      role: "dp_candidate",
      failReason: null,
      name: "USBメモリ 128GB USB 3.1 高速転送",
      priceYen: 1380,
      description: "条件は満たしますが、正解商品よりやや高いUSBメモリです。",
      specsAndNotes: [
        "容量：128GB",
        "対応規格：USB 3.1",
        "端子：USB Type-A",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
  ] satisfies Trial7Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 0, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 300, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "日時指定便", priceYen: 200, shortDescription: "受け取り日時を指定できます" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 150, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "gift", name: "ギフト包装", priceYen: 100, shortDescription: "プレゼント用に包装します" },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return trial7Data.products.find((product) => product.id === productId) ?? trial7Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial7Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial7Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial7Data;
