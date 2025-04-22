import { Product } from "../../../types";
import { useToggleProductAccordion } from "../../hooks";
import ProductEditForm from "./ProductEditForm";
import ProductEditToggle from "./ProductEditToggle";

interface ProductEditItemProps {
  product: Product;
  products: Product[];
  index: number;
  onProductUpdate: (product: Product) => void;
}

const ProductEditItem = ({
  product,
  index,
  products,
  onProductUpdate,
}: ProductEditItemProps) => {
  const { openProductIds, toggleProductAccordion } =
    useToggleProductAccordion();

  return (
    <div
      key={product.id}
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <ProductEditToggle
        product={product}
        toggleProductAccordion={toggleProductAccordion}
      />

      {openProductIds.has(product.id) && (
        <div className="mt-2">
          <ProductEditForm
            product={product}
            products={products}
            onProductUpdate={onProductUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default ProductEditItem;
