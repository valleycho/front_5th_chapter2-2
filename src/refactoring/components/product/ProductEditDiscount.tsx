import { Product } from "../../../types";
import { useDiscount } from "../../hooks";
import AddProductDiscount from "../discount/AddProductDiscount";
import DeleteProductDiscount from "../discount/DeleteProductDiscount";

interface ProductEditDiscountProps {
  editingProduct: Product;
  product: Product;
  products: Product[];
  setEditingProduct: (product: Product) => void;
  onProductUpdate: (product: Product) => void;
}

const ProductEditDiscount = ({
  editingProduct,
  product,
  products,
  setEditingProduct,
  onProductUpdate,
}: ProductEditDiscountProps) => {
  const {
    newDiscount,
    setNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
  } = useDiscount();

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      {editingProduct.discounts.map((discount, index) => (
        <DeleteProductDiscount
          key={index}
          discount={discount}
          onRemoveDiscount={() =>
            handleRemoveDiscount(
              product.id,
              index,
              products,
              onProductUpdate,
              setEditingProduct
            )
          }
        />
      ))}
      <AddProductDiscount
        newDiscount={newDiscount}
        setNewDiscount={setNewDiscount}
        onAddDiscount={() =>
          handleAddDiscount(
            product.id,
            products,
            onProductUpdate,
            editingProduct,
            setEditingProduct
          )
        }
      />
    </div>
  );
};

export default ProductEditDiscount;
