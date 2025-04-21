import { Coupon } from "../../../types";

export const getCouponDiscount = (totalAfterProductDiscount: number, selectedCoupon: Coupon | null) => {
  if (!selectedCoupon) return 0;

  if (selectedCoupon.discountType === "percentage") {
      return totalAfterProductDiscount * (selectedCoupon.discountValue / 100);
  }

  return selectedCoupon.discountValue;
}