import { useToggleShow } from "../../hooks";
import NewProductAddForm from "./NewProductAddForm";
import NewProductFormToggle from "./NewProductFormToggle";

const ProductManagement = () => {
  const { show, setShow } = useToggleShow();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <NewProductFormToggle
        showNewProductForm={show}
        setShowNewProductForm={setShow}
      />

      {show && <NewProductAddForm setShow={setShow} />}
    </>
  );
};

export default ProductManagement;
