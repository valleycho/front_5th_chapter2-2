import CouponApply from "../\bcoupon/CouponApply.tsx";
import MemberGradeApply from "../memberGrade/MemberGradeApply.tsx";
import ProductList from "../product/ProductList.tsx";
import CartList from "./CartList.tsx";
import CartOrderSummary from "./CartOrderSummary.tsx";

export const CartPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList />
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <CartList />

          <MemberGradeApply />
          <CouponApply />

          <CartOrderSummary />
        </div>
      </div>
    </div>
  );
};
