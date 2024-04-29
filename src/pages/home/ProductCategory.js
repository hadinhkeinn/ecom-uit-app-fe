import React from "react";
import "./ProductCategory.scss";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Arduino",
    image: "https://nshopvn.com/wp-content/uploads/2020/08/mach-stm8s103f3p6-ntt3-1-300x300.jpg",
  },
  {
    id: 2,
    title: "Cảm biến",
    image: "https://nshopvn.com/wp-content/uploads/2023/12/de-cam-bien-hien-dien-con-nguoi-hlk-ld2410c-220v-1-kenh-10s1-1-300x300.jpg",
  },
  {
    id: 3,
    title: "Đồng hồ vạn năng",
    image: "https://nshopvn.com/wp-content/uploads/2023/03/anh-dai-dien-dong-ho-van-nang-tu-dong-auto-aneng-m118a-aqua-1-300x300.jpg",
  },
  {
    id: 4,
    title: "Đèn LED",
    image: "https://nshopvn.com/wp-content/uploads/2019/08/den-bao-co-coi-ad16-22sm-mau-do-220v-6ysz-1-300x300.jpg",
  },
  {
    id: 5,
    title: "Module, Mạch điện",
    image: "https://nshopvn.com/wp-content/uploads/2024/04/mach-phun-suong-sieu-am-108khz-micro-nhieu-che-do-42ad-5-300x300.jpg",
  },
  {
    id: 6,
    title: "Phụ kiện, Dụng cụ",
    image: "https://nshopvn.com/wp-content/uploads/2019/03/tru-dong-duc-cai-m3-01i0-x6zc-17dq-gcde-2d0i-693g-zou0-wkoc-7efz-2iul-4ncc-l6eq-gf81-gsxl-soyu-gv75-1-300x300.jpg",
  },
];

const Category = ({ title, image }) => {
  const navigate = useNavigate();
  return (
    <div className="category">
      <h3>{title}</h3>
      <img src={image} alt="cat" />
      <button className="--btn" onClick={() => navigate("/shop")}>
        {"Mua ngay >>>"}
      </button>
    </div>
  );
};

const ProductCategory = () => {
  return (
    <div className="categories">
      {categories.map((cat) => {
        return (
          <div key={cat.id} className="--flex-center">
            <Category title={cat.title} image={cat.image} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;