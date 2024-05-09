import React, { useEffect } from "react";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { useSelector } from "react-redux";
import {
    CALCULATE_SUBTOTAL,
    selectCartItems,
    selectCartTotalAmount,
} from "../../redux/features/product/cartSlice";
import {
    selectBillingAddress,
    selectPaymentMethod,
    selectShippingAddress,
} from "../../redux/features/product/checkoutSlice";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createOrder } from "../../redux/features/product/orderSlice";
import { toast } from "react-toastify";
import { extractIdAndCartQuantity } from "../../utils";
import axios from "axios";
import Confetti from "react-confetti";

const BACKEND_URL = "http://localhost:8080/api/order/create_payment_url";

const CheckoutVnpay = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    console.log(user);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartItems = useSelector(selectCartItems);
    const shippingAddress = useSelector(selectShippingAddress);
    const paymentMethod = useSelector(selectPaymentMethod);

    const [urlParams] = useSearchParams();
    const payment = urlParams.get("payment");
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
            orderStatus: "Đã xác nhận",
            cartItems,
            shippingAddress,
            paymentMethod,
            coupon: coupon != null ? coupon : { name: "null" },
        };
        console.log(formData);
        dispatch(createOrder(formData));
    };

    var details = {
        'amount': `${cartTotalAmount}`,
        'language': '',
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const handleSubmit = () => { };

    const makePayment = async () => {
        try {
            const response = await axios.post(BACKEND_URL, {
                amount: cartTotalAmount,
                language: '',
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            window.location.href = response.data;
            saveOrder();
        } catch (error) {
            console.log(error);
            toast.error("Đã xảy ra lỗi khi thanh toán");
        }
    };

    return (
        <>
            {payment === "successful" && <Confetti />}

            <section>
                <div className={`container ${styles.checkout}`}>
                    <h2>Thanh toán</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Card cardClass={styles.card}>
                                <CheckoutSummary />
                            </Card>
                        </div>
                        <div>
                            <Card cardClass={`${styles.card} ${styles.pay}`}>
                                <h3>Thanh toán Vnpay</h3>
                                <button
                                    type="button"
                                    className={styles.button}
                                    onClick={makePayment}
                                >
                                    Thanh toán ngay
                                </button>
                            </Card>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default CheckoutVnpay;
