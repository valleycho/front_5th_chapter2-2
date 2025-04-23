import { createContext, useContext } from "react";
import { CartItem, Coupon, Grade, Product } from "../../types";
import { useCart, useSelectedGrade } from "../hooks";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  calculateTotal: (selectedGrade: Grade | null) => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
    totalGradeDiscount: number;
  };
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  selectedGrade: Grade | null;
  applyGrade: (grade: Grade) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { selectedGrade, applyGrade } = useSelectedGrade();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    selectedCoupon,
    applyCoupon,
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        selectedCoupon,
        applyCoupon,
        selectedGrade,
        applyGrade,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
