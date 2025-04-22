import { Product } from "../../../types";
import { useToggleShow } from "../../hooks";
import { useProductAddForm } from "../../hooks/useProductForm";
import NewProductAddForm from "./NewProductAddForm";
import NewProductFormToggle from "./NewProductFormToggle";

interface ProductManagementProps {
  onProductAdd: (product: Product) => void;
}

const ProductManagement = ({ onProductAdd }: ProductManagementProps) => {
  const { show, setShow } = useToggleShow();

  const { newProduct, setNewProduct, handleAddNewProduct } =
    useProductAddForm();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <NewProductFormToggle
        showNewProductForm={show}
        setShowNewProductForm={setShow}
      />

      {show && (
        <NewProductAddForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddNewProduct={() => handleAddNewProduct(onProductAdd, setShow)}
        />
      )}
    </>
  );
};

export default ProductManagement;
