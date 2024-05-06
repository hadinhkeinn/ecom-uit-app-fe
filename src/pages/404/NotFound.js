import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="--center-all" style={{ minHeight: "80vh" }}>
      <h2>Không tìm thấy trang</h2>
      <p>Có vẻ như trang bạn đang tìm không thể tìm thấy.</p>
      <br />
      <Link to={"/"}>
        <button className="--btn --btn-primary">Quay về trang chủ</button>
      </Link>
    </div>
  );
};

export default NotFound;
