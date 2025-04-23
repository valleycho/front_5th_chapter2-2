import { useCartContext } from "../../provider/CartProvider";

const CartOrderSummary = () => {
  const { selectedGrade } = useCartContext();
  const { calculateTotal } = useCartContext();

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
      <div className="space-y-1">
        <p>
          상품 금액:{" "}
          {calculateTotal(selectedGrade).totalBeforeDiscount.toLocaleString()}원
        </p>
        <p className="text-green-600">
          회원등급 할인 금액:{" "}
          {calculateTotal(selectedGrade).totalGradeDiscount.toLocaleString()}원
        </p>
        <p className="text-green-600">
          할인 금액:{" "}
          {calculateTotal(selectedGrade).totalDiscount.toLocaleString()}원
        </p>
        <p className="text-xl font-bold">
          최종 결제 금액:{" "}
          {calculateTotal(selectedGrade).totalAfterDiscount.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default CartOrderSummary;
