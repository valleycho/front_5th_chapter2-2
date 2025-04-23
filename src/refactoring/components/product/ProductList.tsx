import { CartItem, Product } from "../../../types";
import { useProductContext } from "../../provider/ProductProvider";
import ProductItem from "./ProductItem";

interface ProductListProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

const ProductList = ({ cart, addToCart }: ProductListProps) => {
  const { products } = useProductContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            cart={cart}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
