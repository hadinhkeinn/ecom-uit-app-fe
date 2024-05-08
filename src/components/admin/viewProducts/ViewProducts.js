import React, { useEffect, useState } from "react";
import "./ViewProducts.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import Search from "../../search/Search";
import { Spinner } from "../../loader/Loader";
import { shortenText } from "../../../utils";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";

const ViewProducts = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  const filteredProducts = useSelector(selectFilteredProducts);
  // console.log(filteredProducts);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Xóa sản phẩm",
      message: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      buttons: [
        {
          label: "Xóa",
          onClick: () => delProduct(id),
        },
        {
          label: "Huy bỏ",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  // Begin Pagination
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  // End Pagination

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className="product-list">
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Tất cả sản phẩm</h3>
            <p>
              ~ <b>{filteredProducts.length} sản phẩm được tìm thấy</b>
            </p>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <Spinner />}

        <div className="table">
          {!isLoading && currentItems.length === 0 ? (
            <p>-- Không tìm thấy sản phẩm...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Loại</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {price} 
                        {"₫"}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {price * quantity}
                        {"₫"}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-details/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/admin/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Kế tiếp"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Trước"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ViewProducts;
