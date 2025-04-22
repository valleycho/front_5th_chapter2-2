import { Coupon } from "../../../types";
import { useRegisterCoupon } from "../../hooks";
import CouponAddForm from "./CouponAddForm";
import CouponList from "./CouponList";

interface CouponManagementProps {
  coupons: Coupon[];
  onCouponAdd: (coupon: Coupon) => void;
}

const CouponManagement = ({ coupons, onCouponAdd }: CouponManagementProps) => {
  const { newCoupon, setNewCoupon, handleAddCoupon } = useRegisterCoupon();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponAddForm
          newCoupon={newCoupon}
          setNewCoupon={setNewCoupon}
          handleAddCoupon={() => handleAddCoupon(onCouponAdd)}
        />

        <CouponList coupons={coupons} />
      </div>
    </div>
  );
};

export default CouponManagement;
