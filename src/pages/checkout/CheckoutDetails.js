import { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
  selectBillingAddress,
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/product/checkoutSlice";
import styles from "./CheckoutDetails.module.scss";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialAddressState = {
  name: "",
  // line1: "",
  address: "",
  city: "",
  // state: "",
  // postal_code: "",
  // country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const paymentMethod = useSelector(selectPaymentMethod);
  const shipAddress = useSelector(selectShippingAddress);
  const billAddress = useSelector(selectBillingAddress);

  useEffect(() => {
    if (Object.keys(shipAddress).length > 0) {
      setShippingAddress({ ...shipAddress });
    }
    if (Object.keys(billAddress).length > 0) {
      setBillingAddress({ ...billAddress });
    }
  }, [shipAddress, billAddress]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    if (paymentMethod === "") {
      toast.info("Vui lòng chọn phương thức thanh toán!!!")
      navigate("/cart");
    }
    if (paymentMethod === "ttsau") {
      navigate("/checkout-later");
    }
    if (paymentMethod === "vnpay") {
      navigate("/checkout-vnpay");
    }
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Chi tiết thanh toán</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Địa chỉ giao hàng</h3>
              <label>Tên người nhận</label>
              <input
                type="text"
                placeholder=""
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <label>Địa chỉ chi tiết</label>
              <input
                type="text"
                placeholder=""
                required
                name="address"
                value={shippingAddress.address}
                onChange={(e) => handleShipping(e)}
              />
              {/* <label>Địa chỉ 2</label>
              <input
                type="text"
                placeholder=""
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              /> */}
              <label>Tỉnh/Thành phố</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              <label>Số điện thoại</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </Card>
            <button type="submit" className="--btn --btn-primary">
              Đặt hàng
            </button>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
