import { Product } from "../../../types";
import DiscountRateText from "../discount/DiscountRateText";

interface ProductEditWithDiscountTextButtonProps {
  product: Product;
  onEditProduct: (product: Product) => void;
}

const ProductEditWithDiscountTextButton = ({
  product,
  onEditProduct,
}: ProductEditWithDiscountTextButtonProps) => {
  return (
    <div>
      {product.discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <DiscountRateText discount={discount} />
        </div>
      ))}
      <button
        data-testid="modify-button"
        onClick={() => onEditProduct(product)}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      >
        수정
      </button>
    </div>
  );
};

export default ProductEditWithDiscountTextButton;
