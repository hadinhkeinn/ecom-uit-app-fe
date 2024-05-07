import React, { useEffect, useState } from "react";
import styles from "../../components/product/productList/ProductList.module.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
} from "../../redux/features/auth/authSlice";
import ProductItem from "../../components/product/productItem/ProductItem";
import Loader from "../../components/loader/Loader";

const Wishlist = () => {
  const [grid, setGrid] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const { wishlist, isLoading } = useSelector((state) => state.auth);

  const removeWishlist = async (product) => {
    const productId = product._id;
    console.log(productId);
    await dispatch(removeFromWishlist(productId));
    await dispatch(getWishlist());
  };


  console.log(wishlist);
  // console.log(wishlist.length);

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
          <h2>Danh sách mua sau của tôi</h2>
          <div className="--underline"></div>
          <div className={grid ? `${styles.grid}` : `${styles.list}`}>
            {wishlist.length === 0 ? (
              <p>Không tìm thấy sản phẩm trong danh sách mua sau của bạn</p>
            ) : (
              <>
                {wishlist.map((product) => {
                  return (
                    <div key={product._id}>
                      <ProductItem {...product} grid={grid} product={product} />
                      <button
                        className="--btn --btn-primary --btn-block"
                        onClick={() => removeWishlist(product)}
                      >
                        Xóa khỏi danh sách mua sau
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
