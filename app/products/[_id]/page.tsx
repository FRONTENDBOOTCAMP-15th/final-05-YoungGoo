import ProductSidePurchaseCard from '@/components/products/ProductSidePurchaseCard';
import ProductInfoSection from '@/components/products/ProductInfoSection';
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
          <ProductInfoSection features={product.features} nutritionFacts={product.nutritionFacts} intake={product.intake} cautions={product.cautions} />
        </div>

        {/* 우측 구매 카드 영역 */}
        <ProductSidePurchaseCard price={product.price} shippingLabel={product.shippingLabel} />
      </section>
    </main>
  );
}
