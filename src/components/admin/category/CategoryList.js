import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteCategory,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const CategoryList = () => {
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const confirmDelete = (_id) => {
    confirmAlert({
      title: "Xóa loại sản phẩm",
      message: "Bạn có chắc chắn muốn xóa loại sản phẩm này?",
      buttons: [
        {
          label: "Xóa",
          onClick: () => delCat(_id),
        },
        {
          label: "Hủy bỏ",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const delCat = async (_id) => {
    await dispatch(deleteCategory(_id));
    await dispatch(getCategories());
  };

  return (
    <div className="--mb2 ">
      <h3>Tất cả danh mục sản phẩm</h3>

      <div className={"table"}>
        {categories.length === 0 ? (
          <p>Không tìm thấy danh mục sản phẩm</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => {
                const { _id, title } = cat;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{title}</td>

                    <td>
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
    </div>
  );
};

export default CategoryList;
