import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../../redux/features/product/orderSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Spinner } from "../../components/loader/Loader";

const Order = () => {
  const pdfRef = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoading, order } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      pdf.save(`shopitoInvoice.pdf`);
    });
  };

  // const { address, province, country } = order?.orderBy?.address;

  return (
    <section>
      <div className="container" ref={pdfRef}>
        <h2>Chi tiết đơn hàng</h2>
        <div>
          <Link to="/order-history">&larr; Trờ về Đơn hàng</Link>
        </div>
        <br />
        <div className="table">
          {isLoading && order === null ? (
            // <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
            <Spinner />
          ) : (
            <>
              <p>
                <b>Mã đơn hàng: </b> {order?._id}
              </p>
              <p>
                <b>Tổng tiền: </b> {order?.orderAmount}₫
              </p>
              <p>
                <b>Mã giảm giá: </b> {order?.coupon.name} |{" "}
                {order?.coupon?.discount}%
              </p>
              <p>
                <b>Phương thức thanh toán: </b> {order?.paymentMethod}
              </p>
              <p>
                <b>Trạng thái: </b> {order?.orderStatus}
              </p>
              <p>
                <b>Người nhận: </b> {order?.shippingAddress.name}
              </p>
              <p>
                <b>Địa chỉ nhận hàng: </b>
                {order?.shippingAddress.line1},{order?.shippingAddress.line2},{" "}
                {order?.shippingAddress.city}
                <br />
                <br />
              </p>
              <br />
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {order?.cartItems.map((cart, index) => {
                    const { _id, name, price, image, cartQuantity } = cart;
                    return (
                      <tr key={_id}>
                        <td>
                          <b>{index + 1}</b>
                        </td>
                        <td>
                          <p>
                            <b>{name}</b>
                          </p>
                          <img
                            src={image[0]}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{price}</td>
                        <td>{cartQuantity}</td>
                        <td>{(price * cartQuantity)}</td>
                        <td className={"icons"}>
                          {user?.role === "customer" && order?.orderStatus === "Hoàn thành" &&
                            <Link to={`/review-product/${_id}`}>
                              <button className="--btn --btn-primary">
                                Đánh giá
                              </button>
                            </Link>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <div className="--center-all --my">
        <button className="--btn --btn-primary --btn-lg" onClick={downloadPDF}>
          Xuất hóa đơn PDF
        </button>
      </div>
    </section>
  );
};

export default Order;
