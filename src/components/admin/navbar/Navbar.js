import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { selectUser } from "../../../redux/features/auth/authSlice";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const user = useSelector(selectUser);
  const userName = user?.name;

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              Tất cả sản phẩm
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product" className={activeLink}>
              Thêm sản phẩm
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Đơn hàng
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/coupon" className={activeLink}>
              Mã giảm giá
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/category" className={activeLink}>
              Loại sản phẩm
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
