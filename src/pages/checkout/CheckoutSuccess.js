import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
} from "../../redux/features/product/cartSlice";
import Confetti from "react-confetti";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CLEAR_CART());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  return (
    <>
      <Confetti />

      <section>
        <div className="container">
          <h2>Thanh toán thành công</h2>
          <p>Cảm ơn bạn đã đặt hàng</p>
          <br />

          <button className="--btn --btn-primary">
            <Link to="/order-history">Xem trạng thái đơn hàng</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default CheckoutSuccess;
