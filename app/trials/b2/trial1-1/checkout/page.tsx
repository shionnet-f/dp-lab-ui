"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackAction } from "@/app/actions/track";
import { TrialPageHeader } from "@/app/trials/_components/TrialPageHeader";
import { getTrialPath } from "@/app/trials/_lib/path";
import { OrderItemPanel } from "@/app/trials/_components/a2TrialComponents/CheckoutOrderItemPanel";
import { ShippingMethodSection } from "@/app/trials/_components/a2TrialComponents/ShippingMethodSection";
import { OptionSection } from "@/app/trials/_components/a2TrialComponents/OptionSection";
import { getProductById, trial1_1Data } from "../data";
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

const confirmPath = getTrialPath("b2", "trial1-1", "confirm");
const productPath = getTrialPath("b2", "trial1-1", "product");

type Props = { searchParams: Promise<{ productId?: string; shipping?: string; options?: string | string[]; set?: string; trial?: string; }>; };
function normalizeOptions(options?: string | string[]) { if (!options) return []; return Array.isArray(options) ? options : [options]; }

export default function CheckoutPageB2Trial11({ searchParams }: Props) {
  const sp = use(searchParams);
  const selectedProduct = getProductById(sp?.productId);
  const set = sp?.set;
  const trial = sp?.trial;
  const [shipping, setShipping] = useState<string | null>(sp?.shipping ?? null);
  const [options, setOptions] = useState<string[]>(normalizeOptions(sp?.options));
  const didTrack = useRef(false);
  const router = useRouter();

  function createLogBase() {
    const logParams = new URLSearchParams();
    if (set) logParams.set("set", set);
    if (trial) logParams.set("trial", trial);
    return getClientLogBase({ searchParams: logParams });
  }

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;
    const baseLog = createLogBase();
    void trackAction({ ...baseLog, phase: "main", page: "checkout", type: "page_view", meta: { implTrialId: getImplTrialId() }, payload: {} });
  }, []);

  function toggleOption(value: string) {
    setOptions((prev) => prev.includes(value) ? prev.filter((optionId) => optionId !== value) : [...prev, value]);
  }

  const selectedShippingMethod = trial1_1Data.shippingMethods.find((method) => method.id === shipping) ?? null;
  const selectedOptionItems = trial1_1Data.options.filter((option) => options.includes(option.id));
  const productPrice = selectedProduct.priceYen;
  const shippingPrice = selectedShippingMethod?.priceYen ?? 0;
  const optionTotalPrice = selectedOptionItems.reduce((sum, option) => sum + option.priceYen, 0);
  const totalPrice = productPrice + shippingPrice + optionTotalPrice;

  if (!set || !trial) return <main className="flex h-screen items-center justify-center bg-gray-50"><div className="rounded-xl border border-red-200 bg-white p-6 text-red-700">URLに set または trial がありません。</div></main>;

  return (
    <main className="h-[1080px] w-[1920px] overflow-hidden bg-gray-50">
      <div className="h-full w-full">
        <TrialPageHeader purchaseConditions={trial1_1Data.purchaseConditions} title="購入手続き" />
        <form onSubmit={async (e) => {
          e.preventDefault();
          const baseLog = createLogBase();
          await trackAction({ ...baseLog, phase: "main", page: "checkout", type: "checkout_submit", meta: { implTrialId: getImplTrialId() }, payload: { productId: selectedProduct.id, productPrice, shippingId: shipping, shippingPrice, optionIds: options, optionTotalPrice, totalPrice } });
          const params = new URLSearchParams();
          params.set("productId", selectedProduct.id); params.set("set", set); params.set("trial", trial); params.set("shipping", shipping ?? "");
          options.forEach((optionId) => params.append("options", optionId));
          router.push(`${confirmPath}?${params.toString()}`);
        }} className="mx-auto h-[915px] w-[1160px] overflow-hidden">
          <input type="hidden" name="productId" value={selectedProduct.id} /><input type="hidden" name="set" value={set} /><input type="hidden" name="trial" value={trial} /><input type="hidden" name="shipping" value={shipping ?? ""} />
          {options.map((optionId) => <input key={optionId} type="hidden" name="options" value={optionId} />)}
          <OrderItemPanel product={selectedProduct} />
          <div className="h-[60px]" />
          <section className="grid h-[438px] w-[1160px] grid-cols-[550px_550px] gap-[60px] overflow-hidden">
            <ShippingMethodSection shippingMethods={trial1_1Data.shippingMethods} selectedShipping={shipping} onChangeShipping={setShipping} set={set} trial={trial} />
            <OptionSection options={trial1_1Data.options} selectedOptions={options} onToggleOption={toggleOption} set={set} trial={trial} />
          </section>
          <div className="h-[60px]" />
          <div className="flex h-[60px] w-[1160px] items-center gap-[60px]">
            <button type="button" onClick={async () => { const baseLog = createLogBase(); await trackAction({ ...baseLog, phase: "main", page: "checkout", type: "checkout_back", meta: { implTrialId: getImplTrialId() }, payload: { productId: selectedProduct.id } }); router.push(`${productPath}?set=${set}&trial=${trial}`); }} className="flex h-[50px] w-[550px] items-center justify-center border border-gray-300 bg-white text-[18px] font-bold text-gray-700">商品一覧へ戻る</button>
            <button type="submit" className="flex h-[50px] w-[550px] items-center justify-center bg-black text-[18px] font-bold text-white">次へ進む</button>
          </div>
          <div className="h-[137px]" />
        </form>
      </div>
    </main>
  );
}
