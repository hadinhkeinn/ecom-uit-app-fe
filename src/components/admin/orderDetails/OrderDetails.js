import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getOrder } from "../../../redux/features/product/orderSlice";
import { Spinner } from "../../loader/Loader";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";
import Order from "../../../pages/orderDetails/Order";

const OrderDetails = (props) => {
  const { orderId } = useParams();
  const location = useLocation();
  const { userId } = location.state.userId;

  const dispatch = useDispatch();

  const { order } = useSelector((state) => state.order);
  console.log(order);

  useEffect(() => {
    dispatch(getOrder(userId));
  }, [dispatch, userId]);

  return (
    <>
      <Order userId={userId} />

      <div className="container">
        <ChangeOrderStatus order={order} orderId={orderId} />
      </div>
    </>
  );
};

export default OrderDetails;
