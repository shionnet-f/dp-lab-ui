
export type Trial9Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  dpDisplay?: {
    emphasizedVolumeText?: string;
    actualVolumeText?: string;
    highlight?: boolean;
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
    budgetYen: 1800,
    quantityCondition: "24本入りであること",
    specificCondition: "1本あたり500ml以上であること",
  },
  products: [
    {
      id: "a2-t9-p1",
      role: "budget_over",
      failReason: "budget",
      name: "緑茶 500ml×24本 上質ブレンド",
      priceYen: 1980,
      description: "500ml×24本で条件を満たしますが、予算1,800円を超える商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：緑茶",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "予算内に収まるかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t9-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "緑茶 350ml×24本 すっきり仕立て",
      priceYen: 1460,
      description: "24本入りですが、1本あたり350mlのため容量条件を満たしません。",
      specsAndNotes: [
        "内容量：350ml×24本",
        "種類：緑茶",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "本数だけでなく、1本あたりの容量も確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t9-p3",
      role: "correct",
      failReason: null,
      name: "緑茶 500ml×24本 スタンダード",
      priceYen: 1680,
      description: "500ml×24本で条件を満たしており、条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "内容量：500ml×24本",
        "種類：緑茶",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t9-p4",
      role: "dp_candidate",
      failReason: "quantity_condition",
      name: "緑茶 お買い得パック",
      priceYen: 1580,
      description: "一見お得に見える商品ですが、内容量と本数を確認する必要があります。",
      specsAndNotes: [
        "内容量：350ml×12本",
        "種類：緑茶",
        "容器：ペットボトル",
      ],
      prePurchaseCheck: [
        "本数と1本あたり容量を必ず確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: {
        emphasizedVolumeText: "500ml×12本",
        actualVolumeText: "実際の内容量：350ml×12本",
        highlight: true,
      },
    },
  ] satisfies Trial9Product[],
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
      priceYen: 300,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 250,
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
      shortDescription: "簡易ギフト包装を追加します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return trial9Data.products.find((product) => product.id === productId) ?? trial9Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial9Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial9Data.options.filter((option) => optionIds.includes(option.id));
}
