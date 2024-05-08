import React from 'react'
import "./Carousel.scss"
import { Link } from 'react-router-dom'
import { getCartQuantityById, shortenText } from '../../utils';
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  saveCartDB,
  selectCartItems,
} from "../../redux/features/product/cartSlice";

const CarouselItem = ({ url, name, price, description, product }) => {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  return (
    <div className='carouselItem'>
      <Link to={`/product-details/${product._id}`}>
        <img className='product--image' src={url} alt="product" />
        <p className='price'>
          {`${price}₫`}
        </p>
        <h4 className='product--name'>{shortenText(name, 20)}</h4>
      </Link>
      <button className='--btn --btn-primary --btn-block' onClick={() => addToCart(product)}>
        Thêm vào giỏ hàng
      </button>
    </div>
  )
}

export default CarouselItem;
