import { useRegisterCoupon } from "../../hooks";
import { useCouponContext } from "../../provider/CouponProvider";
import CouponAddForm from "./CouponAddForm";
import CouponList from "./CouponList";

const CouponManagement = () => {
  const { newCoupon, setNewCoupon, handleAddCoupon } = useRegisterCoupon();
  const { addCoupon } = useCouponContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponAddForm
          newCoupon={newCoupon}
          setNewCoupon={setNewCoupon}
          handleAddCoupon={() => handleAddCoupon(addCoupon)}
        />

        <CouponList />
      </div>
    </div>
  );
};

export default CouponManagement;
