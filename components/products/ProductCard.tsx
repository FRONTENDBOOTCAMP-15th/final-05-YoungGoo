// components/products/ProductCard.tsx
import Link from 'next/link';
import type { SupplementItem } from '@/types/product';

type Props = {
  item: SupplementItem;
  href: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('ko-KR').format(price);
}

/**
 * [ProductCard]
 * - 상품 1개 카드(Item)
 * - 리뷰 / 별점 관련 요소 제거
 */
export default function ProductCard({ item, href }: Props) {
  const badges: string[] = item.mainNutrients?.slice(0, 2) ?? [];

  return (
    <Link href={href} className="rounded-3xl bg-yg-white p-5 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl" aria-label={`${item.name} 상품 상세보기`}>
      {/* 상품 이미지 영역 (임시 박스) */}
      <div className="aspect-square w-full rounded-2xl bg-yg-lightgray" aria-hidden="true" />

      <div className="mt-5">
        {/* 상품명 */}
        <h3 className="text-xl font-extrabold text-yg-black">{item.name}</h3>

        {/* 서브 설명 (나중에 summary 생기면 교체 가능) */}
        <p className="mt-1 text-sm text-yg-darkgray">건강을 위한 맞춤 영양제</p>

        {/* 주요 성분 뱃지 */}
        {badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full bg-yg-primary px-3 py-1 text-xs text-white">
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* 가격 */}
        <div className="mt-5">
          <p className="text-sm text-yg-darkgray">
            월 <span className="text-3xl font-extrabold text-yg-black">{formatPrice(item.price)}</span>원
          </p>
        </div>
      </div>
    </Link>
  );
}
