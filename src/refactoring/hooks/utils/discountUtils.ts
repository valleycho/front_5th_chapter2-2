import { CartItem, Coupon, Grade } from "../../../types";
import { calculateItemTotal } from "./cartUtils";

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

export const getMaxProductDiscount = (item: CartItem) => {
  return item.product.discounts.reduce((maxRate, discount) => {
    if (item.quantity >= discount.quantity) {
      return Math.max(maxRate, discount.rate);
    }

    return maxRate;
  }, 0);
};

export const getTotalBeforeProductDiscount = (cart: CartItem[]) => {
  return cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
}

export const getTotalAfterProductDiscount = (cart: CartItem[]) => {
  return cart.reduce((acc, item) => {
    return acc + calculateItemTotal(item);
  }, 0);
}

export const getMemberGradeDiscount = (totalAfterProductDiscount: number, selectedGrade: Grade | null) => {
  if (!selectedGrade) return 0;

  return totalAfterProductDiscount * (selectedGrade.discountRate / 100);
}

export const getCouponDiscount = (totalAfterProductDiscount: number, selectedCoupon: Coupon | null) => {
  if (!selectedCoupon) return 0;

  if (selectedCoupon.discountType === "percentage") {
      return totalAfterProductDiscount * (selectedCoupon.discountValue / 100);
  }

  return selectedCoupon.discountValue;
}