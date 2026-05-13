export type Trial3Product = {
    id: string;
    role:
    | "budget_over"
    | "condition_ng"
    | "correct"
    | "valid_but_expensive"
    | "dp_target";
    failReason:
    | "budget"
    | "quantity_condition"
    | "specific_condition"
    | "not_lowest"
    | null;
    name: string;
    priceYen: number;
    description: string;
    specsAndNotes: string[];
    prePurchaseCheck: string[];
    deliveryInfo: string[];
    imageSrc: string;
    dpDisplay?: { rating: number; reviewCount?: number } | null;
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

export const trial3Data = {
    purchaseConditions: {
        budgetYen: 10000,
        quantityCondition: "連続再生時間が6時間以上であること",
        specificCondition: "ノイズキャンセリング機能があること",
    },
    products: [
        {
            id: "p1",
            role: "budget_over",
            failReason: "budget",
            name: "ワイヤレスイヤホン EA-740X",
            priceYen: 11400,
            description: "日常利用に向いたワイヤレスイヤホンです。",
            specsAndNotes: [
                "連続再生時間：8時間",
                "ノイズキャンセリング：あり",
                "接続：Bluetooth",
            ],
            prePurchaseCheck: [
                "使用環境に合うか確認してください",
                "商品仕様は購入前にご確認ください",
            ],
            deliveryInfo: [
                "配送方法は購入手続き画面で選択できます",
                "地域によりお届け日が異なる場合があります",
            ],
            imageSrc: "/images/products/earphones.png",
            dpDisplay: {
                rating: 4.7,
                reviewCount: 421,
            },
        },
        {
            id: "p2",
            role: "dp_target",
            failReason: "not_lowest",
            name: "ワイヤレスイヤホン EW-620R",
            priceYen: 8480,
            description: "音楽や通話に使いやすいワイヤレスイヤホンです。",
            specsAndNotes: [
                "連続再生時間：7時間",
                "ノイズキャンセリング：あり",
                "接続：Bluetooth",
            ],
            prePurchaseCheck: [
                "使用環境に合うか確認してください",
                "商品仕様は購入前にご確認ください",
            ],
            deliveryInfo: [
                "配送方法は購入手続き画面で選択できます",
                "地域によりお届け日が異なる場合があります",
            ],
            imageSrc: "/images/products/earphones.png",
            dpDisplay: {
                rating: 4.8,
                reviewCount: 512,
            },
        },
        {
            id: "p3",
            role: "correct",
            failReason: null,
            name: "ワイヤレスイヤホン EC-310B",
            priceYen: 7580,
            description: "持ち運びしやすいワイヤレスイヤホンです。",
            specsAndNotes: [
                "連続再生時間：6時間",
                "ノイズキャンセリング：あり",
                "接続：Bluetooth",
            ],
            prePurchaseCheck: [
                "使用環境に合うか確認してください",
                "商品仕様は購入前にご確認ください",
            ],
            deliveryInfo: [
                "配送方法は購入手続き画面で選択できます",
                "地域によりお届け日が異なる場合があります",
            ],
            imageSrc: "/images/products/earphones.png",
            dpDisplay: {
                rating: 3.9,
                reviewCount: 64,
            },
        },
        {
            id: "p4",
            role: "valid_but_expensive",
            failReason: "not_lowest",
            name: "ワイヤレスイヤホン EP-580S",
            priceYen: 8980,
            description: "幅広い場面で使いやすいワイヤレスイヤホンです。",
            specsAndNotes: [
                "連続再生時間：8時間",
                "ノイズキャンセリング：あり",
                "接続：Bluetooth",
            ],
            prePurchaseCheck: [
                "使用環境に合うか確認してください",
                "商品仕様は購入前にご確認ください",
            ],
            deliveryInfo: [
                "配送方法は購入手続き画面で選択できます",
                "地域によりお届け日が異なる場合があります",
            ],
            imageSrc: "/images/products/earphones.png",
            dpDisplay: {
                rating: 4.3,
                reviewCount: 128,
            },
        },
    ] satisfies Trial3Product[],
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
            priceYen: 2300,
            shortDescription: "破損・紛失時の補償を追加します",
        },
        {
            id: "gift",
            name: "ギフト包装",
            priceYen: 2200,
            shortDescription: "プレゼント用に包装します",
        },
    ] satisfies AddonOption[],
};

export function getProductById(productId?: string) {
    return (
        trial3Data.products.find((product) => product.id === productId) ??
        trial3Data.products[0]
    );
}

export function getShippingById(shippingId?: string) {
    return (
        trial3Data.shippingMethods.find((method) => method.id === shippingId) ??
        null
    );
}

export function getOptionsByIds(optionIds: string[]) {
    return trial3Data.options.filter((option) => optionIds.includes(option.id));
}

export default trial3Data;