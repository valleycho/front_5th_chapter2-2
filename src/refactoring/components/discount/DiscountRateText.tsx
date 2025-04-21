import { Discount } from "../../../types";

interface DiscountRateTextProps {
  discount: Discount;
}

const DiscountRateText = ({ discount }: DiscountRateTextProps) => {
  return (
    <span>
      {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
    </span>
  );
};

export default DiscountRateText;
