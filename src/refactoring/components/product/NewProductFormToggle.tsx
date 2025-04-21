interface NewProductFormToggleProps {
  showNewProductForm: boolean;
  setShowNewProductForm: (show: boolean) => void;
}

const NewProductFormToggle = ({
  showNewProductForm,
  setShowNewProductForm,
}: NewProductFormToggleProps) => {
  const getButtonText = () => (showNewProductForm ? "취소" : "새 상품 추가");

  return (
    <button
      onClick={() => setShowNewProductForm(!showNewProductForm)}
      className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
    >
      {getButtonText()}
    </button>
  );
};

export default NewProductFormToggle;
