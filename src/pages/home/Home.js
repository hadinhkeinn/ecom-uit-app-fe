import React from "react";
import Slider from "../../components/slider/Slider";
import "./Home.scss";
import HomeInfoBox from "./HomeInfoBox";
import { newProductData, hotProductData } from "../../components/carousel/data";
import ProductCarousel from "../../components/carousel/Carousel";
import CarouselItem from "../../components/carousel/CarouselItem";
import ProductCategory from "./ProductCategory";
import FooterLinks from "../../components/footer/FooterLinks";

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
  const newProducts = newProductData.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
      />
    </div>
  ))

  const hotProducts = hotProductData.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
      />
    </div>
  ))

  return (
    <>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={"Sản phẩm mới"} btnText={"Mua ngay>>>"} />
          <ProductCarousel products={newProducts} />
          <PageHeading heading={"Sản phẩm nổi bật"} btnText={"Mua ngay>>>"} />
          <ProductCarousel products={hotProducts} />
        </div>
      </section>
      <section className="--bg-grey">
        <div className="container">
          <h3>Danh mục sản phẩm</h3>
          <ProductCategory />
        </div>
      </section>
      <FooterLinks />
    </>
  );
};

export default Home;