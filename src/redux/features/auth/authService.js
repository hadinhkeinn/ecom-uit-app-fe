import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData, {
    withCredentials: true,
  });
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

// Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "getLoginStatus");
  return response.data;
};

// Get user profile
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

// Update profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

// Update Photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updatePhoto", userData);
  return response.data;
};

// Send Verification Email
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");
  return response.data.message;
};

// Verify User
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );

  return response.data.message;
};

// Change Password
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);

  return response.data.message;
};

// Reset Password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );

  return response.data.message;
};

// fORGOT Password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);

  return response.data.message;
};

// Get Users
const getUsers = async () => {
  const response = await axios.get(API_URL + "getUsers");

  return response.data;
};
// Delete User
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

// Upgrade User
const upgradeUser = async (userData) => {
  const response = await axios.post(API_URL + "upgradeUser", userData);

  return response.data.message;
};

// Send Login Code
const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `sendLoginCode/${email}`);

  return response.data.message;
};
// Login With Code
const loginWithCode = async (code, email) => {
  const response = await axios.post(API_URL + `loginWithCode/${email}`, code);

  return response.data;
};
// Login With Googlr
const loginWithGoogle = async (userToken) => {
  const response = await axios.post(API_URL + "google/callback", userToken);

  return response.data;
};

// aDD TO WISHLIST
const addToWishlist = async (productData) => {
  const response = await axios.post(API_URL + "addToWishlist", productData, {
    withCredentials: true,
  });
  return response.data.message;
};

// Get Wishlist
const getWishlist = async () => {
  const response = await axios.get(API_URL + "getWishlist");

  return response.data;
};

// Remove From Wishlist
const removeFromWishlist = async (productId) => {
  const response = await axios.put(API_URL + `wishlist/${productId}`);

  return response.data.message;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  updatePhoto,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};

export default authService;
