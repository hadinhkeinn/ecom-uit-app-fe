import React, { useState } from "react";
import "./VerifyCoupon.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_COUPON,
  getCoupon,
} from "../../redux/features/coupon/couponSlice";
import Card from "./../card/Card";

export const CartDiscount = () => {
  const { coupon } = useSelector((state) => state.coupon);
  const { fixedCartTotalAmount } = useSelector((state) => state.cart);

  return (
    <>
      {coupon != null && (
        <Card cardClass={"coupon-msg"}>
          <p className="--center-all">
            Tổng tiền ban đầu: {fixedCartTotalAmount}₫ | Phiếu giảm giá: {coupon.name} |
            Chiết khấu: {coupon.discount}%
          </p>
        </Card>
      )}
    </>
  );
};

const VerifyCoupon = () => {
  const dispatch = useDispatch();
  const [couponName, setCouponName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { coupon, isLoadng } = useSelector((state) => state.coupon);
  const { cartTotalAmount, fixedCartTotalAmount } = useSelector(
    (state) => state.cart
  );

  const verifyCoupon = async (e) => {
    e.preventDefault();

    dispatch(getCoupon(couponName));
  };

  const removeCoupon = async () => {
    dispatch(REMOVE_COUPON());
  };

  return (
    <>
      <CartDiscount />
      <div className="--flex-between">
        <p>Bạn có phiếu giảm giá?</p>
        {coupon === null ? (
          <p
            className="--cursor --color-primary"
            onClick={() => setShowForm(true)}
          >
            <b>Thêm</b>
          </p>
        ) : (
          <p className="--cursor --color-danger" onClick={removeCoupon}>
            <b>Xóa phiếu giảm giá</b>
          </p>
        )}
      </div>
      {showForm && (
        <form onSubmit={verifyCoupon} className={"coupon-form"}>
          <input
            type="text"
            placeholder="Phiếu giảm giá"
            name="name"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value.toUpperCase())}
            required
          />
          <button type="submit" className="--btn --btn-primary">
            Xác nhận
          </button>
        </form>
      )}
    </>
  );
};

export default VerifyCoupon;
