import React, { useEffect, useState } from 'react'
import styles from "./auth.module.scss"
import loginImg from "../../assets/login.png"
import Card from "../../components/card/Card"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import Loader from '../../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_AUTH, login } from '../../redux/features/auth/authSlice'
import { useSearchParams } from "react-router-dom"
import { getCartDB, saveCartDB } from "../../redux/features/product/cartSlice";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isLoggedIn, isSuccess } = useSelector((state) => state.auth);
    const [urlParams] = useSearchParams();
    const redirect = urlParams.get("redirect");

    const loginUser = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.error("Phải điền thông tin tất cả các dòng")
        }
        if (!validateEmail(email)) {
            return toast.error("Nhập lại email")
        }

        const userData = {
            email,
            password,
        }

        await dispatch(login(userData));
    };

    // useEffect(() => {
    //     if (isSuccess && isLoggedIn) {
    //         navigate("/")
    //     }

    //     dispatch(RESET_AUTH())
    // },
    //     [isSuccess, isLoggedIn, dispatch, navigate]
    // );
    useEffect(() => {
        if (isLoggedIn && isSuccess) {
            if (redirect === "cart") {
                dispatch(
                    saveCartDB({
                        cartItems: JSON.parse(localStorage.getItem("cartItems")),
                    })
                );
                return navigate("/cart");
            }
            dispatch(getCartDB());
            // navigate("/");
            // window.location.reload();
        }

        dispatch(RESET_AUTH());
    }, [isSuccess, isLoggedIn, navigate, dispatch, redirect]);


    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={loginImg} alt="Login" width="400" />
                </div>

                <Card>
                    <div className={styles.form}>
                        <h2>Đăng nhập</h2>
                        <form onSubmit={loginUser}>
                            <input
                                type="text"
                                placeholder='Email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder='Mật khẩu'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type='submit' className='--btn --btn-primary --btn-block'>
                                Đăng nhập
                            </button>
                        </form>
                        <span className={styles.register}>
                            <p>Bạn chưa có tài khoản?</p>
                            <Link to="/register">Đăng ký</Link>
                        </span>
                    </div>
                </Card>
            </section>
        </>
    );
}

export default Login
