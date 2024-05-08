import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.scss";
import {
  getOrders,
  selectOrders,
} from "../../redux/features/product/orderSlice";
import Loader from "../../components/loader/Loader";

const OrderHistory = () => {
  const { isLoading, isError, message, orders } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  return (
    <section>
      <div className={`container order`}>
        <h2>Lịch sử đặt hàng của bạn</h2>
        <p>
          Mở đơn hàng để <b>đánh giá sản phẩm</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={"table"}>
            {orders.length === 0 ? (
              <p>Không tìm thấy đơn hàng nào</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ngày đặt</th>
                    <th>Mã đơn</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái đơn hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      _id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={_id} onClick={() => handleClick(_id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} vào lúc {orderTime}
                        </td>
                        <td>{_id}</td>
                        <td>{orderAmount}₫</td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Hoàn thành"
                                ? `${"pending"}`
                                : `${"delivered"}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
