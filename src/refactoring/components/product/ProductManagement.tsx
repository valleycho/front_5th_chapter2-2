import { Product } from "../../../types";
import { useToggleShowNewProductForm } from "../../hooks";
import { useProductAddForm } from "../../hooks/useProductForm";
import NewProductAddForm from "./NewProductAddForm";
import NewProductFormToggle from "./NewProductFormToggle";

interface ProductManagementProps {
  onProductAdd: (product: Product) => void;
}

const ProductManagement = ({ onProductAdd }: ProductManagementProps) => {
  const { showNewProductForm, setShowNewProductForm } =
    useToggleShowNewProductForm();

  const { newProduct, setNewProduct, handleAddNewProduct } =
    useProductAddForm();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <NewProductFormToggle
        showNewProductForm={showNewProductForm}
        setShowNewProductForm={setShowNewProductForm}
      />

      {showNewProductForm && (
        <NewProductAddForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddNewProduct={() =>
            handleAddNewProduct(onProductAdd, setShowNewProductForm)
          }
        />
      )}
    </>
  );
};

export default ProductManagement;
