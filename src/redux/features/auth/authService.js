import axios from "axios";

const BACKEND_URL = process.env.REACH_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + "register",userData, {
        WITHCredentials: true,      
    });
    return response.data; 
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login",userData);
    return response.data; 
};

// Logout user
const logout = async () => {
    const response = await axios.get(API_URL + "logout");
    return response.data.message; 
};
//Get login status
const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getLoginStatus");
    return response.data; 
};

const authService = {
    register,
    login,
    logout,
    getLoginStatus,
}

export default authService;