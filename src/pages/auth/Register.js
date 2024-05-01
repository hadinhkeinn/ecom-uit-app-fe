import React, { useEffect, useState } from 'react';
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, register } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
}

const Register = () => {
    const [formData, setFormData] = useState(initialState)
    const { name, email, password, cPassword } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isLoggedIn, isSuccess } = useSelector((state) => state.auth);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    }

    const registerUser = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.error("Phải điền thông tin tất cả các dòng")
        }
        if (password.length < 6) {
            return toast.error("Mật khẩu phải có hơn 6 kí tự")
        }
        if (!validateEmail(email)) {
            return toast.error("Nhập lại email")
        }
        if (password !== cPassword) {
            return toast.error("Mật khẩu không trùng nhau")
        }
        const userData = {
            name,
            email,
            password,
        }

        await dispatch(register(userData));
    };

    useEffect(() => {
        if (isSuccess && isLoggedIn) {
            navigate("/")
        }
        dispatch(RESET_AUTH())
    }, [isSuccess, isLoggedIn, dispatch, navigate]);

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Đăng ký</h2>
                        <form onSubmit={registerUser}>
                            <input
                                type="text"
                                placeholder='Họ và tên'
                                required
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder='Email'
                                required
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                placeholder='Mật khẩu'
                                required
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                placeholder='Xác nhận mật khẩu'
                                required
                                name="cPassword"
                                value={cPassword}
                                onChange={handleInputChange}
                            />
                            <button type='submit' className='--btn --btn-primary --btn-block'>
                                Đăng ký
                            </button>
                        </form>
                        <span className={styles.register}>
                            <p>Bạn đã có tài khoản?</p>
                            <Link to="/login">Đăng nhập</Link>
                        </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={registerImg} alt="Login" width="400" />
                </div>
            </section>
        </>
    )
}

export default Register
