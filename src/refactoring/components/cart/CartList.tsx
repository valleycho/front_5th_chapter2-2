import { CartItem } from "../../../types";
import CartListItem from "./CartListItem";

interface CartListProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartList = ({ cart, updateQuantity, removeFromCart }: CartListProps) => {
  return (
    <div className="space-y-2">
      {cart.map((item) => (
        <CartListItem
          key={item.product.id}
          item={item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
};

export default CartList;
