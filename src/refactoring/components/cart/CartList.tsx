import { useCartContext } from "../../provider/CartProvider";
import CartListItem from "./CartListItem";

const CartList = () => {
  const { cart } = useCartContext();

  return (
    <div className="space-y-2">
      {cart.map((item) => (
        <CartListItem key={item.product.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
