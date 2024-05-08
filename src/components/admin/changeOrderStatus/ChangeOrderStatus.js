import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChangeOrderStatus.module.scss";
import { Spinner } from "../../loader/Loader";
import Card from "../../card/Card";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../../redux/features/product/orderSlice";
import { useSelector } from "react-redux";

const ChangeOrderStatus = ({ order, orderId }) => {
  const [status, setStatus] = useState("");
  const { isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editOrder = async (e, id) => {
    e.preventDefault();
    const formData = {
      orderStatus: status,
    };

    await dispatch(updateOrderStatus({ id, formData }));
  };

  return (
    <>
      {isLoading && <Spinner />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Cập nhật trạng thái đơn hàng</h4>
          <form onSubmit={(e) => editOrder(e, orderId)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Chọn --
                </option>
                <option value="Đang chờ">Đang chờ...</option>
                <option value="Đã xác nhận">Đã xác nhận...</option>
                <option value="Đang vận chuyển">Đang vận chuyển...</option>
                <option value="Đã giao hàng">Đã giao hàng...</option>
                <option value="Hoàn thành">Hoàn thành...</option>
                <option value="Đã hủy">Đã hủy...</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Cập nhật
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
