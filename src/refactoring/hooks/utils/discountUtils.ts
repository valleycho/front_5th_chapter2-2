import { CartItem } from "../../../types";

export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;

  return discounts.reduce((max, discount) => {
    if (quantity >= discount.quantity) {
      return Math.max(max, discount.rate);
    }

    return max;
  }, 0);
};
