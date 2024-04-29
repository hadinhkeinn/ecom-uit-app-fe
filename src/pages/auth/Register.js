import React, { useState } from 'react'
import styles from "./auth.module.scss"
import registerImg from "../../assets/register.png"
import Card from "../../components/card/Card"
import { Link } from "react-router-dom"

const initialState = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
}

const Register = () => {
    const [formData, setFormData] = useState(initialState)
    const { name, email, password, cPassword } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    }

    const registerUser = () => { };

    return <section className={`container ${styles.auth}`}>
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
}

export default Register
