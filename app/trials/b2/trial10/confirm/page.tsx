"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackAction } from "@/app/actions/track";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getTrialPath } from "@/app/trials/_lib/path";
import { ConfirmOrderItemPanel } from "@/app/trials/_components/a2TrialComponents/ConfirmOrderItemPanel";
import { ConfirmShippingSection } from "@/app/trials/_components/a2TrialComponents/ConfirmShippingSection";
import { ConfirmOptionSection } from "@/app/trials/_components/a2TrialComponents/ConfirmOptionSection";
import { ConfirmSummaryPanel } from "@/app/trials/_components/a2TrialComponents/ConfirmSummaryPanel";
import { getOptionsByIds, getProductById, getShippingById, trial10Data } from "../data";
import { getClientLogBase } from "@/lib/log/clientLogBase";
function getImplTrialId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const trialsIndex = segments.indexOf("trials");

  if (trialsIndex >= 0) {
    return segments[trialsIndex + 2] ?? null;
  }

  const setIdIndex = segments.findIndex((segment) => ["a1", "a2", "b1", "b2"].includes(segment));
  return setIdIndex >= 0 ? segments[setIdIndex + 1] ?? null : null;
}

const completePath = getTrialPath("b2", "trial10", "complete");
const checkoutPath = getTrialPath("b2", "trial10", "checkout");

type Props = { searchParams: Promise<{ productId?: string; shipping?: string; options?: string | string[]; set?: string; trial?: string; }>; };
function normalizeOptions(options?: string | string[]) { if (!options) return []; return Array.isArray(options) ? options : [options]; }

export default function ConfirmPageB2Trial10({ searchParams }: Props) {
  const sp = use(searchParams); const router = useRouter(); const didTrack = useRef(false); const [error, setError] = useState(false);
  const productId = sp?.productId; const shippingId = sp?.shipping; const optionIds = normalizeOptions(sp?.options); const set = sp?.set; const trial = sp?.trial;
  function createLogBase() { const logParams = new URLSearchParams(); if (set) logParams.set("set", set); if (trial) logParams.set("trial", trial); return getClientLogBase({ searchParams: logParams }); }
  useEffect(() => { if (didTrack.current) return; didTrack.current = true; const baseLog = createLogBase(); void trackAction({ ...baseLog, phase: "main", page: "confirm", type: "page_view", meta: { implTrialId: getImplTrialId() }, payload: {} }); }, []);
  if (!set || !trial) return <main className="flex h-screen items-center justify-center bg-gray-50"><div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">URLに set または trial がありません。</div></main>;
  const selectedProduct = getProductById(productId); const shippingInfo = getShippingById(shippingId); const selectedOptions = getOptionsByIds(optionIds);
  const productPriceYen = selectedProduct.priceYen; const shippingPriceYen = shippingInfo?.priceYen ?? 0; const optionTotalYen = selectedOptions.reduce((sum, option) => sum + option.priceYen, 0); const totalYen = productPriceYen + shippingPriceYen + optionTotalYen;
  const backParams = new URLSearchParams(); backParams.set("productId", selectedProduct.id); backParams.set("set", set); backParams.set("trial", trial); backParams.set("shipping", shippingId ?? ""); optionIds.forEach((id) => backParams.append("options", id));
  const completeParams = new URLSearchParams(backParams);
  async function handleConfirmSubmit() { if (!shippingInfo) { setError(true); const baseLog = createLogBase(); void trackAction({ ...baseLog, phase: "main", page: "confirm", type: "confirm_submit_missing_shipping", meta: { implTrialId: getImplTrialId() }, payload: { productId: selectedProduct.id, shippingId, optionIds, productPriceYen, shippingPriceYen, optionTotalYen, totalYen } }); window.setTimeout(() => setError(false), 2500); return; } const baseLog = createLogBase(); await trackAction({ ...baseLog, phase: "main", page: "confirm", type: "confirm_submit", meta: { implTrialId: getImplTrialId() }, payload: { productId: selectedProduct.id, shippingId, optionIds, productPriceYen, shippingPriceYen, optionTotalYen, totalYen } }); router.push(`${completePath}?${completeParams.toString()}`); }
  async function handleBack() { const baseLog = createLogBase(); await trackAction({ ...baseLog, phase: "main", page: "confirm", type: "confirm_back", meta: { implTrialId: getImplTrialId() }, payload: { productId: selectedProduct.id, shippingId, optionIds, productPriceYen, shippingPriceYen, optionTotalYen, totalYen } }); router.push(`${checkoutPath}?${backParams.toString()}`); }
  return <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50"><div className="h-full w-full"><TrialPageHeader purchaseConditions={trial10Data.purchaseConditions} title="最終確認" />{error && <div className="fixed left-1/2 top-6 z-50 w-[420px] -translate-x-1/2 rounded-lg border border-red-300 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-lg">配送方法を選択してください</div>}<div className="mx-auto h-[810px] w-[1160px] overflow-hidden"><ConfirmOrderItemPanel product={selectedProduct} /><div className="h-[60px]" /><section className="grid h-[145px] w-[1160px] grid-cols-[550px_550px] gap-[60px] overflow-hidden"><ConfirmShippingSection shippingInfo={shippingInfo} /><ConfirmOptionSection selectedOptions={selectedOptions} optionTotalYen={optionTotalYen} /></section><div className="h-[60px]" /><ConfirmSummaryPanel productPriceYen={productPriceYen} shippingPriceYen={shippingPriceYen} optionTotalYen={optionTotalYen} totalYen={totalYen} /><div className="h-[60px]" /><div className="flex h-[60px] w-[1160px] items-center gap-[60px]"><button type="button" onClick={handleBack} className="flex h-[50px] w-[550px] items-center justify-center border border-gray-300 bg-white text-[16px] font-semibold text-gray-700">戻る</button><button type="button" onClick={handleConfirmSubmit} className="flex h-[50px] w-[550px] items-center justify-center bg-black text-[16px] font-semibold text-white">購入を確定する</button></div></div><div className="h-[105px]" /></div></main>;
}
