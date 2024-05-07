import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductFilter.module.scss";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/features/product/filterSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { GET_PRICE_RANGE } from "../../../redux/features/product/productSlice";

const ProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );
  const [category, setCategory] = useState("Tất cả");
  const [price, setPrice] = useState([10000, 100000]);

  const dispatch = useDispatch();

  const allCategories = [
    "Tất cả",
    ...new Set(products?.map((product) => product.category)),
  ];

  useEffect(() => {
    dispatch(GET_PRICE_RANGE({ products }));
  }, [dispatch, products]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("Tất cả");
    setPrice([minPrice, maxPrice]);
  };

  return (
    <div className={styles.filter}>
      <h4>Loại</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>

      <div className={styles.brand}>
        <h4>Giá</h4>
        <div className={styles.price}>
          <Slider
            range
            step={1000}
            marks={{
              10000: `${price[0]}`,
              200000: `${price[1]}`,
            }}
            min={minPrice}
            max={maxPrice}
            defaultValue={[minPrice, maxPrice]}
            tipFormatter={(value) => `$${value}`}
            tipProps={{
              placement: "top",
              visible: true,
            }}
            value={price}
            onChange={(price) => setPrice(price)}
          />
        </div>
        <br />
        <br />
        <button className="--btn --btn-danger" onClick={clearFilters}>
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
