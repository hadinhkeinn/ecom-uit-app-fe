import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService';
import { toast } from "react-toastify";

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Get all products
export const getAll = createAsyncThunk(
    "product/getAll",
    async (_, thunkAPI) => {
        try {
            return await productService.getAll()
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message
                ) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        RESET_STATE: (state) => {
            state.product = null;
            state.products = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // Get all products  
            .addCase(getAll.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.slice(0, 11);
                state.isSuccess = true;

            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    }
});

export const { RESET_STATE } = productSlice.actions;

export default productSlice.reducer;