"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackAction } from "@/app/actions/track";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getTrialPath } from "@/app/trials/_lib/path";
import { OrderItemPanel } from "@/app/trials/_components/a2TrialComponents/CheckoutOrderItemPanel";
import { getProductById, getShippingPrice, trial9Data } from "../data";
import { getClientLogBase } from "@/lib/log/clientLogBase";
function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");
  if (trialsIndex >= 0) return segments[trialsIndex + 2] ?? null;
  const setIdIndex = segments.findIndex((segment) => ["a1", "a2", "b1", "b2"].includes(segment));
  return setIdIndex >= 0 ? segments[setIdIndex + 1] ?? null : null;
}

const confirmPath = getTrialPath("b2", "trial9", "confirm");
const productPath = getTrialPath("b2", "trial9", "product");

type Props = { searchParams: Promise<{ productId?: string; shipping?: string; options?: string | string[]; set?: string; trial?: string; }>; };
function normalizeOptions(options?: string | string[]) { if (!options) return []; return Array.isArray(options) ? options : [options]; }
function yen(n: number) { return new Intl.NumberFormat("ja-JP").format(n); }

export default function CheckoutPageB2Trial9({ searchParams }: Props) {
  const sp = use(searchParams); const selectedProduct = getProductById(sp?.productId); const set = sp?.set; const trial = sp?.trial;
  const [shipping, setShipping] = useState<string | null>(sp?.shipping ?? null); const [options, setOptions] = useState<string[]>(normalizeOptions(sp?.options)); 
  const didTrack = useRef(false); const router = useRouter();
  function createLogBase() { const p = new URLSearchParams(); if (set) p.set("set", set); if (trial) p.set("trial", trial); return getClientLogBase({ searchParams: p }); }
  useEffect(() => { if (didTrack.current) return; didTrack.current = true; const baseLog = createLogBase(); void trackAction({ ...baseLog, phase: "main", page: "checkout", type: "page_view", meta: { implTrialId: getImplTrialId() }, payload: { productId: selectedProduct.id } }); }, []);
  function toggleOption(id: string) { setOptions(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]); }
  const selectedShippingMethod = trial9Data.shippingMethods.find((method) => method.id === shipping) ?? null;
  const selectedOptionItems = trial9Data.options.filter((option) => options.includes(option.id));
  const productPrice = selectedProduct.priceYen; const shippingPrice = shipping ? getShippingPrice(selectedProduct.id, shipping) : 0; const optionTotalPrice = selectedOptionItems.reduce((sum, option) => sum + option.priceYen, 0); const totalPrice = productPrice + shippingPrice + optionTotalPrice;
  if (!set || !trial) return <main className="flex h-screen items-center justify-center bg-gray-50"><div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">URLに set または trial がありません。</div></main>;
  return <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50"><div className="h-full w-full"><TrialPageHeader purchaseConditions={trial9Data.purchaseConditions} title="購入手続き" /><form onSubmit={async (e) => { e.preventDefault(); const baseLog = createLogBase(); await trackAction({ ...baseLog, phase: "main", page: "checkout", type: "checkout_submit", meta: { implTrialId: getImplTrialId() }, payload: { productId: selectedProduct.id, productPrice, shippingId: shipping, shippingPrice, optionIds: options, optionTotalPrice, totalPrice } }); const params = new URLSearchParams(); params.set("productId", selectedProduct.id); params.set("set", set); params.set("trial", trial); params.set("shipping", shipping ?? ""); options.forEach(id => params.append("options", id)); router.push(`${confirmPath}?${params.toString()}`); }} className="mx-auto h-[915px] w-[1160px] overflow-hidden"><OrderItemPanel product={selectedProduct} /><div className="h-[60px]"/><section className="grid h-[438px] w-[1160px] grid-cols-[550px_550px] gap-[60px] overflow-hidden"><article className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><h2 className="text-base font-semibold text-gray-900">配送方法</h2><p className="mt-2 text-sm text-gray-500">選択商品に応じた送料が表示されます</p><div className="mt-[42px] space-y-[32px]">{trial9Data.shippingMethods.map((method) => <label key={method.id} className="flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700"><input type="radio" name="shippingRadio" checked={shipping === method.id} onChange={() => { setShipping(method.id); const baseLog = createLogBase(); void trackAction({ ...baseLog, phase: "main", page: "checkout", type: "shipping_select", meta: { implTrialId: getImplTrialId() }, payload: { shippingId: method.id, priceYen: getShippingPrice(selectedProduct.id, method.id) } }); }}/><div className="min-w-0 flex-1"><div className="font-medium text-gray-900">{method.name}</div><div className="truncate text-gray-600">{method.shortDescription}</div></div><span className="text-gray-900">¥{yen(getShippingPrice(selectedProduct.id, method.id))}</span></label>)}</div></article><article className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><h2 className="text-base font-semibold text-gray-900">追加オプション</h2><p className="mt-2 text-sm text-gray-500">選択商品に応じた送料が表示されます</p><div className="mt-[42px] space-y-[32px]">{trial9Data.options.map((option) => { const selected = options.includes(option.id); return <label key={option.id} className="flex h-[66px] items-center gap-3 rounded-md border border-gray-200 px-4 text-sm text-gray-700"><input type="checkbox" checked={selected} onChange={() => { toggleOption(option.id); const baseLog = createLogBase(); void trackAction({ ...baseLog, phase: "main", page: "checkout", type: "option_toggle", meta: { implTrialId: getImplTrialId() }, payload: { optionId: option.id, selected: !selected, priceYen: option.priceYen } }); }}/><div className="min-w-0 flex-1"><div className="font-medium text-gray-900">{option.name}</div><div className="truncate text-gray-600">{option.shortDescription}</div></div><span className="text-gray-900">+¥{yen(option.priceYen)}</span></label>; })}</div></article></section><div className="h-[60px]"/><div className="flex h-[60px] w-[1160px] items-center gap-[60px]"><button type="button" onClick={async () => { const baseLog = createLogBase(); await trackAction({ ...baseLog, phase: "main", page: "checkout", type: "checkout_back", meta: { implTrialId: getImplTrialId() }, payload: { productId: selectedProduct.id } }); router.push(`${productPath}?set=${set}&trial=${trial}`); }} className="flex h-[50px] w-[550px] items-center justify-center border border-gray-300 bg-white text-[16px] font-semibold text-gray-700">商品一覧へ戻る</button><button type="submit" className="flex h-[50px] w-[550px] items-center justify-center bg-black text-[16px] font-semibold text-white">次へ進む</button></div><div className="h-[137px]"/></form></div></main>;
}
