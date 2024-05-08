import React, { useState } from "react";
import Card from "../../card/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../../../redux/features/coupon/couponSlice";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiresAt, setExpiresAt] = useState(new Date());
  const { isLoading, coupons } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  const saveCoupon = async (e) => {
    e.preventDefault();
    if (name.length < 6) {
      return toast.error("Mã giảm giá phải có tối thiểu 6 ký tự");
    }
    const formData = {
      name,
      discount,
      expiry: expiresAt,
    };
    // console.log(formData);
    dispatch(createCoupon(formData));
    setName("");
    setDiscount("");
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="--underline"></div>
      <br />
      <div className="--mb2">
        <h3>Tạo mã giảm giá</h3>
        <p>
          Dùng biểu mẫu để <b>tạo một mã giảm giá.</b>
        </p>
        <Card cardClass={"card"}>
          <br />
          <form onSubmit={saveCoupon}>
            <label>Mã giảm giá:</label>
            <input
              type="text"
              placeholder="Mã giảm giá"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              required
            />
            <label>Chiết khấu %:</label>
            <input
              type="text"
              placeholder="Chiết khấu"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
            <label>Ngày hết hạn:</label>
            <DatePicker
              selected={expiresAt}
              value={expiresAt}
              onChange={(date) => setExpiresAt(date)}
              required
            />
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Lưu
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateCoupon;
