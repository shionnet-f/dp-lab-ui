export type Trial4Product = {
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

export const trial4Data = {
  purchaseConditions: {
    budgetYen: 20000,
    quantityCondition: "1台であること",
    specificCondition: "23インチ以上であること",
  },
  products: [
    {
      id: "a1-t4-p1",
      role: "budget_over",
      failReason: "budget",
      name: "フルHDモニター 24インチ スピーカー内蔵",
      priceYen: 21400,
      description:
        "在宅作業や日常使いに向いた24インチモニターです。映像出力や作業表示に幅広く対応します。",
      specsAndNotes: ["台数：1台", "画面サイズ：24インチ", "解像度：1920×1080"],
      prePurchaseCheck: [
        "予算内かを確認してから選択してください",
        "設置スペースや接続端子を確認してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t4-p2",
      role: "condition_ng",
      failReason: "quantity_condition",
      name: "省スペースモニター 21.5インチ",
      priceYen: 15800,
      description:
        "コンパクトで置きやすいモニターです。省スペース環境での利用を想定したモデルです。",
      specsAndNotes: ["台数：1台", "画面サイズ：21.5インチ", "解像度：1920×1080"],
      prePurchaseCheck: [
        "画面サイズが条件を満たすか確認してから選択してください",
        "設置スペースや接続端子を確認してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t4-p3",
      role: "correct",
      failReason: null,
      name: "スタンダードモニター 23.8インチ",
      priceYen: 17600,
      description:
        "作業にも動画視聴にも使いやすい23.8インチモニターです。基本性能を押さえた標準モデルです。",
      specsAndNotes: ["台数：1台", "画面サイズ：23.8インチ", "解像度：1920×1080"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "設置スペースや接続端子を確認してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a1-t4-p4",
      role: "dp_candidate",
      failReason: null,
      name: "人気モニター 24インチ ベゼルレス",
      priceYen: 18600,
      description:
        "見やすさと設置性を両立した24インチモニターです。日常利用に適した扱いやすいモデルです。",
      specsAndNotes: ["台数：1台", "画面サイズ：24インチ", "解像度：1920×1080"],
      prePurchaseCheck: [
        "条件に合う商品か確認してから選択してください",
        "設置スペースや接続端子を確認してください",
      ],
      deliveryInfo: [
        "配送方法は購入手続き画面で選択できます",
        "地域によりお届け日が異なる場合があります",
      ],
      dpDisplay: { label: "残り3点" },
    },
  ] satisfies Trial4Product[],
  shippingMethods: [
    { id: "standard", name: "通常配送", priceYen: 500, shortDescription: "3〜5日でお届け" },
    { id: "express", name: "お急ぎ便", priceYen: 800, shortDescription: "最短で翌日にお届け" },
    { id: "scheduled", name: "当日便", priceYen: 700, shortDescription: "受け取り日時を指定できます" },
  ] satisfies ShippingMethod[],
  options: [
    { id: "insurance", name: "配送補償オプション", priceYen: 300, shortDescription: "破損・紛失時の補償を追加します" },
    { id: "gift", name: "ギフト包装", priceYen: 200, shortDescription: "プレゼント用に包装します" },
  ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
  return (
    trial4Data.products.find((product) => product.id === productId) ??
    trial4Data.products[0]
  );
}

export function getShippingById(shippingId?: string) {
  return (
    trial4Data.shippingMethods.find((method) => method.id === shippingId) ?? null
  );
}

export function getOptionsByIds(optionIds: string[]) {
  return trial4Data.options.filter((option) => optionIds.includes(option.id));
}
