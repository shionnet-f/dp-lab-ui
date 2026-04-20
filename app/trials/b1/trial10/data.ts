export type Trial10Product = {
  id: string;
  role: "budget_over" | "condition_ng" | "correct" | "dp_candidate";
  failReason: "budget" | "quantity_condition" | "specific_condition" | null;
  name: string;
  priceYen: number;
  description: string;
  specsAndNotes: string;
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

export const trial10Data = {
  trialId: "b1-trial10",
  dpType:
    "商品詳細dialogの仕様・補足に、購入条件情報を改行や箇条書きなしの連続した文章で埋め込む",
  purchaseConditions: {
    budgetYen: 2000,
    quantityCondition: "5枚以上であること",
    specificCondition: "綿100%であること",
  },
  products: [
    {
      id: "b1-t10-p1",
      role: "budget_over",
      failReason: "budget",
      name: "フェイスタオル 5枚セット 綿100% プレミアム",
      priceYen: 2280,
      description:
        "綿100%のフェイスタオル5枚セットです。条件は満たしますが、価格が予算を超えています。",
      specsAndNotes:
        "毎日の洗面や入浴後に使いやすい標準サイズのフェイスタオルで、今回は綿100%の生地を使った5枚セットとして案内されています。吸水性を重視した仕様で、家庭内のまとめ使いにも向いていますが、価格はやや高めに設定されています。洗濯後は形を整えて干してください。",
      prePurchaseCheck: [
        "枚数と素材は仕様・補足の記載をよく確認して判断してください。",
        "配送方法と追加オプションは購入手続き画面で選択できます。",
      ],
      deliveryInfo: [
        "通常配送・お急ぎ便・日時指定便から選択できます。",
        "送料は配送方法に応じて変わります。",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t10-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "フェイスタオル 5枚セット やわらか仕上げ",
      priceYen: 1580,
      description:
        "5枚セットのフェイスタオルですが、素材条件を満たしていない商品です。",
      specsAndNotes:
        "日常使いしやすいフェイスタオル5枚セットとして案内されていますが、生地は綿80%とポリエステル20%の混紡素材で作られており、乾きやすさを重視した仕様です。手触りはやわらかめですが、綿100%条件は満たしません。洗濯ネットの使用が推奨されています。",
      prePurchaseCheck: [
        "枚数だけでなく、素材が綿100%かどうかも仕様・補足で確認してください。",
        "配送方法と追加オプションは購入手続き画面で選択できます。",
      ],
      deliveryInfo: [
        "通常配送・お急ぎ便・日時指定便から選択できます。",
        "送料は配送方法に応じて変わります。",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t10-p3",
      role: "correct",
      failReason: null,
      name: "フェイスタオル 5枚セット 綿100% ベーシック",
      priceYen: 1680,
      description:
        "綿100%のフェイスタオル5枚セットで、条件を満たす中で最も安い商品です。",
      specsAndNotes:
        "家庭用として使いやすいフェイスタオルで、今回は綿100%の生地を用いた5枚セットとして案内されています。標準的な厚みで扱いやすく、洗面所や入浴後の使用に向いています。乾燥機の使用は縮みの原因になる場合があるため注意してください。",
      prePurchaseCheck: [
        "枚数と素材は仕様・補足の記載をよく確認して判断してください。",
        "配送方法と追加オプションは購入手続き画面で選択できます。",
      ],
      deliveryInfo: [
        "通常配送・お急ぎ便・日時指定便から選択できます。",
        "送料は配送方法に応じて変わります。",
      ],
      dpDisplay: null,
    },
    {
      id: "b1-t10-p4",
      role: "dp_candidate",
      failReason: null,
      name: "フェイスタオル 家庭用おまとめセット",
      priceYen: 1860,
      description:
        "家庭用のまとめ買い向けフェイスタオルです。必要な条件は仕様・補足の文章内にまとまって記載されています。",
      specsAndNotes:
        "家庭内で使いやすいフェイスタオルのおまとめセットとして案内されており、今回の構成は綿100%の生地を使用した5枚セットで、洗面所や入浴後などの日常使いを想定した標準サイズです。吸水性を重視した仕様ですが、パッケージ表面では素材や枚数が強く強調されていません。洗濯後は風通しのよい場所で干してください。",
      prePurchaseCheck: [
        "商品名だけで判断せず、仕様・補足の文章全体を確認してから選んでください。",
        "配送方法と追加オプションは購入手続き画面で選択できます。",
      ],
      deliveryInfo: [
        "通常配送・お急ぎ便・日時指定便から選択できます。",
        "送料は配送方法に応じて変わります。",
      ],
      dpDisplay: { label: "詳しい条件情報は仕様・補足に記載されています" },
    },
  ] satisfies Trial10Product[],
  shippingMethods: [
    {
      id: "standard",
      name: "通常配送",
      priceYen: 480,
      shortDescription: "3〜5日でお届け",
    },
    {
      id: "express",
      name: "お急ぎ便",
      priceYen: 820,
      shortDescription: "最短で翌日にお届け",
    },
    {
      id: "scheduled",
      name: "日時指定便",
      priceYen: 760,
      shortDescription: "受け取り日時を指定できます",
    },
  ] satisfies ShippingMethod[],
  options: [
    {
      id: "insurance",
      name: "配送補償オプション",
      priceYen: 300,
      shortDescription: "破損・紛失時の補償を追加します",
    },
    {
      id: "gift",
      name: "ギフト包装",
      priceYen: 200,
      shortDescription: "プレゼント用に包装します",
    },
  ] satisfies AddonOption[],
} as const;

export function getProductById(productId?: string) {
  return (
    trial10Data.products.find((product) => product.id === productId) ??
    trial10Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial10Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial10Data.options.filter((option) => optionIds.includes(option.id));
}
