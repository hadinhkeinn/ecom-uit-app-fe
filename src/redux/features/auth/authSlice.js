import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';
  import {toast} from "react-toastify";


const initialState = {
    isLoggedIn: false,
  user: null, 
  isError: false,
  isSuccess: false,
  isLoading: false,
  massage: "",

};

//Register user
export const register  = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      const message = 
      ( error.response &&  
        error.response.data &&
        error.response.data.message
      )||
      error.message ||
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state){
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.massage = "";
    }
  },
  extraReducer: (builder) => {
    builder
    // Register 
    .addCase(register.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;  
      state.user = null;
      toast.success(action.payload);
    })
  } 
});

export const {} = authSlice.actions

export default authSlice.reducer