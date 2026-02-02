import Link from 'next/link';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  badges?: string[];
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('ko-KR').format(price);
}

export default function ProductCard({ id, name, price, imageUrl, badges = [] }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="rounded-3xl bg-yg-white p-5 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl" aria-label={`${name} 상품 상세보기`}>
      <div className="aspect-square w-full rounded-2xl bg-yg-lightgray">{/* imageUrl 나중에 Image 컴포넌트로 교체 가능 */}</div>

      <div className="mt-5">
        <h3 className="text-xl font-extrabold text-yg-black">{name}</h3>

        {badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full bg-yg-primary px-3 py-1 text-xs text-white">
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5">
          <p className="text-sm text-yg-darkgray">
            월 <span className="text-3xl font-extrabold text-yg-black">{formatPrice(price)}</span>원
          </p>
        </div>
      </div>
    </Link>
  );
}
