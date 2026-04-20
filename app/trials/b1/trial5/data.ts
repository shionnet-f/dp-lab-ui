export type Trial5Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string[];
  prePurchaseCheck: string[];
  deliveryInfo: string[];
  detailParagraphs: string[];
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
  trialId: "b1-trial5",
  dpType: "商品詳細にすべての情報をまとめて入れる",
  purchaseConditions: {
    budgetYen: 5000,
    quantityCondition: "350ml×24本以上であること",
    specificCondition: "炭酸タイプであること",
  },
  products: [
    {
      id: "b1-t5-p1",
      role: "budget_over",
      failReason: "budget",
      name: "エナジースパーク 350ml×24本 プレミアム",
      priceYen: 5480,
      description: "350ml×24本入りの炭酸タイプです。条件は満たしますが、予算を超える商品です。",
      specsAndNotes: ["容量：350ml", "入数：24本", "タイプ：炭酸", "缶タイプ"],
      prePurchaseCheck: [
        "予算内に収まるか確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      detailParagraphs: [
        "・容量：350ml × 24本入りのケース商品で、まとめ買いを前提とした内容量になっています。",
        "・種類：炭酸タイプのエナジードリンクで、強めの刺激と爽快感があり、作業前の気分転換にも向いています。",
        "・用途：日常のリフレッシュや長時間の作業前など、幅広い場面で利用しやすい商品です。",
        "・成分：カフェインを含むため、飲みすぎには注意が必要です。",
        "・保存方法：直射日光や高温多湿を避けて、できるだけ涼しい場所で保管してください。",
        "・注意点：開封後は炭酸が抜けやすいため、なるべく早めに飲み切ることを推奨します。",
        "・配送：通常配送でお届けされ、地域や配送状況により到着日数が異なる場合があります。",
        "・その他：ケース商品のため、購入前に保管スペースを確保しておくと安心です。",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t5-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "エナジーチャージ 350ml×24本 すっきりタイプ",
      priceYen: 4180,
      description: "350ml×24本入りですが、炭酸タイプではない商品です。",
      specsAndNotes: ["容量：350ml", "入数：24本", "タイプ：非炭酸", "缶タイプ"],
      prePurchaseCheck: [
        "炭酸タイプかどうかを確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      detailParagraphs: [
        "・容量：350ml × 24本入りで、ケース単位でまとめて購入できる商品です。",
        "・種類：すっきり飲みやすいエナジードリンクですが、こちらは非炭酸タイプです。",
        "・用途：炭酸が苦手な方や、刺激を控えめにしたい場面で使いやすい仕様です。",
        "・成分：カフェインを含むため、摂取量には注意してください。",
        "・保存方法：直射日光を避け、涼しい場所で保管してください。",
        "・注意点：開封後は早めに飲むことを推奨します。",
        "・配送：通常配送でお届けされ、地域によって到着日数が異なる場合があります。",
        "・その他：炭酸ではないため、爽快感は控えめです。",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t5-p3",
      role: "correct",
      failReason: null,
      name: "エナジーブースト 350ml×24本 スタンダード",
      priceYen: 4380,
      description: "350ml×24本入りの炭酸タイプで、条件を満たす中で最も安い商品です。",
      specsAndNotes: ["容量：350ml", "入数：24本", "タイプ：炭酸", "缶タイプ"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      detailParagraphs: [
        "・容量：350ml × 24本入りのケース商品で、日常的なストックにも使いやすい内容量です。",
        "・種類：炭酸タイプで、適度な刺激と飲みやすさを兼ね備えた標準的な仕様です。",
        "・用途：日常のリフレッシュや作業前の気分転換など、幅広い場面で利用できます。",
        "・成分：カフェインを含むため、過剰摂取には注意してください。",
        "・保存方法：直射日光や高温多湿を避けて保管してください。",
        "・注意点：開封後は炭酸が抜けやすいため、なるべく早く飲み切ることを推奨します。",
        "・配送：通常配送でお届けされ、地域により到着日数が異なる場合があります。",
        "・その他：ケース商品のため、保管スペースを確保しておくと扱いやすいです。",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t5-p4",
      role: "dp_candidate",
      failReason: null,
      name: "エナジーブースト 350ml×30本 ロングケース",
      priceYen: 4760,
      description: "350ml×30本入りの炭酸タイプです。条件は満たしますが、正解より少し高い商品です。",
      specsAndNotes: ["容量：350ml", "入数：30本", "タイプ：炭酸", "缶タイプ"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "購入手続き画面で配送方法や金額を確認できます",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      detailParagraphs: [
        "・容量：350ml × 30本入りで、24本以上という条件は満たしているケース商品です。",
        "・種類：炭酸タイプで、しっかりとした刺激と爽快感があるエナジードリンクです。",
        "・用途：作業前や集中したい場面などでの利用に適しており、まとめ買い向けです。",
        "・成分：カフェインを含むため、飲みすぎには注意してください。",
        "・保存方法：直射日光を避け、涼しい場所で保管してください。",
        "・注意点：開封後は炭酸が抜けやすいため、早めに飲み切ることを推奨します。",
        "・配送：通常配送でお届けされ、地域によって到着日数が異なる場合があります。",
        "・その他：価格は正解商品より少し高めですが、本数は多めです。",
      ],
      dpDisplay: null,
    },
  ] satisfies Trial5Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 300,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 650,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 480,
      shortDescription: "受け取り日時を指定できます",
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 180,
      shortDescription: "簡易ギフト包装を追加します",
    },
    {
      id: "bag",
      name: "手提げ袋を追加",
      priceYen: 80,
      shortDescription: "持ち運び用の手提げ袋を追加します",
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
    trial5Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial5Data.options.filter((option) => optionIds.includes(option.id));
}
