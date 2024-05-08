import React, { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../../redux/features/product/orderSlice";
import Loader from "../../loader/Loader";

const Orders = () => {
  const { isLoading, isError, message, orders } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleClick = (id) => {
    navigate("/admin/order-details/" + id);
  };

  return (
    <section>
      <div className={`container order`}>
        <h2>Tất cả đơn hàng</h2>
        <p>
          Chọn đơn hàng để <b>thay đổi trang thái đơn hàng</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={"table"}>
            {orders.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Thời gian đặt</th>
                    <th>Mã đơn hàng</th>
                    <th>Mã khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      _id,
                      user,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={_id} onClick={() => handleClick(_id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} lúc {orderTime}
                        </td>
                        <td>{_id}</td>
                        <td>{user}</td>
                        <td>
                          {orderAmount}
                          {" VNĐ"}
                        </td>
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

export default Orders;
