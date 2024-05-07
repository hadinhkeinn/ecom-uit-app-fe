import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CALCULATE_SUBTOTAL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../../redux/features/product/cartSlice";

import styles from "./CheckoutSummary.module.scss";
import Card from "../../card/Card";
import { useDispatch } from "react-redux";
import { CartDiscount } from "../../verifyCoupon/VerifyCoupon";

const CheckoutSummary = () => {
  const { coupon } = useSelector((state) => state.coupon);
  const cartItems = useSelector(selectCartItems);
  // console.log(cartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon: coupon }));
  }, [cartItems, dispatch, coupon]);

  return (
    <div>
      <h3>Tóm tắt thanh toán</h3>
      {/* <pre>{JSON.stringify(cartItems, null, 2)}</pre> */}
      <div>
        {cartItems.lenght === 0 ? (
          <>
            <p>Không có sản phẩm trong giỏ hàng của bạn.</p>
            <button className="--btn">
              <Link to="/#products">Quay về trang sản phẩm</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Số sản phẩm: ${cartTotalQuantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>Tổng phụ:</h4>
              <h3>{Math.round(cartTotalAmount)}</h3>
            </div>
            <CartDiscount />
            {cartItems.map((item, index) => {
              const { _id, name, price, cartQuantity } = item;
              return (
                <Card key={_id} cardClass={styles.card}>
                  <h4>Sản phẩm: {name}</h4>
                  <p>Số lượng: {cartQuantity}</p>
                  <p>Đơn giá: {price}</p>
                  <p>Tổng tiền: {price * cartQuantity}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
