import { CartItem, Coupon } from "../../../types";

export const calculateItemTotal = (item: CartItem) => {
    const basePrice = item.product.price * item.quantity;
    const discountRate = 1 - getMaxApplicableDiscount(item);
  
    return basePrice * discountRate;
  };
  
  export const getMaxApplicableDiscount = (item: CartItem) => {
    return item.product.discounts.reduce((maxRate, discount) => {
      if (item.quantity >= discount.quantity) {
        return Math.max(maxRate, discount.rate);
      }
  
      return maxRate;
    }, 0);
  };
  
  export const calculateCartTotal = (
    cart: CartItem[],
    selectedCoupon: Coupon | null
  ) => {
    const totalBeforeDiscount = cart.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  
    const totalAfterProductDiscount = cart.reduce((acc, item) => {
      return acc + calculateItemTotal(item);
    }, 0);
  
    const couponDiscount = () => {
      if (!selectedCoupon) return 0;
  
      if (selectedCoupon.discountType === "percentage") {
        return totalAfterProductDiscount * (selectedCoupon.discountValue / 100);
      }
  
      return selectedCoupon.discountValue;
    }
  
    const totalAfterDiscount = totalAfterProductDiscount - couponDiscount();
    const totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  
    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
  };
  
  export const updateCartItemQuantity = (
    cart: CartItem[],
    productId: string,
    newQuantity: number
  ): CartItem[] => {
    if (newQuantity === 0) {
      return cart.filter((item) => item.product.id !== productId);
    }
  
    return cart.map((item) => {
      if (item.product.id !== productId) return item;
  
      const limitedQuantity = Math.min(newQuantity, item.product.stock);
      return { ...item, quantity: limitedQuantity };
    });
  };