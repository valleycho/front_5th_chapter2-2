import { useToggleShow } from "../../hooks";
import { useProductAddForm } from "../../hooks/useProductForm";
import { useProductContext } from "../../provider/ProductProvider";
import NewProductAddForm from "./NewProductAddForm";
import NewProductFormToggle from "./NewProductFormToggle";

const ProductManagement = () => {
  const { show, setShow } = useToggleShow();

  const { newProduct, setNewProduct, handleAddNewProduct } =
    useProductAddForm();

  const { addProduct } = useProductContext();

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
          handleAddNewProduct={() => handleAddNewProduct(addProduct, setShow)}
        />
      )}
    </>
  );
};

export default ProductManagement;
