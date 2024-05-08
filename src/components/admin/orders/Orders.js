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

  const handleClick = (orderId, userId) => {
    navigate("/admin/order-details/" + orderId, { state: { userId } });
  };

  return (
    <section>
      <div className={`container order`}>
        <h2>All Orders</h2>
        <p>
          Open an order to <b>Change Order Status.</b>
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
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const userId = order.orderBy._id;
                    const orderId = order._id;

                    const orderDate = new Date(
                      order.createdAt
                    ).toLocaleDateString();
                    const orderTime = new Date(
                      order.createdAt
                    ).toLocaleTimeString();
                    const orderAmount = order.paymentIntent.amount;
                    const orderStatus = order.orderStatus;
                    return (
                      <tr
                        key={userId}
                        onClick={() => handleClick(orderId, userId)}
                      >
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{orderId}</td>
                        <td>{userId}</td>
                        <td>
                          {orderAmount}
                          {" VNĐ"}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
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
