// components/products/ProductGrid.tsx
import ProductCard from './ProductCard';
import type { SupplementItem } from '@/types/product';

type Props = {
  items: SupplementItem[];
  renderLink?: (id: SupplementItem['_id']) => string;
};

export default function ProductGrid({ items, renderLink }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ProductCard
          key={item._id}
          id={String(item._id)}
          name={item.name}
          price={item.price}
          imageUrl={undefined} // 아직 없음
          badges={item.mainFunctions} // or []
          href={`/products/${item._id}`}
        />
      ))}
    </div>
  );
}
