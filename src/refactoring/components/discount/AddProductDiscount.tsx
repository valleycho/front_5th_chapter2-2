import { Discount } from "../../../types";

interface AddProductDiscountProps {
  onAddDiscount: () => void;
  newDiscount: Discount;
  setNewDiscount: (discount: Discount) => void;
}

const AddProductDiscount = ({
  newDiscount,
  setNewDiscount,
  onAddDiscount,
}: AddProductDiscountProps) => {
  return (
    <div className="flex space-x-2">
      <input
        type="number"
        placeholder="수량"
        value={newDiscount.quantity}
        onChange={(e) =>
          setNewDiscount({
            ...newDiscount,
            quantity: parseInt(e.target.value),
          })
        }
        className="w-1/3 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="할인율 (%)"
        value={newDiscount.rate * 100}
        onChange={(e) =>
          setNewDiscount({
            ...newDiscount,
            rate: parseInt(e.target.value) / 100,
          })
        }
        className="w-1/3 p-2 border rounded"
      />
      <button
        onClick={onAddDiscount}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        할인 추가
      </button>
    </div>
  );
};

export default AddProductDiscount;
