import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/features/auth/authSlice"

export cost store = configureStore({
    reducer : {
        auth : authReducer, 

    }



})