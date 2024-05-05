import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import "./Home.scss";
import HomeInfoBox from "./HomeInfoBox";
import ProductCarousel from "../../components/carousel/Carousel";
import CarouselItem from "../../components/carousel/CarouselItem";
import ProductCategory from "./ProductCategory";
import FooterLinks from "../../components/footer/FooterLinks";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../redux/features/product/productSlice";
import { motion } from "framer-motion";

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">
          {btnText}
        </button>
      </div>
      <div className="--hr"></div>
    </>
  )
};
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const { products } = useSelector((state) => state.product);

  const latest = products
    ?.filter((item, index) => {
      return item.quantity > 0;
    })
    ?.filter((item, index) => index < 6);

  const latestProducts = latest.map((item) => (
    <div key={item._id}>
      <CarouselItem
        name={item.name}
        url={item.image[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        product={item}
      />
    </div>
  ));

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={"Sản phẩm mới"} btnText={"Mua ngay>>>"} />
          <ProductCarousel products={latestProducts} />
        </div>
      </section>
      <section className="--bg-grey">
        <div className="container">
          <h3>Danh mục sản phẩm</h3>
          <ProductCategory />
        </div>
      </section>
      <section>
        <div className="container">
          <PageHeading heading={"Sản phẩm hot"} btnText={"Mua ngay>>>"} />
          <ProductCarousel products={latestProducts} />
        </div>
      </section>
      <FooterLinks />
    </motion.div>
  );
};

export default Home;