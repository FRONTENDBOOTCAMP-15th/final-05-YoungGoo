'use client';

import { useState } from 'react';
import ProductSidePurchaseCard from '@/components/products/ProductSidePurchaseCard';
import ProductInfoSection from '@/components/products/ProductInfoSection';
import ProductInfoTabs from '@/components/products/ProductInfoTabs';
import ProductSummary from '@/components/products/ProductSummary';
import { productDetailMock } from '@/mock/productDetail.mock';

type TabKey = 'features' | 'nutrition' | 'intake' | 'cautions';

export default function ProductDetailPage() {
  const product = productDetailMock;

  const [activeTab, setActiveTab] = useState<TabKey>('features');

  const handleChangeTab = (key: TabKey) => {
    setActiveTab(key);

    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-yg-black">{product.name}</h1>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-8 space-y-6">
          <ProductSummary name={product.name} summary={product.summary} price={product.price} brand={product.brand} rating={product.rating} reviewCount={product.reviewCount} shippingLabel={product.shippingLabel} imageUrl={product.imageUrl} tags={product.tags} />

          {/* ✅ 탭 클릭 로직 연결 */}
          <ProductInfoTabs active={activeTab} onChange={handleChangeTab} />

          <ProductInfoSection features={product.features} nutritionFacts={product.nutritionFacts} intake={product.intake} cautions={product.cautions} />
        </div>

        <ProductSidePurchaseCard price={product.price} shippingLabel={product.shippingLabel} />
      </section>
    </main>
  );
}
