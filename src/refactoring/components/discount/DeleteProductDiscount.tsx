import { Discount } from "../../../types";
import DiscountRateText from "./DiscountRateText";

interface DeleteProductDiscountProps {
  discount: Discount;
  onRemoveDiscount: () => void;
}

const DeleteProductDiscount = ({
  discount,
  onRemoveDiscount,
}: DeleteProductDiscountProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <DiscountRateText discount={discount} />
      <button
        onClick={onRemoveDiscount}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  );
};

export default DeleteProductDiscount;
