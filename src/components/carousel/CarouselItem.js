import React from 'react'
import "./Carousel.scss"
import { Link } from 'react-router-dom'
import { shortenText } from '../../utils'

const CarouselItem = ({url, name, price, description}) => {
  return (
    <div className='carouselItem'>
        <Link to="/product-details">
            <img className='product--image' src={url} alt="product" />
            <p className='price'>
                {`${price}₫`}
            </p>
            <h4 className='product--name'>{shortenText(name, 35)}</h4>           
        </Link>
        <button className='--btn --btn-primary --btn-block'>
            Thêm vào giỏ hàng
        </button>
    </div>
  )
}

export default CarouselItem
