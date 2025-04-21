import { useState } from "react";
import { Coupon } from "../../types.ts";
import { initialRegisterCoupon } from "../constants/coupon.constants.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (coupon: Coupon) => {
    setCoupons([...coupons, coupon]);
  };

  return { coupons, addCoupon };
};

export const useRegisterCoupon = () => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(initialRegisterCoupon);

  const handleAddCoupon = (onCouponAdd: (newCoupon: Coupon) => void) => {
    onCouponAdd(newCoupon);

    setNewCoupon(initialRegisterCoupon);
  };

  return {
    newCoupon,
    setNewCoupon,
    handleAddCoupon,
  };
};