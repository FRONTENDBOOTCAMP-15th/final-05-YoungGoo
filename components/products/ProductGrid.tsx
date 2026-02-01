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
        <ProductCard key={item._id} id={item._id} name={item.name} price={item.price} badges={item.mainNutrients.slice(0, 2)} href={renderLink ? renderLink(item._id) : `/products/${item._id}`} />
      ))}
    </div>
  );
}
