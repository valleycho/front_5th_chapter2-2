import { Product } from "../../../types";

interface ProductEditToggleProps {
  product: Product;
  toggleProductAccordion: (productId: string) => void;
}

const ProductEditToggle = ({
  product,
  toggleProductAccordion,
}: ProductEditToggleProps) => {
  return (
    <button
      data-testid="toggle-button"
      onClick={() => toggleProductAccordion(product.id)}
      className="w-full text-left font-semibold"
    >
      {product.name} - {product.price}원 (재고: {product.stock})
    </button>
  );
};

export default ProductEditToggle;
