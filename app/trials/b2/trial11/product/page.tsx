"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trial11Data } from "../data";
import { trackAction } from "@/app/actions/track";
import { getTrialPath } from "@/app/trials/_lib/path";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getClientLogBase } from "@/lib/log/clientLogBase";
function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");
  if (trialsIndex >= 0) return segments[trialsIndex + 2] ?? null;
  const setIdIndex = segments.findIndex((segment) => ["a1", "a2", "b1", "b2"].includes(segment));
  return setIdIndex >= 0 ? segments[setIdIndex + 1] ?? null : null;
}

const checkoutPath = getTrialPath("b2", "trial11", "checkout");

function yen(n: number) { return new Intl.NumberFormat("ja-JP").format(n); }

type Product = (typeof trial11Data.products)[number];

function NestedInfoModal({ title, body, onClose }: { title: string; body: readonly string[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50">
      <div className="h-[360px] w-[620px] overflow-hidden rounded-lg bg-white p-[30px] shadow-2xl">
        <div className="flex h-[50px] items-center justify-between border-b border-gray-200">
          <h3 className="text-[22px] font-bold text-gray-900">{title}</h3>
          <button type="button" onClick={onClose} className="h-[36px] w-[90px] border border-gray-300 bg-white text-[14px] font-semibold text-gray-700">閉じる</button>
        </div>
        <div className="mt-[30px] h-[230px] overflow-hidden text-[16px] leading-[32px] text-gray-700">
          {body.map((line) => <p key={line} className="truncate">{line}</p>)}
        </div>
      </div>
    </div>
  );
}

function ProductDetail({ product, set, trial }: { product: Product; set: string; trial: string }) {
  const dialogId = `product-dialog-${product.id}`;
  const router = useRouter();
  const [nested, setNested] = useState<null | { title: string; body: readonly string[] }>(null);
  function createLogBase() { const p = new URLSearchParams(); p.set("set", set); p.set("trial", trial); return getClientLogBase({ searchParams: p }); }
  function openDialog() { const baseLog = createLogBase(); void trackAction({ ...baseLog, phase: "main", page: "product", type: "view_detail", meta: { implTrialId: getImplTrialId() }, payload: { productId: product.id } }); (document.getElementById(dialogId) as HTMLDialogElement | null)?.showModal(); }
  function closeDialog() { const baseLog = createLogBase(); void trackAction({ ...baseLog, phase: "main", page: "product", type: "close_detail", meta: { implTrialId: getImplTrialId() }, payload: { productId: product.id } }); (document.getElementById(dialogId) as HTMLDialogElement | null)?.close(); }
  function openNested(title: string, body: readonly string[]) { const baseLog = createLogBase(); void trackAction({ ...baseLog, phase: "main", page: "product", type: "open_nested_detail", meta: { implTrialId: getImplTrialId() }, payload: { productId: product.id, section: title } }); setNested({ title, body }); }
  return <>
    <button type="button" onClick={openDialog} className="flex h-[40px] w-[110px] items-center justify-center border border-gray-300 bg-white text-[15px] font-medium text-gray-700">詳細を見る</button>
    <dialog id={dialogId} className="fixed left-[470px] top-[110px] h-[860px] w-[980px] overflow-hidden rounded-lg p-0 backdrop:bg-black/70">
      <div className="h-full w-full overflow-hidden bg-white">
        <div className="flex h-[70px] items-center justify-between border-b border-gray-300 px-[40px]"><h2 className="text-[24px] font-semibold text-gray-900">商品詳細</h2><button type="button" onClick={closeDialog} className="h-[40px] w-[100px] border border-gray-300 bg-white text-[15px] font-medium text-gray-700">閉じる</button></div>
        <section className="h-[160px] border-b border-gray-200 px-[40px]"><div className="grid h-full grid-cols-[200px_1fr_180px]"><div className="flex h-full items-center justify-center"><div className="flex h-[120px] w-[160px] items-center justify-center rounded-md bg-gray-100 text-[14px] text-gray-400">画像</div></div><div className="h-full min-w-0 px-[20px]"><div className="h-[10px]"/><div className="flex h-[30px] items-center overflow-hidden"><h3 className="truncate text-[22px] font-semibold text-gray-900">{product.name}</h3></div><div className="h-[80px]"/><div className="flex h-[30px] items-center"><p className="text-[22px] font-semibold text-gray-900">¥{yen(product.priceYen)}</p></div></div></div></section>
        <div className="h-[60px]"/>
        <section className="grid h-[190px] grid-cols-[1fr_1fr] gap-[60px] px-[40px]">
          <button type="button" onClick={() => openNested("商品説明", [product.description] as const)} className="h-full border border-gray-300 bg-white p-[20px] text-left"><h3 className="text-[18px] font-semibold text-gray-900">商品説明</h3><p className="mt-[35px] text-[15px] text-gray-600">クリックして詳細を表示</p></button>
          <button type="button" onClick={() => openNested("仕様・補足", product.specsAndNotes)} className="h-full border border-gray-300 bg-white p-[20px] text-left"><h3 className="text-[18px] font-semibold text-gray-900">仕様・補足</h3><p className="mt-[35px] text-[15px] text-gray-600">クリックして詳細を表示</p></button>
        </section>
        <div className="h-[60px]"/>
        <section className="grid h-[190px] grid-cols-[1fr_1fr] gap-[60px] px-[40px]">
          <button type="button" onClick={() => openNested("購入前の確認", product.prePurchaseCheck)} className="h-full border border-gray-300 bg-white p-[20px] text-left"><h3 className="text-[18px] font-semibold text-gray-900">購入前の確認</h3><p className="mt-[35px] text-[15px] text-gray-600">クリックして詳細を表示</p></button>
          <button type="button" onClick={() => openNested("配送情報", product.deliveryInfo)} className="h-full border border-gray-300 bg-white p-[20px] text-left"><h3 className="text-[18px] font-semibold text-gray-900">配送情報</h3><p className="mt-[35px] text-[15px] text-gray-600">クリックして詳細を表示</p></button>
        </section>
        <div className="h-[60px]"/>
        <div className="flex h-[60px] items-center justify-center px-[40px]"><button type="button" onClick={async () => { const baseLog = createLogBase(); await trackAction({ ...baseLog, phase: "main", page: "product", type: "product_select", meta: { implTrialId: getImplTrialId() }, payload: { productId: product.id, source: "detail_modal" } }); router.push(`${checkoutPath}?set=${set}&trial=${trial}&productId=${product.id}`); }} className="h-[50px] w-[360px] bg-black text-[16px] font-semibold text-white">この商品を選ぶ</button></div>
      </div>
    </dialog>
    {nested && <NestedInfoModal title={nested.title} body={nested.body} onClose={() => setNested(null)} />}
  </>;
}

export default function ProductPageB2Trial11() {
  const searchParams = useSearchParams(); const set = searchParams.get("set"); const trial = searchParams.get("trial"); const didTrack = useRef(false);
  useEffect(() => { if (didTrack.current) return; didTrack.current = true; const baseLog = getClientLogBase({ searchParams }); void trackAction({ ...baseLog, phase: "main", page: "product", type: "page_view", meta: { implTrialId: getImplTrialId() }, payload: {} }); }, []);
  if (!set || !trial) return <main className="flex h-screen items-center justify-center bg-gray-50"><div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">URLに set または trial がありません。</div></main>;
  return <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50"><div className="h-full w-full"><TrialPageHeader purchaseConditions={trial11Data.purchaseConditions} title="商品一覧" /><section className="mx-auto flex h-[820px] w-[1160px] flex-col gap-[60px] overflow-hidden">{trial11Data.products.map((product) => <article key={product.id} className="h-full w-full overflow-hidden rounded-lg border border-gray-300 bg-white"><div className="grid h-full grid-cols-[520px_280px_360px]"><div className="h-full min-w-0 pl-[60px] pr-[20px]"><div className="h-[10px]"/><div className="flex h-[30px] min-w-0 items-center overflow-hidden"><h2 className="truncate text-[20px] font-semibold text-gray-900">{product.name}</h2></div><div className="h-[80px]"/><div className="flex h-[30px] items-center overflow-hidden"><p className="text-[20px] font-semibold text-gray-900">¥{yen(product.priceYen)}</p></div></div><div/><div className="flex h-full items-center justify-center"><ProductDetail product={product} set={set} trial={trial} /></div></div></article>)}</section><div className="h-[95px]" /></div></main>;
}
