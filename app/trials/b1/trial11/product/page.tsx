"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trial11Data, type Trial11Product } from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";

const checkoutPath = getTrialPath("b1", "trial11", "checkout");

type DetailKind = "description" | "spec" | "confirm" | null;

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type NestedInfoModalProps = {
  open: boolean;
  title: string;
  body: string[];
  onClose: () => void;
};

function NestedInfoModal({ open, title, body, onClose }: NestedInfoModalProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35">
      <div className="h-[420px] w-[560px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
        <div className="flex h-[70px] items-center justify-between border-b border-gray-200 px-[40px]">
          <h4 className="text-[18px] font-semibold text-gray-900">{title}</h4>

          <button
            type="button"
            onClick={onClose}
            className="h-[40px] w-[100px] border border-gray-300 bg-white text-[16px] text-gray-700"
          >
            閉じる
          </button>
        </div>

        <div className="h-[350px] overflow-y-auto px-[40px] py-[30px] text-[14px] leading-[24px] text-gray-700">
          <div className="space-y-[12px]">
            {body.map((line: string) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type ProductDetailModalB1Trial11Props = {
  product: Trial11Product;
  set: string;
};

function ProductDetailModalB1Trial11({
  product,
  set,
}: ProductDetailModalB1Trial11Props) {
  const dialogId = useId();
  const router = useRouter();
  const [openInner, setOpenInner] = useState<DetailKind>(null);

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center bg-gray-500 text-[16px] text-white"
        onClick={() => {
          trackAction({
            page: "product",
            type: "view_detail",
            meta: {},
            payload: { productId: product.id },
          });

          const el = document.getElementById(
            dialogId,
          ) as HTMLDialogElement | null;
          el?.showModal();
        }}
      >
        詳細を見る
      </button>

      <dialog
        id={dialogId}
        className="fixed left-[470px] top-[110px] h-[860px] w-[980px] overflow-hidden p-0 backdrop:bg-black/70"
      >
        <div className="relative h-full w-full overflow-hidden bg-white">
          <div className="flex h-[70px] items-center justify-between border-b border-gray-300 px-[60px]">
            <h2 className="text-[24px] font-semibold text-gray-900">
              商品詳細
            </h2>

            <button
              type="button"
              className="h-[40px] w-[100px] border border-gray-300 bg-white text-[16px] font-semibold text-gray-700"
              onClick={() => {
                trackAction({
                  page: "product",
                  type: "close_detail",
                  meta: {},
                  payload: { productId: product.id },
                });

                setOpenInner(null);

                const el = document.getElementById(
                  dialogId,
                ) as HTMLDialogElement | null;
                el?.close();
              }}
            >
              閉じる
            </button>
          </div>

          <div className="flex h-[790px] overflow-hidden px-[60px]">
            <div className="flex w-[400px] flex-col">
              <div className="h-[60px]" />

              <section className="flex h-[160px] items-center justify-center border border-gray-300 bg-gray-100 text-[14px] text-gray-400">
                画像エリア
              </section>

              <div className="h-[60px]" />

              <button
                type="button"
                onClick={() => {
                  setOpenInner("description");

                  trackAction({
                    page: "product",
                    type: "open_nested_detail",
                    meta: {},
                    payload: {
                      productId: product.id,
                      detailKind: "description",
                    },
                  });
                }}
                className="h-[160px] overflow-hidden border border-gray-300 p-[16px] text-left"
              >
                <div className="flex h-[24px] items-center justify-between">
                  <h3 className="text-[16px] font-semibold leading-[24px] text-gray-900">
                    商品説明
                  </h3>
                  <span className="text-[12px] text-gray-500">
                    クリックして詳細を表示
                  </span>
                </div>

                <div className="mt-[12px] h-[92px] overflow-hidden text-[14px] leading-[22px] text-gray-600"></div>
              </button>

              <div className="h-[60px]" />

              <button
                type="button"
                onClick={() => {
                  setOpenInner("spec");

                  trackAction({
                    page: "product",
                    type: "open_nested_detail",
                    meta: {},
                    payload: {
                      productId: product.id,
                      detailKind: "spec",
                    },
                  });
                }}
                className="h-[160px] overflow-hidden border border-gray-300 p-[16px] text-left"
              >
                <div className="flex h-[24px] items-center justify-between">
                  <h3 className="text-[16px] font-semibold leading-[24px] text-gray-900">
                    仕様・補足
                  </h3>
                  <span className="text-[12px] text-gray-500">
                    クリックして詳細を表示
                  </span>
                </div>

                <div className="mt-[12px] h-[92px] overflow-hidden text-[14px] leading-[22px] text-gray-600"></div>
              </button>
            </div>

            <div className="w-[60px]" />

            <div className="flex w-[400px] flex-col">
              <div className="h-[60px]" />

              <div className="h-[35px]" aria-hidden="true" />

              <div className="h-[60px]" />

              <h3 className="h-[35px] overflow-hidden text-[20px] font-bold leading-[35px] text-gray-900">
                {product.name}
              </h3>

              <div className="h-[60px]" />

              <p className="h-[35px] text-[22px] font-semibold leading-[35px] text-gray-900">
                ¥{yen(product.priceYen)}
              </p>

              <div className="h-[60px]" />

              <button
                type="button"
                onClick={() => {
                  setOpenInner("confirm");

                  trackAction({
                    page: "product",
                    type: "open_nested_detail",
                    meta: {},
                    payload: {
                      productId: product.id,
                      detailKind: "confirm",
                    },
                  });
                }}
                className="h-[120px] overflow-hidden border border-gray-300 p-[16px] text-left"
              >
                <div className="flex h-[24px] items-center justify-between">
                  <h4 className="text-[16px] font-semibold leading-[24px] text-gray-900">
                    購入前の確認
                  </h4>
                  <span className="text-[12px] text-gray-500">
                    クリックして詳細を表示
                  </span>
                </div>

                <div className="mt-[12px] h-[56px] overflow-hidden text-[14px] leading-[22px] text-gray-700"></div>
              </button>

              <div className="h-[60px]" />

              <section className="h-[120px] overflow-hidden border border-gray-300 p-[16px]">
                <h4 className="mb-[12px] text-[16px] font-semibold text-gray-900">
                  配送に関わる情報
                </h4>

                <div className="text-[14px] leading-[22px] text-gray-700">
                  {product.deliveryInfo.map((line: string) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </section>

              <div className="h-[60px]" />

              <button
                type="button"
                className="flex h-[50px] items-center justify-center bg-black text-[16px] font-semibold text-white"
                onClick={async () => {
                  await trackAction({
                    page: "product",
                    type: "product_select",
                    meta: {},
                    payload: { productId: product.id },
                  });

                  router.push(
                    `${checkoutPath}?set=${set}&trial=${trial}&productId=${product.id}`,
                  );
                }}
              >
                購入へ
              </button>

              <div className="h-[60px]" />
            </div>
          </div>

          <NestedInfoModal
            open={openInner === "description"}
            title="商品説明の詳細"
            body={[
              product.description,
              "見た目だけでなく、用途やレイアウトも確認してから選択してください。",
            ]}
            onClose={() => setOpenInner(null)}
          />

          <NestedInfoModal
            open={openInner === "spec"}
            title="仕様・補足の詳細"
            body={product.specsAndNotes}
            onClose={() => setOpenInner(null)}
          />

          <NestedInfoModal
            open={openInner === "confirm"}
            title="購入前の確認の詳細"
            body={product.prePurchaseCheck}
            onClose={() => setOpenInner(null)}
          />
        </div>
      </dialog>
    </>
  );
}

type ProductCardB1Trial11Props = {
  product: Trial11Product;
  set: string;
};

function ProductCardB1Trial11({ product, set }: ProductCardB1Trial11Props) {
  const router = useRouter();

  return (
    <article className="h-[378px] w-[550px] rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex h-full flex-col px-[60px]">
        <div className="h-[15px]" />

        <h2 className="h-[42px] overflow-hidden text-[20px] font-semibold leading-[42px] text-gray-900">
          {product.name}
        </h2>

        <div className="h-[60px]" />

        <p className="h-[42px] overflow-hidden text-[22px] font-semibold leading-[42px] text-gray-900">
          ¥{yen(product.priceYen)}
        </p>

        <div className="h-[60px]" />

        <div className="h-[42px] overflow-hidden">
          <div className="h-full w-full" aria-hidden="true" />
        </div>

        <div className="h-[60px]" />

        <div className="grid h-[42px] grid-cols-2 gap-[60px]">
          <ProductDetailModalB1Trial11 product={product} set={set} trial={trial} />

          <button
            className="flex items-center justify-center bg-gray-500 text-[16px] text-white"
            onClick={async () => {
              await trackAction({
                page: "product",
                type: "product_select",
                meta: {},
                payload: { productId: product.id },
              });

              router.push(`${checkoutPath}?set=${set}&trial=${trial}&productId=${product.id}`);
            }}
          >
            購入へ
          </button>
        </div>

        <div className="h-[15px]" />
      </div>
    </article>
  );
}

export default function ProductPageB1Trial11() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set");
  const trial = searchParams.get("trial");

  const didTrack = useRef(false);

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    trackAction({
      page: "product",
      type: "page_view",
      meta: {},
      payload: {},
    });
  }, []);

  if (!set || !trial) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">
          URLに set または trial がありません。
        </div>
      </main>
    );
  }

  const products: Trial11Product[] = trial11Data.products;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader
          purchaseConditions={trial11Data.purchaseConditions}
          title="商品一覧"
        />

        {/* 商品カード領域：378px + 60px + 378px */}
        <section className="mx-auto grid h-[816px] w-[1160px] grid-cols-2 grid-rows-[378px_378px] gap-x-[60px] gap-y-[60px] overflow-hidden">
          {products.map((product: Trial11Product) => (
            <ProductCardB1Trial11
              key={product.id}
              product={product}
              set={set}
            />
          ))}
        </section>

        {/* 99pxの空間 */}
        <div className="h-[99px]" />
      </div>
    </main>
  );
}
