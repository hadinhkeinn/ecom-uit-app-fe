import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  saveCartDB,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/features/product/cartSlice";
import styles from "./Cart.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import Card from "../../components/card/Card";
import "./Radio.scss";
import { toast } from "react-toastify";
import {
  SAVE_PAYMENT_METHOD,
  selectPaymentMethod,
} from "../../redux/features/product/checkoutSlice";
import { getCartQuantityById } from "../../utils";
import VerifyCoupon from "../../components/verifyCoupon/VerifyCoupon";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [paymentMethod, setPaymentMethod] = useState("");

  // console.log(cartItems);

  const increaseCart = (cart) => {
    // const cartQuantity = getCartQuantityById(cartItems, cart._id);
    // if (cartQuantity === cart.quantity) {
    //   return toast.info("Max number of product reached!!!");
    // }
    dispatch(ADD_TO_CART(cart));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
    dispatch(saveCartDB({ cartItems: [] }));
  };

  const { coupon } = useSelector((state) => state.coupon);
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon }));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch, coupon]);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    // dispatch(SAVE_PAYMENT_METHOD(paymentMethod));
  };

  const setPayment = (e) => {
    e.preventDefault();
    if (paymentMethod === "") {
      return toast.error("Vui lòng chọn phương thức thanh toán");
    }
    dispatch(SAVE_PAYMENT_METHOD(paymentMethod));

    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      navigate("/login?redirect=cart");
    }
  };
  // console.log(cartItems);
  return (
    <section>
      <div className={`container ${styles.table}`}>
        {/* <pre>{JSON.stringify(cartItems, null, 2)}</pre> */}
        <h2>Giỏ hàng</h2>
        {cartItems?.length === 0 ? (
          <>
            <p>Giỏ hàng của bạn đang trống.</p>
            <br />
            <div>
              <Link to="/shop">&larr; Tiếp tục mua hàng</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((cart, index) => {
                  const { _id, name, price, image, cartQuantity } = cart;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={image[0]}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Xóa tất cả sản phẩm
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/shop">&larr; Tiếp tục mua hàng</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b> {`Số sản phẩm: ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Tổng phụ:</h4>
                    <h3>{`${cartTotalAmount}₫`}</h3>
                  </div>
                  <VerifyCoupon />
                  <div className="--underline --mb"></div>
                  <p>Vui lòng chọn phương thức thanh toán</p>
                  <form className="--form-control" onSubmit={setPayment}>
                    <label htmlFor={"ttsau"} className="radio-label">
                      <input
                        className="radio-input"
                        type="radio"
                        name={"paymentMethod"}
                        id={"ttsau"}
                        value={"ttsau"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="custom-radio" />
                      Thanh toán khi nhận hàng
                    </label>
                    <label htmlFor={"vnpay"} className="radio-label">
                      <input
                        className="radio-input"
                        type="radio"
                        name={"paymentMethod"}
                        id={"vnpay"}
                        value={"vnpay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="custom-radio" />
                      Thanh toán qua Vnpay
                    </label>
                    <button
                      type="submit"
                      className="--btn --btn-primary --btn-block"
                    >
                      Thanh toán
                    </button>
                  </form>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
