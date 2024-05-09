import React, { useEffect } from "react";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { useSelector } from "react-redux";
import {
    CALCULATE_SUBTOTAL,
    selectCartItems,
    selectCartTotalAmount,
    CLEAR_CART,
} from "../../redux/features/product/cartSlice";
import {
    selectPaymentMethod,
    selectShippingAddress,
} from "../../redux/features/product/checkoutSlice";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createOrder } from "../../redux/features/product/orderSlice";


const CheckoutLater = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    // console.log(user);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartItems = useSelector(selectCartItems);
    const shippingAddress = useSelector(selectShippingAddress);
    const paymentMethod = useSelector(selectPaymentMethod);

    const { coupon } = useSelector((state) => state.coupon);
    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL({ coupon: coupon }));
    }, [cartItems, dispatch]);

    // Save order to Order History
    const saveOrder = async () => {
        const today = new Date();
        const formData = {
            orderDate: today.toDateString(),
            orderTime: today.toLocaleTimeString(),
            orderAmount: cartTotalAmount,
            // orderStatus: "Order Placed",
            cartItems,
            shippingAddress,
            paymentMethod,
            coupon: coupon != null ? coupon : { name: "null" },
        };
        console.log(formData);
        await dispatch(createOrder(formData));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        saveOrder();
        dispatch(CLEAR_CART());
        navigate("/order-history");
    };

    return (
        <>
            <section>
                <div className={`container ${styles.checkout}`}>
                    <h2>Đơn hàng</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Card cardClass={styles.card}>
                                <CheckoutSummary />
                            </Card>
                        </div>
                        <div>
                            <Card cardClass={`${styles.card} ${styles.pay}`}>
                                <h3>Xác nhận đơn hàng</h3>
                                <button
                                    type="submit"
                                    className={styles.button}
                                >
                                    Đặt hàng
                                </button>
                            </Card>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default CheckoutLater;
