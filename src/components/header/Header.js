import React, { useState, useEffect } from 'react'
import styles from './Header.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUserCircle, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RESET_AUTH, logout } from '../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { UserName } from '../../pages/profile/Profile';
import { useDispatch, useSelector } from "react-redux";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
    CALCULATE_TOTAL_QUANTITY,
    selectCartTotalQuantity,
} from "../../redux/features/product/cartSlice";

export const logo = (
    <div className={styles.logo}>
        <Link to="/">
            <h2>
                eCom<span>UIT</span>
            </h2>
        </Link>
    </div>
)

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [scrollPage, setScrollPage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }, [dispatch]);


    const fixNavbar = () => {
        if (window.scrollY > 50) {
            setScrollPage(true);
        } else {
            setScrollPage(false);
        }
    };
    window.addEventListener("scroll", fixNavbar);
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    };
    const hideMenu = () => {
        setShowMenu(false)
    };

    const logoutUser = async () => {
        await dispatch(logout());
        await dispatch(RESET_AUTH());
        localStorage.setItem("cartItems", JSON.stringify([]));
        navigate("/login");
        window.location.reload();
    };

    const cart = (
        <span className={styles.cart}>
            <Link to="/cart">
                Giỏ hàng
                <FaShoppingCart size={20} />
                <p>{cartTotalQuantity}</p>
            </Link>
        </span>
    )
    return (
        <header className={scrollPage ? `${styles.fixed}` : null}>
            <div className={styles.header}>
                {logo}
                <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
                    <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["hide-menu"]}`} onClick={hideMenu}>

                    </div>
                    <ul>
                        <li className={styles["logo-mobile"]}>
                            {logo}
                            <FaTimes size={22} color='#fff' onClick={hideMenu} />
                        </li>
                        <li>
                            <NavLink to="/shop" className={activeLink} >
                                Cửa hàng
                            </NavLink>
                        </li>
                        <li>
                            <AdminOnlyLink>
                                <NavLink to="/admin/home" className={activeLink}>
                                    | &nbsp; Admin
                                </NavLink>
                            </AdminOnlyLink>
                        </li>
                    </ul>

                    <div className={styles["header-right"]}>
                        <span className={styles.links}>
                            <ShowOnLogin>
                                <NavLink to={"profile"} className={activeLink}>
                                    <FaUserCircle size={16} color='#ff7722' />
                                    <UserName />
                                </NavLink>
                            </ShowOnLogin>
                            <ShowOnLogout>
                                <NavLink to={"login"} className={activeLink}>
                                    Đăng nhập
                                </NavLink>
                            </ShowOnLogout>
                            <ShowOnLogout>
                                <NavLink to={"register"} className={activeLink}>
                                    Đăng ký
                                </NavLink>
                            </ShowOnLogout>
                            <ShowOnLogin>
                                <NavLink to={"order-history"} className={activeLink}>
                                    Đơn hàng
                                </NavLink>
                            </ShowOnLogin>
                            <ShowOnLogin>
                                <Link to={"/"} onClick={logoutUser}>
                                    Đăng xuất
                                </Link>
                            </ShowOnLogin>
                        </span>
                        {cart}
                    </div>
                </nav>
                <div className={styles["menu-icon"]}>
                    {cart}
                    <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
                </div>
            </div>
        </header>
    )
}

export default Header