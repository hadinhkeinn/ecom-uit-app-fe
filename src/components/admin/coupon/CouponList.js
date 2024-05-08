import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupon,
  getCoupons,
} from "../../../redux/features/coupon/couponSlice";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CouponList = () => {
  const { isLoading, coupons } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Xoá mã giảm giá",
      message: "Bạn có chắc chắn muốn xoá mã giảm giá này?",
      buttons: [
        {
          label: "Xóa",
          onClick: () => delCoupon(id),
        },
        {
          label: "Hủy bỏ",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const delCoupon = async (id) => {
    await dispatch(deleteCoupon(id));
    await dispatch(getCoupons());
  };

  return (
    <div className="--mb2 ">
      <h3>Tất cả mã giảm giá</h3>

      <div className={"table"}>
        {coupons.length === 0 ? (
          <p>Không tìm thấy mã giảm giá</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Chiết khấu (%)</th>
                <th>Ngày hết hạn</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => {
                const { _id, name, discount, expiry } = coupon;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{discount}%</td>
                    <td>{expiry.substring(0, 10)}</td>
                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color={"red"}
                          onClick={() => confirmDelete(_id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CouponList;
