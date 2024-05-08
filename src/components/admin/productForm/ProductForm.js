import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./ProductForm.scss";
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";

const ProductForm = ({
  files,
  setFiles,
  product,
  productImage,
  imagePreview,
  setImagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  categories,
  isEditing,
}) => {
  // useEffect(() => {
  //   const updateImagePreview = () => {
  //     // const imagesArray = files.map((file) => {
  //     //   return file;
  //     // });
  //     setImagePreview(files);
  //   };
  //   updateImagePreview();
  // }, [files, setImagePreview]);

  const removeImage = (image) => {
    console.log(image);
    setFiles(files.filter((img, index) => img !== image));
  };

  return (
    <div className="add-product">
      <UploadWidget files={files} setFiles={setFiles} />

      <Card cardClass={"card"}>
        <br />
        <form onSubmit={saveProduct}>
          <label>Hình ảnh sản phẩm:</label>
          <div className="slide-container">
            <aside>
              {files.length > 0 &&
                files.map((image) => (
                  <div key={image} className="thumbnail">
                    <img src={image} alt="productImage" height={100} />
                    <div>
                      <BsTrash
                        size={15}
                        className="thumbnailIcon"
                        onClick={() => removeImage(image)}
                      />
                    </div>
                  </div>
                ))}
              {files.length < 1 && (
                <p className="--m">Không có hình ảnh</p>
              )}
            </aside>
          </div>
          <br />
          <hr />
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Loại sản phẩm:</label>
          <select
            name="category"
            value={product?.category}
            className="form-control"
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option>{product?.category}</option>
            ) : (
              <option>Chọn loại sản phẩm</option>
            )}
            {categories.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._name}>
                  {cat.title}
                </option>
              ))}
          </select>

          <label>Giá ban đầu:</label>
          <input
            type="text"
            placeholder="Giá ban đầu"
            name="regularPrice"
            value={product?.regularPrice}
            onChange={handleInputChange}
          />
          <label>Giá chính thức:</label>
          <input
            type="text"
            placeholder="Giá chính thức"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Số lượng:</label>
          <input
            type="text"
            placeholder="Số lượng"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Chi tiết sản phẩm:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Lưu sản phẩm
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
