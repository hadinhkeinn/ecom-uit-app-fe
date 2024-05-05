import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/products/`;

// Get all products
const getAll = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get product by id
const getProduct = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
}

const productService = {
    getAll,
    getProduct,
};

export default productService;