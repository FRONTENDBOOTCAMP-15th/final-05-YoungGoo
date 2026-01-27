import ListItem from './ListItem';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
}

interface ItemListProps {
  products: Product[];
  onToggleCheck: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export default function ItemList({ products, onToggleCheck, onIncrease, onDecrease }: ItemListProps) {
  return (
    <section className="flex flex-col gap-12 p-10 shadow-lg rounded-[50px] border border-yg-primary">
      <h1 className="text-xl font-bold">주문 상품 정보</h1>
      <table className="table-fixed border-separate border-spacing-y-6">
        <thead>
          <tr>
            <th>구매</th>
            <th className="w-90">제품명</th>
            <th className="w-20">수량</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ListItem
              key={product.id}
              product={product}
              onToggleCheck={onToggleCheck}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
