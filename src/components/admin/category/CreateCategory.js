import React, { useState } from "react";
import Card from "../../card/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import {
  createCategory,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const CreateCategory = ({ reloadCategory }) => {
  const [title, setName] = useState("");

  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const saveCat = async (e) => {
    e.preventDefault();
    if (title.length < 3) {
      return toast.error("Category must be up to 3 characters");
    }
    const formData = {
      title,
    };
    // console.log(formData);
    dispatch(createCategory(formData));
    dispatch(getCategories());
    setName("");
    reloadCategory();
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="--underline"></div>
      <br />
      <div className="--mb2">
        <h3>Tạo loại sản phẩm</h3>
        <p>
          Dùng biểu mẫu để <b>tạo loại sản phẩm mới.</b>
        </p>
        <Card cardClass={"card"}>
          <br />
          <form onSubmit={saveCat}>
            <label>Tên loại sản phẩm:</label>
            <input
              type="text"
              placeholder="Tên loại sản phẩm"
              name="title"
              value={title}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Lưu
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateCategory;
