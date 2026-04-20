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
    budgetYen: 600,
    quantityCondition: "4ロール以上であること",
    specificCondition: "1ロール70カット以上であること",
  },
  products: [
    {
      id: "b2-t2-p1",
      role: "budget_over",
      failReason: "budget",
      name: "キッチンペーパー 6ロール 80カット プレミアム",
      priceYen: 680,
      description: "6ロール入りで1ロールあたり80カットのキッチンペーパーです。購入条件は満たしますが予算を超えます。",
      specsAndNotes: ["内容：6ロール", "1ロールあたり：80カット", "タイプ：パルプ素材"],
      prePurchaseCheck: ["予算内に収まるか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t2-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "キッチンペーパー 4ロール 60カット ベーシック",
      priceYen: 398,
      description: "4ロール入りのキッチンペーパーです。価格は安いですが、1ロールあたりのカット数が条件を満たしません。",
      specsAndNotes: ["内容：4ロール", "1ロールあたり：60カット", "タイプ：再生紙"],
      prePurchaseCheck: ["購入条件のカット数を満たしているか確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t2-p3",
      role: "correct",
      failReason: null,
      name: "キッチンペーパー 4ロール 70カット スタンダード",
      priceYen: 498,
      description: "4ロール入りで1ロールあたり70カットのキッチンペーパーです。条件を満たす中で最も安い商品です。",
      specsAndNotes: ["内容：4ロール", "1ロールあたり：70カット", "タイプ：パルプ素材"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: null,
    },
    {
      id: "b2-t2-p4",
      role: "dp_candidate",
      failReason: null,
      name: "キッチンペーパー 5ロール 75カット やわらか",
      priceYen: 560,
      description: "5ロール入りで1ロールあたり75カットのキッチンペーパーです。条件は満たしますが、正解商品よりやや高い商品です。",
      specsAndNotes: ["内容：5ロール", "1ロールあたり：75カット", "タイプ：やわらかパルプ"],
      prePurchaseCheck: ["条件に合う商品か確認してから選択してください", "購入手続き画面で配送方法や金額を最終確認できます"],
      deliveryInfo: ["配送方法は購入手続き画面で選択できます", "地域によりお届け日が異なる場合があります"],
      dpDisplay: { label: "詳細情報あり" },
    },
  ] satisfies Trial2Product[],
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
  return trial2Data.products.find((product) => product.id === productId) ?? trial2Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial2Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial2Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial2Data;
