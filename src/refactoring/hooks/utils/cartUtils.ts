import { CartItem, Coupon, Grade } from "../../../types";
import { getCouponDiscount, getMaxProductDiscount, getMemberGradeDiscount, getTotalAfterProductDiscount, getTotalBeforeProductDiscount } from "./discountUtils";

export const calculateItemTotal = (item: CartItem) => {
  const basePrice = item.product.price * item.quantity;
  const discountRate = 1 - getMaxApplicableDiscount(item);

  return basePrice * discountRate;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  return getMaxProductDiscount(item)
};
  
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
  selectedGrade: Grade | null
) => {
  const totalBeforeDiscount = getTotalBeforeProductDiscount(cart)
  const totalAfterProductDiscount = getTotalAfterProductDiscount(cart);

  const couponDiscount = getCouponDiscount(totalAfterProductDiscount, selectedCoupon);
  const memberGradeDiscount = getMemberGradeDiscount(totalAfterProductDiscount, selectedGrade);
  
  const totalAfterDiscount = totalAfterProductDiscount - couponDiscount - memberGradeDiscount;
  const totalGradeDiscount = memberGradeDiscount;
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
    totalGradeDiscount,
  };
};

const getCartRemoveItem = (cart: CartItem[], productId: string) => {
  return cart.filter((item) => item.product.id !== productId);
}

const getCartLimitedQuantity = (cart: CartItem[], productId: string, newQuantity: number) => {
  return cart.map((item) => {
    if (item.product.id !== productId) return item;

    const limitedQuantity = Math.min(newQuantity, item.product.stock);
    return { ...item, quantity: limitedQuantity };
  })
}

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  if (newQuantity === 0) {
    return getCartRemoveItem(cart, productId);
  }

  return getCartLimitedQuantity(cart, productId, newQuantity);
};