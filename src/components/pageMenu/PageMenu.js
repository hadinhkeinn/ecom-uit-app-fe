import React from "react";
import "./PageMenu.scss"
import { NavLink } from "react-router-dom";


const PageMenu = () => {
    return (
        <div>
            <nav className="--bg-primary --p --mb">
                <ul className="home-links">
                    <li>
                        <NavLink to="/profile">Hồ sơ</NavLink>
                    </li>
                    <li>
                        <NavLink to="/wallet">Ví</NavLink>
                    </li>
                    <li>
                        <NavLink to="/wishlist">Mua sau</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default PageMenu;