'use client';

import { useRouter } from 'next/navigation';

import ResultShell from '@/components/survey/result/ResultShell';
import ConditionSummaryCard from '@/components/survey/result/ConditionSummaryCard';
import SupplementCard, { type Supplement } from '@/components/survey/result/SupplementCard';
import AiQuestion from '@/components/survey/result/AiQuestion';
import SubscribeButton from '@/components/survey/result/SubscribeButton';

import { MOCK_SUMMARY, MOCK_SUPPLEMENTS } from '../../../mock/result.mock';

const MAX_RECOMMEND_COUNT = 3;
const RECOMMENDED_PRODUCTS_KEY = 'recommendedProducts';

function saveRecommendedProducts(supplements: Supplement[]) {
  const recommendedProducts = supplements.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
  }));

  sessionStorage.setItem(RECOMMENDED_PRODUCTS_KEY, JSON.stringify(recommendedProducts));
}

export default function SurveyResultPage() {
  const router = useRouter();

  // fetch 붙이면 useState로 교체
  const isLoading = false;
  const isError = false;

  const summary = MOCK_SUMMARY;
  const supplements = MOCK_SUPPLEMENTS;

  const handleSubscribe = () => {
    saveRecommendedProducts(supplements);
    router.push('/subscription');
  };

  const handleClickDetail = (id: string) => {
    router.push(`/products/${id}`);
  };

  const visibleSupplements = supplements.slice(0, MAX_RECOMMEND_COUNT);

  return (
    <>
      {/* 상단 */}
      <ResultShell title="AI 영양제 추천 결과">
        {/* 설문 요약 */}
        <ConditionSummaryCard summary={summary} isLoading={isLoading} isError={isError} />
        {/* 추천 영양제 리스트 */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-yg-black">추천 영양제</h2>
            <p className="mt-1 text-sm font-normal text-yg-darkgray">AI가 분석한 맞춤 영양제 {MAX_RECOMMEND_COUNT}가지</p>
          </div>

          {visibleSupplements.length === 0 ? (
            <div className="rounded-2xl border border-yg-lightgray bg-white p-6 text-sm text-yg-darkgray shadow-sm">추천 조건을 충족하는 건강식품이 없어요.</div>
          ) : (
            <div className="space-y-6">
              {visibleSupplements.map((item) => (
                <SupplementCard key={item.id} item={item} onClickDetail={handleClickDetail} />
              ))}
            </div>
          )}
        </section>
        {/* AI질문 */}
        <AiQuestion />
      </ResultShell>
      {/* 구독하기 */}
      <SubscribeButton onClick={handleSubscribe} />
    </>
  );
}
