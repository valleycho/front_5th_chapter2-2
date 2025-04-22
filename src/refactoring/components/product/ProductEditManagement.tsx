import { Product } from "../../../types";
import ProductEditItem from "./ProductEditItem";

interface ProductEditManagementProps {
  products: Product[];
  onProductUpdate: (product: Product) => void;
}

const ProductEditManagement = ({
  products,
  onProductUpdate,
}: ProductEditManagementProps) => {
  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductEditItem
          key={product.id}
          product={product}
          products={products}
          index={index}
          onProductUpdate={onProductUpdate}
        />
      ))}
    </div>
  );
};

export default ProductEditManagement;
