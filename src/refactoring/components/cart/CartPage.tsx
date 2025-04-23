import CouponApply from "../\bcoupon/CouponApply.tsx";
import { useCart } from "../../hooks/index.ts";
import ProductList from "../product/ProductList.tsx";
import CartList from "./CartList.tsx";
import CartOrderSummary from "./CartOrderSummary.tsx";

export const CartPage = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList cart={cart} addToCart={addToCart} />
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <CartList
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />

          <CouponApply
            applyCoupon={applyCoupon}
            selectedCoupon={selectedCoupon}
          />

          <CartOrderSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalDiscount={totalDiscount}
            totalAfterDiscount={totalAfterDiscount}
          />
        </div>
      </div>
    </div>
  );
};
