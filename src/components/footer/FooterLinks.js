import React from 'react'
import "./FooterLinks.scss"
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"
// import logoImg from "../../assets/shopito_logo.png" 
import { Link } from 'react-router-dom'

export const logo = (
    <div className='logo'>
            <h2>
                eCom<span>UIT</span>
            </h2>
    </div>
)

const FooterLinks = () => {
  return <>
    <section className='contact-section'>
        <div className='container contact'>
            <div className='contact-icon'>
                <FaFacebookF className="i"/>
                <FaTwitter className="i"/>
                <FaInstagram className="i"/>
                <FaYoutube className="i"/>
            </div>
            <h2>Bắt đầu nào!</h2>
            <a href='#home' className='btn btn-dark'>Liên hệ ngay!</a>
        </div>
    </section>

    <section className='footer-section'>
        <div className='container footer'>
            <div className='footer-logo'>
                {/* <img src={logoImg} alt="logo" /> */}
            </div>
            <div className='footer-menu'>
                <p className='link-heading'>
                    Tính năng
                </p>
                <ul className='nav-ul footer-links'>
                    <li>
                        <a href='#home'>Liên kết rút gọn</a>
                    </li>
                    <li>
                        <a href='#home'>Liên kết thương hiệu</a>
                    </li>
                    <li>
                        <a href='#home'>Phân tích</a>
                    </li>
                    <li>
                        <a href='#home'>Bài viết</a>
                    </li>
                </ul>  
            </div>

            <div className='footer-menu'>
                <p className='link-heading'>
                    Tài nguyên
                </p>
                <ul className='nav-ul footer-links'>
                    <li>
                        <a href='#home'>Bài viết</a>
                    </li>
                    <li>
                        <a href='#home'>Nhà phát triển</a>
                    </li>
                    <li>
                        <a href='#home'>Hỗ trợ</a>
                    </li>
                    <li>
                        <a href='#home'>Tài liệu</a>
                    </li>
                </ul>  
            </div>

            <div className='footer-menu'>
                <p className='link-heading'>
                    Công ty
                </p>
                <ul className='nav-ul footer-links'>
                    <li>
                        <a href='#home'>Giới thiệu</a>
                    </li>
                    <li>
                        <a href='#home'>Đội của chúng tôi</a>
                    </li>
                    <li>
                        <a href='#home'>Sự nghiệp</a>
                    </li>
                    <li>
                        <a href='#home'>Liên hệ</a>
                    </li>
                </ul>  
            </div>

            <div className='footer-menu'>
                <p className='link-heading'>
                    Đối tác
                </p>
                <ul className='nav-ul footer-links'>
                    <li>
                        <a href='#home'>Mạng lưới</a>
                    </li>
                    <li>
                        <a href='#home'>Hợp tác</a>
                    </li>
                    <li>
                        <a href='#home'>Câu chuyện thành công</a>
                    </li>
                    <li>
                        <a href='#home'>Tham gia cùng chúng tôi</a>
                    </li>
                </ul>  
            </div>
        </div>
    </section>
    </>
}

export default FooterLinks
