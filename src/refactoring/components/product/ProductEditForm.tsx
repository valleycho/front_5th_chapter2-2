import { Product } from "../../../types";
import { useProductEditForm } from "../../hooks/useProductForm";
import { useProductContext } from "../../provider/ProductProvider";
import ProductEditDiscount from "./ProductEditDiscount";
import ProductEditInput from "./ProductEditInput";
import ProductEditWithDiscountTextButton from "./ProductEditWithDiscountTextButton";

interface ProductEditFormProps {
  product: Product;
}

const ProductEditForm = ({ product }: ProductEditFormProps) => {
  const { products, updateProduct } = useProductContext();

  const {
    editingProduct,
    setEditingProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
    handleStockUpdate,
  } = useProductEditForm();

  if (editingProduct && editingProduct.id === product.id) {
    return (
      <div>
        <ProductEditInput
          label="상품명"
          inputType="text"
          inputValue={editingProduct.name}
          onInputChange={(value: string) =>
            handleProductNameUpdate(product.id, value)
          }
        />
        <ProductEditInput
          label="가격"
          inputType="number"
          inputValue={editingProduct.price}
          onInputChange={(value: string) =>
            handlePriceUpdate(product.id, parseInt(value))
          }
        />
        <ProductEditInput
          label="재고"
          inputType="number"
          inputValue={editingProduct.stock}
          onInputChange={(value: string) =>
            handleStockUpdate(
              product.id,
              parseInt(value),
              products,
              updateProduct,
              setEditingProduct
            )
          }
        />

        {/* 할인 정보 수정 부분 */}
        <ProductEditDiscount
          editingProduct={editingProduct}
          product={product}
          products={products}
          setEditingProduct={setEditingProduct}
          onProductUpdate={updateProduct}
        />
        <button
          onClick={() => handleEditComplete(updateProduct)}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
        >
          수정 완료
        </button>
      </div>
    );
  }

  return (
    <ProductEditWithDiscountTextButton
      product={product}
      onEditProduct={handleEditProduct}
    />
  );
};

export default ProductEditForm;
