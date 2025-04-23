import { useProductContext } from "../../provider/ProductProvider";
import ProductEditItem from "./ProductEditItem";

const ProductEditManagement = () => {
  const { products, updateProduct } = useProductContext();

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductEditItem
          key={product.id}
          product={product}
          products={products}
          index={index}
          onProductUpdate={updateProduct}
        />
      ))}
    </div>
  );
};

export default ProductEditManagement;
