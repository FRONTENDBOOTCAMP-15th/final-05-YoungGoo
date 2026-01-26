import ProductInfoTabs from '@/components/products/ProductInfoTabs';
import ProductSummary from '@/components/products/ProductSummary';
import { productDetailMock } from '@/mock/productDetail.mock';

export default function ProductDetailPage() {
  const product = productDetailMock;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* 상단 타이틀 (확인용) */}
      <h1 className="mb-6 text-2xl font-bold text-yg-black">{product.name}</h1>

      {/* 전체 레이아웃 */}
      <section className="grid grid-cols-12 gap-6">
        {/* 좌측 영역 */}
        <div className="col-span-8 space-y-6">
          {/* 상품 요약 영역 */}
          <ProductSummary name={product.name} summary={product.summary} price={product.price} brand={product.brand} rating={product.rating} reviewCount={product.reviewCount} shippingLabel={product.shippingLabel} imageUrl={product.imageUrl} tags={product.tags} />
          {/* 탭 영역 */}
          <ProductInfoTabs active="features" />
          {/* 상세 섹션 영역 */}
          <div className="rounded-lg bg-yg-white p-6 shadow">
            <p className="mb-2 text-sm text-yg-darkgray">상세 정보 섹션 영역</p>
            <ul className="list-disc pl-5 text-yg-black">
              {product.features.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 우측 구매 카드 영역 */}
        <aside className="col-span-4">
          <div className="sticky top-20 rounded-lg bg-yg-white p-6 shadow">
            <p className="text-sm text-yg-darkgray">구매 카드 영역</p>
            <p className="mt-2 text-xl font-bold text-yg-black">{product.price.toLocaleString()}원</p>
            <button className="mt-4 w-full rounded-md bg-yg-primary py-3 text-white">구매하기</button>
          </div>
        </aside>
      </section>
    </main>
  );
}
