
export type Trial10Product = {
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
    originalPriceYen?: number;
    discountLabel?: string;
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

export const trial10Data = {
  purchaseConditions: {
    budgetYen: 3400,
    quantityCondition: "A4で合計2500枚以上であること",
    specificCondition: "普通紙であること",
  },
  products: [
    {
      id: "a2-t10-p1",
      role: "budget_over",
      failReason: "budget",
      name: "A4コピー用紙 500枚×6冊 高白色",
      priceYen: 3980,
      description: "A4で合計3000枚の普通紙ですが、予算3,400円を超える商品です。",
      specsAndNotes: [
        "サイズ：A4",
        "枚数：500枚×6冊（合計3000枚）",
        "用紙種類：普通紙",
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
      id: "a2-t10-p2",
      role: "condition_ng",
      failReason: "specific_condition",
      name: "A4コピー用紙 500枚×6冊 マット紙",
      priceYen: 3180,
      description: "合計3000枚ですが、普通紙ではなくマット紙のため条件を満たしません。",
      specsAndNotes: [
        "サイズ：A4",
        "枚数：500枚×6冊（合計3000枚）",
        "用紙種類：マット紙",
      ],
      prePurchaseCheck: [
        "サイズや枚数だけでなく、用紙種類も確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: null,
    },
    {
      id: "a2-t10-p3",
      role: "correct",
      failReason: null,
      name: "A4コピー用紙 500枚×5冊 スタンダード",
      priceYen: 2980,
      description: "A4で合計2500枚の普通紙で、条件を満たす中で最も安い商品です。",
      specsAndNotes: [
        "サイズ：A4",
        "枚数：500枚×5冊（合計2500枚）",
        "用紙種類：普通紙",
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
      id: "a2-t10-p4",
      role: "dp_candidate",
      failReason: null,
      name: "A4コピー用紙 500枚×5冊 おすすめパック",
      priceYen: 3280,
      description: "A4で合計2500枚の普通紙です。価格表示が強調されている商品です。",
      specsAndNotes: [
        "サイズ：A4",
        "枚数：500枚×5冊（合計2500枚）",
        "用紙種類：普通紙",
      ],
      prePurchaseCheck: [
        "最終的な価格を確認してから選択してください",
        "購入手続き画面で配送方法や金額を最終確認できます",
      ],
      deliveryInfo: [
        "通常配送は3〜5日でお届けします",
        "地域や天候により到着が前後する場合があります",
      ],
      dpDisplay: {
        originalPriceYen: 3980,
        highlight: true,
      },
    },
  ] satisfies Trial10Product[],
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
  return trial10Data.products.find((product) => product.id === productId) ?? trial10Data.products[0];
}

export function getShippingById(shippingId?: string) {
  return trial10Data.shippingMethods.find((method) => method.id === shippingId) ?? null;
}

export function getOptionsByIds(optionIds: string[]) {
  return trial10Data.options.filter((option) => optionIds.includes(option.id));
}
