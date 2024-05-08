import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/`;

// Create Category
const createCategory = async (formData) => {
  const response = await axios.post(API_URL + "category", formData);
  return response.data;
};

// Get all Categories
const getCategories = async () => {
  const response = await axios.get(API_URL + "category");
  return response.data;
};

// Delete a Cat
const deleteCategory = async (id) => {
  const response = await axios.delete(API_URL + "category/" + id);
  return response.data.message;
};

const categoryAndBrandService = {
  createCategory,
  getCategories,
  deleteCategory,
};

export default categoryAndBrandService;
