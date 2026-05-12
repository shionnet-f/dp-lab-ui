export type Trial2Product = {
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

export const trial2Data = {
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "2m以上であること",
    specificCondition: "4K対応であること",
  },
  products: [
    {
      id: "p4",
      role: "dp_target",
      failReason: "not_lowest",
      name: "HDMIケーブル HC-25A4K",
      priceYen: 740,
      description: "幅広い機器に使いやすいHDMIケーブルです。",
      specsAndNotes: [
        "長さ：2.5m",
        "対応：4K",
        "端子：HDMI Type-A",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/hdmi-cable.png",
      dpDisplay: {
        label: "現在 23人が見ています",
      },
    },
    {
      id: "p1",
      role: "budget_over",
      failReason: "budget",
      name: "HDMIケーブル HC-30R4K",
      priceYen: 1180,
      description: "映像機器の接続に使いやすいHDMIケーブルです。",
      specsAndNotes: [
        "長さ：3m",
        "対応：4K",
        "端子：HDMI Type-A",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/hdmi-cable.png",
      dpDisplay: null,
    },
    {
      id: "p2",
      role: "valid_but_expensive",
      failReason: "not_lowest",
      name: "HDMIケーブル HC-20N4K",
      priceYen: 780,
      description: "家庭用機器の接続に使いやすいHDMIケーブルです。",
      specsAndNotes: [
        "長さ：2m",
        "対応：4K",
        "端子：HDMI Type-A",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/hdmi-cable.png",
      dpDisplay: null,
    },
    {
      id: "p3",
      role: "correct",
      failReason: null,
      name: "HDMIケーブル HC-20B4K",
      priceYen: 680,
      description: "日常使いしやすいHDMIケーブルです。",
      specsAndNotes: [
        "長さ：2m",
        "対応：4K",
        "端子：HDMI Type-A",
      ],
      prePurchaseCheck: [
        "使用環境に合うか確認してください",
        "商品仕様は購入前にご確認ください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      imageSrc: "/images/products/hdmi-cable.png",
      dpDisplay: null,
    },
  ] satisfies Trial2Product[],
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
      priceYen: 120,
      shortDescription: "プレゼント用に包装します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial2Data.products.find((product) => product.id === productId) ??
    trial2Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial2Data.shippingMethods.find((method) => method.id === shippingId) ??
    null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial2Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial2Data;
