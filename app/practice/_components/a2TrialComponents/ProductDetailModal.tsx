"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

type ProductForDetailModal = {
    id: string;
    name: string;
    priceYen: number;
    description: string;
    specsAndNotes: string[];
    prePurchaseCheck: string[];
    deliveryInfo: string[];
    imageSrc: string;
};

type ProductDetailModalProps = {
    product: ProductForDetailModal;
    set: string;
    nextPath: string;
    dpArea?: ReactNode;
};

function yen(n: number) {
    return new Intl.NumberFormat("ja-JP").format(n);
}

export function ProductDetailModal({
    product,
    set,
    nextPath,
    dpArea,
}: ProductDetailModalProps) {
    const dialogId = `product-dialog-${product.id}`;
    const router = useRouter();

    function closeDialog() {
        const el = document.getElementById(dialogId) as HTMLDialogElement | null;
        el?.close();
    }

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    const el = document.getElementById(dialogId) as HTMLDialogElement | null;
                    el?.showModal();
                }}
                className="flex h-[40px] w-[110px] items-center justify-center rounded-md border border-gray-300 bg-white text-[17px] font-bold text-gray-700"
            >
                詳細を見る
            </button>

            <dialog
                id={dialogId}
                className="fixed left-[470px] top-[110px] h-[860px] w-[980px] overflow-hidden rounded-md p-0 backdrop:bg-black/70"
            >
                <div className="h-full w-full overflow-hidden bg-white">
                    <div className="flex h-[70px] items-center justify-between border-b border-gray-300 px-[40px]">
                        <h2 className="text-[28px] font-bold text-gray-900">
                            商品詳細
                        </h2>

                        <button
                            type="button"
                            onClick={() => {
                                closeDialog();
                            }}
                            className="flex h-[40px] w-[100px] items-center justify-center rounded-md border border-gray-300 bg-white text-[17px] font-bold text-gray-700"
                        >
                            閉じる
                        </button>
                    </div>

                    <section className="h-[160px] border-b border-gray-200 px-[40px]">
                        <div className="grid h-full grid-cols-[200px_1fr_180px]">
                            <div className="flex h-full items-center justify-center">
                                <div className="flex h-[120px] w-[160px] items-center justify-center overflow-hidden rounded-md bg-gray-50">
                                    <img
                                        src={product.imageSrc}
                                        alt=""
                                        className="max-h-[90px] max-w-[130px] object-contain"
                                    />
                                </div>
                            </div>

                            <div className="h-full min-w-0 pl-[20px] pr-[20px]">
                                <div className="h-[10px]" />

                                <div className="flex h-[36px] min-w-0 items-center overflow-hidden">
                                    <h3 className="truncate text-[22px] font-bold text-gray-900">
                                        {product.name}
                                    </h3>
                                </div>

                                <div className="h-[54px]" />

                                <div className="flex h-[40px] items-center overflow-hidden">
                                    <p className="truncate text-[28px] font-bold text-gray-900">
                                        ¥{yen(product.priceYen)}
                                    </p>
                                </div>

                                <div className="h-[20px]" />
                            </div>

                            <div className="flex h-full items-center justify-center">
                                <div className="h-[50px] w-[160px] overflow-hidden">
                                    {dpArea ?? <div className="h-full w-full" aria-hidden="true" />}
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="h-[60px]" />

                    <section className="grid h-[190px] grid-cols-[1fr_1fr] gap-[60px] px-[40px]">
                        <div className="h-full overflow-hidden border border-gray-300 bg-white p-[20px]">
                            <div className="h-[30px]">
                                <h3 className="text-[18px] font-bold text-gray-900">
                                    商品説明
                                </h3>
                            </div>

                            <div className="h-[120px] overflow-hidden text-[15px] font-medium leading-[30px] text-gray-700">
                                <p className="line-clamp-4">{product.description}</p>
                            </div>
                        </div>

                        <div className="h-full overflow-hidden border border-gray-300 bg-white p-[20px]">
                            <div className="h-[30px]">
                                <h3 className="text-[18px] font-bold text-gray-900">
                                    仕様・補足
                                </h3>
                            </div>

                            <div className="h-[120px] overflow-hidden text-[15px] font-medium leading-[30px] text-gray-700">
                                {product.specsAndNotes.map((item) => (
                                    <p key={item} className="truncate">
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="h-[60px]" />

                    <section className="grid h-[190px] grid-cols-[1fr_1fr] gap-[60px] px-[40px]">
                        <div className="h-full overflow-hidden border border-gray-300 bg-white p-[20px]">
                            <div className="h-[30px]">
                                <h3 className="text-[18px] font-bold text-gray-900">
                                    購入前の確認
                                </h3>
                            </div>

                            <div className="h-[120px] overflow-hidden text-[15px] font-medium leading-[30px] text-gray-700">
                                {product.prePurchaseCheck.map((item) => (
                                    <p key={item} className="truncate">
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="h-full overflow-hidden border border-gray-300 bg-white p-[20px]">
                            <div className="h-[30px]">
                                <h3 className="text-[18px] font-bold text-gray-900">
                                    配送情報
                                </h3>
                            </div>

                            <div className="h-[120px] overflow-hidden text-[15px] font-medium leading-[30px] text-gray-700">
                                {product.deliveryInfo.map((item) => (
                                    <p key={item} className="truncate">
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="h-[60px]" />

                    <div className="flex h-[60px] items-center justify-center px-[40px]">
                        <button
                            type="button"
                            className="flex h-[50px] w-[360px] items-center justify-center rounded-md bg-black text-[18px] font-bold text-white"
                            onClick={() => {
                                router.push(`${nextPath}?set=${set}&productId=${product.id}`);
                            }}
                        >
                            この商品を選ぶ
                        </button>
                    </div>

                    <div className="h-[10px]" />
                </div>
            </dialog>
        </>
    );
}
