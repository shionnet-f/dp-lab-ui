export type Trial2Product = {
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
  hiddenDetailsTitle?: string;
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
  trialId: "b1-trial2",
  dpType: "商品詳細 dialog の中でさらに詳細を隠す",
  purchaseConditions: {
    budgetYen: 1000,
    quantityCondition: "12ロール以上であること",
    specificCondition: "ダブルタイプであること",
  },
  products: [
    {
      id: "b1-t2-p1",
      role: "budget_over",
      failReason: "budget",
      name: "トイレットペーパー ダブル 12ロール プレミアム",
      priceYen: 1080,
      description: "浴室やトイレ空間になじみやすい、やわらかな使い心地のダブルタイプです。12ロール入りの商品です。",
      specsAndNotes: [
        "入数：12ロール",
        "タイプ：ダブル",
        "紙幅：114mm",
        "香り付き",
      ],
      hiddenDetailsTitle: "さらに詳細",
      prePurchaseCheck: [
        "必要なロール数とタイプを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
    },
    {
      id: "b1-t2-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "トイレットペーパー シングル 12ロール",
      priceYen: 698,
      description: "12ロール入りで価格は抑えめですが、シングルタイプの商品です。",
      specsAndNotes: [
        "入数：12ロール",
        "タイプ：シングル",
        "紙幅：114mm",
        "無香料",
      ],
      hiddenDetailsTitle: "さらに詳細",
      prePurchaseCheck: [
        "ダブルタイプかどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
    },
    {
      id: "b1-t2-p3",
      role: "correct",
      failReason: null,
      name: "トイレットペーパー ダブル 12ロール ベーシック",
      priceYen: 728,
      description: "日常使いしやすいダブルタイプの12ロール商品です。条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "入数：12ロール",
        "タイプ：ダブル",
        "紙幅：114mm",
        "無香料",
      ],
      hiddenDetailsTitle: "さらに詳細",
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
    },
    {
      id: "b1-t2-p4",
      role: "dp_candidate",
      failReason: null,
      name: "トイレットペーパー ダブル 12ロール やわらか仕上げ",
      priceYen: 860,
      description: "ダブルタイプの12ロール商品です。条件を満たしますが、正解商品より少し高い価格です。",
      specsAndNotes: [
        "入数：12ロール",
        "タイプ：ダブル",
        "紙幅：114mm",
        "やわらか仕上げ",
      ],
      hiddenDetailsTitle: "さらに詳細",
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
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
      priceYen: 400,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 500,
      shortDescription: "希望日時にあわせてお届け",
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 100,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "まとめ買い保護包装",
      priceYen: 150,
      shortDescription: "輸送時に商品を保護する包装を追加します",
    },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return trial2Data.products.find((product) => product.id === productId) ?? trial2Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial2Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial2Data.options.filter((option) => optionIds.includes(option.id));
}
