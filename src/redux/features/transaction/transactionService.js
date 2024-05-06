import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/transaction/`;

// Verify Account
const verifyAccount = async (formData) => {
  const response = await axios.post(`${API_URL}verifyAccount/`, formData);
  return response.data;
};

// Transfer Fund
const transferFund = async (formData) => {
  const response = await axios.post(`${API_URL}transferFund/`, formData);
  return response.data.message;
};

// getUserTransactions
const getUserTransactions = async () => {
  const response = await axios.get(`${API_URL}getUserTransactions`);
  return response.data;
};

const transactionService = {
  verifyAccount,
  transferFund,
  getUserTransactions,
};

export default transactionService;
