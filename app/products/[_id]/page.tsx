'use client';

import { useState } from 'react';
import ProductInfoSection from '@/components/products/ProductInfoSection';
import ProductInfoTabs from '@/components/products/ProductInfoTabs';
import ProductSummary from '@/components/products/ProductSummary';
import { productDetailMock } from '@/mock/productDetail.mock';
import { SupplementItem } from '@/types/product';

type TabKey = 'features' | 'nutrition' | 'intake' | 'cautions';

export default function ProductDetailPage() {
  const product: SupplementItem = productDetailMock;

  const [activeTab, setActiveTab] = useState<TabKey>('features');

  const handleChangeTab = (key: TabKey) => {
    setActiveTab(key);

    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      {/* 상품 요약 */}
      <ProductSummary name={product.name} summary={product.summary} imageUrl={product.imageUrl} tags={product.tags} />

      {/* 탭 */}
      <div className="sticky top-16 z-20 bg-white">
        <ProductInfoTabs active={activeTab} onChange={handleChangeTab} />
      </div>

      {/* 상세 섹션 */}
      <ProductInfoSection features={product.mainFunctions} nutritionFacts={product.nutritionInfoExample?.nutrients ?? []} intake={product.intakeGuide} cautions={product.precautions} />
    </main>
  );
}
