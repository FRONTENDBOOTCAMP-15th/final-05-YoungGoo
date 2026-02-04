'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import { getProducts } from '@/lib/api/products';
import type { SupplementItem } from '@/types/product';
import type { SurveyResultPayload } from '@/types/survey';
import { SURVEY_RESULT_PAYLOAD_KEY } from '@/app/survey/constants/storage';

import ResultShell from '@/components/survey/result/ResultShell';
import ConditionSummaryCard from '@/components/survey/result/ConditionSummaryCard';
import SupplementCard, { type Supplement } from '@/components/survey/result/SupplementCard';
import AiQuestion from '@/components/survey/result/AiQuestion';
import SubscribeButton from '@/components/survey/result/SubscribeButton';

const MAX_RECOMMEND_COUNT = 3;
const RECOMMENDED_PRODUCTS_KEY = 'recommendedProducts';

// 임시 요약
const TEMP_SUMMARY = '설문 결과를 기반으로 카테고리별 추천 영양제를 준비했어요.';

function saveRecommendedProducts(supplements: Supplement[]) {
  const recommendedProducts = supplements.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
  }));

  sessionStorage.setItem(RECOMMENDED_PRODUCTS_KEY, JSON.stringify(recommendedProducts));
}

// SupplementItem → Supplement 변환
function mapToSupplement(item: SupplementItem): Supplement {
  return {
    id: String(item._id),
    name: item.name,
    price: item.price,
    description: (item.mainFunctions ?? []).join(', '),
    tags: (item.mainNutrients ?? []).slice(0, 2).map((n) => ({ label: n })),
    badge: '추천',
    imageUrl: item.imageUrl,
  };
}

//선택한 카테고리 개수에 따라 추천 개수 결정
function getRecommendCount(selectedCategories: unknown): number {
  const n = Array.isArray(selectedCategories) ? selectedCategories.length : 0;
  if (n <= 0) return 0;
  if (n === 1) return 2;
  return 3;
}

export default function SurveyResultPage() {
  const router = useRouter();

  const [payload, setPayload] = useState<SurveyResultPayload | null | undefined>(undefined);

  useEffect(() => {
    queueMicrotask(() => {
      const raw = sessionStorage.getItem(SURVEY_RESULT_PAYLOAD_KEY);

      if (!raw) {
        setPayload(null);
        return;
      }

      try {
        setPayload(JSON.parse(raw) as SurveyResultPayload);
      } catch {
        setPayload(null);
      }
    });
  }, []);

  // payload 가드: 읽기 완료 후(null)면 리다이렉트
  useEffect(() => {
    if (payload === null) router.replace('/survey');
  }, [payload, router]);

  // 추천 개수
  const recommendCount = payload ? getRecommendCount(payload.selectedCategories) : 0;

  // 상품 API 호출: payload가 있을 때만
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR<SupplementItem[]>(
    payload ? 'products' : null,
    async () => {
      const res = await getProducts();
      if (res.ok !== 1 || !res.item) throw new Error('Failed to fetch products');
      return res.item;
    },
    { revalidateOnFocus: false }
  );

  const isError = Boolean(error);

  // 카테고리 기반 후보
  const supplements: Supplement[] = useMemo(() => {
    if (!payload || !products) return [];

    const selected = Array.isArray(payload.selectedCategories) ? payload.selectedCategories : [];
    const selectedSet = new Set(selected.map(String));

    const count = Math.min(recommendCount, MAX_RECOMMEND_COUNT);
    if (count === 0) return [];

    const filtered = products.filter((p) => p.categoryId && selectedSet.has(String(p.categoryId)));
    return filtered.slice(0, count).map(mapToSupplement);
  }, [payload, products, recommendCount]);

  const handleSubscribe = () => {
    if (supplements.length === 0) return;
    saveRecommendedProducts(supplements);
    router.push('/subscription');
  };

  const handleClickDetail = (id: string) => {
    router.push(`/products/${id}`);
  };

  // hydration mismatch 방지
  if (payload === undefined) return null;

  // payload 없으면 redirect 중이므로 렌더 막기
  if (payload === null) return null;

  return (
    <>
      <ResultShell title="AI 영양제 추천 결과">
        <ConditionSummaryCard summary={TEMP_SUMMARY} isLoading={isLoading} isError={isError} />

        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-yg-black">추천 영양제</h2>
            <p className="mt-1 text-sm font-normal text-yg-darkgray">AI가 분석한 맞춤 영양제 {Math.min(recommendCount, MAX_RECOMMEND_COUNT)}가지</p>
          </div>

          {/* 로딩 */}
          {isLoading && <div className="rounded-2xl border border-yg-lightgray bg-white p-6 text-sm text-yg-darkgray shadow-sm">추천 영양제를 불러오는 중이에요...</div>}

          {/* 에러 */}
          {!isLoading && isError && (
            <div className="rounded-2xl border border-yg-lightgray bg-white p-6 shadow-sm">
              <p className="text-sm text-yg-darkgray">추천 영양제를 불러오지 못했어요.</p>
              <button type="button" onClick={() => mutate()} className="mt-4 rounded-xl border border-yg-lightgray bg-white px-4 py-2 text-sm font-semibold text-yg-black">
                다시 시도
              </button>
            </div>
          )}

          {/* 정상 */}
          {!isLoading && !isError && (
            <>
              {supplements.length === 0 ? (
                <div className="rounded-2xl border border-yg-lightgray bg-white p-6 text-sm text-yg-darkgray shadow-sm">추천 조건을 충족하는 건강식품이 없어요.</div>
              ) : (
                <div className="space-y-6">
                  {supplements.map((item) => (
                    <SupplementCard key={item.id} item={item} onClickDetail={handleClickDetail} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        <AiQuestion />
      </ResultShell>

      <SubscribeButton onClick={handleSubscribe} />
    </>
  );
}
