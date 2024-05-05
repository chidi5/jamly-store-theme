import { Product } from "@/types";
import NoResult from "./no-result";
import ProductCard from "./product-card";

type ProductListProps = {
  title: string;
  items: Product[];
};

const ProductList = ({ title, items }: ProductListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResult />}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
