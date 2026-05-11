"use client";

type ProductForOrder = {
  name: string;
  priceYen: number;
  imageSrc: string;
};

type OrderItemPanelProps = {
  product: ProductForOrder;
};

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

export function OrderItemPanel({ product }: OrderItemPanelProps) {
  return (
    <section className="h-[275px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="h-[15px]" />

      <h2 className="flex h-[30px] items-center px-5 text-[20px] font-bold text-gray-900">
        ご注文商品
      </h2>

      <div className="h-[15px]" />

      <div className="flex h-[200px] px-5">
        {/* 左列：画像 */}
        <div className="flex h-[200px] w-[200px] shrink-0 items-center justify-center rounded-lg bg-gray-100">
          <img
            src={product.imageSrc}
            alt=""
            className="h-[140px] w-[140px] object-contain"
          />
        </div>

        {/* 列間：60px */}
        <div className="w-[60px]" />

        {/* 右列：商品名 + 価格 */}
        <div className="h-[200px] flex-1">
          <div className="flex h-[70px] items-center overflow-hidden text-[22px] font-bold leading-[30px] text-gray-900">
            {product.name}
          </div>

          <div className="h-[60px]" />

          <div className="flex h-[70px] items-center text-[28px] font-bold text-gray-900">
            ¥{yen(product.priceYen)}
          </div>
        </div>
      </div>
    </section>
  );
}
