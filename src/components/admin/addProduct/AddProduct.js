import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import {
  createProduct,
  selectIsLoading,
} from "../../../redux/features/product/productSlice";
import ProductForm from "../productForm/ProductForm";

import "./AddProduct.scss";
import { toast } from "react-toastify";
import { getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  regularPrice: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState([]);
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, category, price, quantity, regularPrice } = product;
  const { categories } = useSelector((state) => state.category);
  // console.log(categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (files.length < 1) {
      return toast.info("Please add an image");
    }

    const formData = {
      name: name,
      sku: generateKSKU(category),
      category: category,
      quantity: Number(quantity),
      regularPrice: regularPrice,
      price: price,
      description: description,
      image: files,
    };

    // console.log(formData);

    await dispatch(createProduct(formData));

    navigate("/admin/all-products");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>

      <ProductForm
        files={files}
        setFiles={setFiles}
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveProduct={saveProduct}
        categories={categories}
        isEditing={false}
      />
    </div>
  );
};

export default AddProduct;
