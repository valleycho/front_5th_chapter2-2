import { useProductContext } from "../../provider/ProductProvider";
import ProductEditItem from "./ProductEditItem";

const ProductEditManagement = () => {
  const { products } = useProductContext();

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductEditItem key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductEditManagement;
