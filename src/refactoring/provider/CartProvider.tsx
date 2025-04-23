import { createContext, useContext } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { useCart } from "../hooks";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
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
