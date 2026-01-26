type ProductSummaryProps = {
  name: string;
  summary: string;
  price: number;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  shippingLabel?: string;
  imageUrl?: string;
  tags?: string[];
};

export default function ProductSummary({ name, summary, price, brand, rating, reviewCount, shippingLabel, imageUrl, tags }: ProductSummaryProps) {
  return (
    <section className="rounded-lg bg-yg-white p-6 shadow">
      <div className="grid grid-cols-12 gap-6">
        {/* 이미지 영역 */}
        <div className="col-span-5">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-yg-lightgray">
            {/* next/image 붙이기 전까지는 img로 */}
            {imageUrl ? <img src={imageUrl} alt={name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-yg-darkgray">이미지 없음</div>}
          </div>

          {/* 썸네일(선택) 자리 */}
          <div className="mt-3 flex gap-2">
            <div className="h-14 w-14 rounded-md bg-yg-lightgray" />
            <div className="h-14 w-14 rounded-md bg-yg-lightgray" />
            <div className="h-14 w-14 rounded-md bg-yg-lightgray" />
          </div>
        </div>

        {/* 텍스트/버튼 영역 */}
        <div className="col-span-7 flex flex-col">
          {/* 태그/브랜드 */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {tags?.map((t) => (
              <span key={t} className="rounded-full bg-yg-secondary px-2 py-1 text-xs font-semibold text-yg-black">
                {t}
              </span>
            ))}
            {brand && <span className="text-sm font-medium text-yg-darkgray">{brand}</span>}
          </div>

          {/* 상품명 */}
          <h1 className="text-2xl font-bold text-yg-black">{name}</h1>

          {/* 요약 */}
          <p className="mt-2 text-sm leading-6 text-yg-darkgray">{summary}</p>

          {/* 평점/리뷰 */}
          {(rating || reviewCount) && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              {rating !== undefined && <span className="font-semibold text-yg-black">★ {rating}</span>}
              {reviewCount !== undefined && <span className="text-yg-darkgray">리뷰 {reviewCount.toLocaleString()}</span>}
            </div>
          )}

          {/* 가격 */}
          <div className="mt-4">
            <p className="text-sm text-yg-darkgray">판매가</p>
            <p className="text-3xl font-extrabold text-yg-black">{price.toLocaleString()}원</p>
          </div>

          {/* 배송 */}
          {shippingLabel && <p className="mt-2 text-sm text-yg-darkgray">{shippingLabel}</p>}

          {/* 버튼 */}
          <div className="mt-auto flex gap-3 pt-6">
            <button className="flex-1 rounded-md bg-yg-primary py-3 font-semibold text-white">구매하기</button>
            <button className="flex-1 rounded-md border border-yg-lightgray bg-white py-3 font-semibold text-yg-black">장바구니</button>
          </div>
        </div>
      </div>
    </section>
  );
}
