
"use client"
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackAction } from "@/app/actions/track";

export default function ProductPage() {
    const didTrack = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (didTrack.current) return;
        didTrack.current = true;

        trackAction({
            page: "test",
            type: "page_view",
            meta: {},
            payload: {},
        });
    }, []);

    return (
        <>
            <div>product page</div>
            {/* 
            <button
                className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white"
                onClick={async () => {
                    await trackAction({
                        page: "product",
                        type: "product_select",
                        payload: { productId: product.id, },
                    });
                    router.push(
                        `/trials/a1/trial1-1/checkout?set=${set}&productId=${product.id}`
                    );
                }} > 購入へ
            </button>
            );
         */}
        </>
    )
}

