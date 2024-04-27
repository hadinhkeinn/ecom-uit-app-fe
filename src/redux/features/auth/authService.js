import axios from "axios";

const BACKEND_URL = process.env.REACH_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + "register",userData, {
        WITHCredentials: true,      
    })
    return response.data 
};

const authService = {
    register
}

export default authService;