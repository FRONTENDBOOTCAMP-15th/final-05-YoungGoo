// components/products/ProductGrid.tsx
import ProductCard from './ProductCard';
import type { SupplementItem } from '@/types/product';

type Props = {
  items: SupplementItem[];
  renderLink?: (id: SupplementItem['_id']) => string;
};

const categoryImages: Record<string, string> = {
  diet: '/images/category/diet.png',
  eye: '/images/category/eye_health.png',
  gut: '/images/category/gut_health.png',
  immune_faigue: '/images/category/immune_energy.png',
  skin_hair: '/images/category/skin_hair.png',
  woman: '/images/category/womans_health.png',
  brain: '/images/category/brain_focus.png',
  blood_flow: '/images/category/circulation.png',
  bone_joint: '/images/category/bone_joint.png',
  general: '/images/category/general.png',
};

export default function ProductGrid({ items, renderLink }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ProductCard key={item._id} id={Number(item._id)} name={item.name} price={item.price} imageUrl={categoryImages[item.categoryId] ?? '/images/category/default.png'} badges={item.mainFunctions ?? []} href={renderLink ? renderLink(item._id) : `/products/${item._id}`} />
      ))}
    </div>
  );
}
