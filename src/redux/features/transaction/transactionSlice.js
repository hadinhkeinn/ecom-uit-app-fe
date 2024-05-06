import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./transactionService";
import { toast } from "react-toastify";

const initialState = {
  transaction: null,
  transactions: [],
  receiverName: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// verify Account
export const verifyAccount = createAsyncThunk(
  "transactions/verify",
  async (formData, thunkAPI) => {
    try {
      return await transactionService.verifyAccount(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// transfer Fund
export const transferFund = createAsyncThunk(
  "transactions/transfer",
  async (formData, thunkAPI) => {
    try {
      return await transactionService.transferFund(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getUserTransactions
export const getUserTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (_, thunkAPI) => {
    try {
      return await transactionService.getUserTransactions();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    RESET_TRANSACTION_MESSAGE(state) {
      state.message = "";
    },
    RESET_RECEIVER(state) {
      state.receiverName = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.receiverName = action.payload.receiverName;
        state.message = action.payload.message;
        toast.success(action.payload.message);
        console.log(action.payload);
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(transferFund.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transferFund.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload);
        console.log(action.payload);
      })
      .addCase(transferFund.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transactions = action.payload;
        // console.log(action.payload);
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_TRANSACTION_MESSAGE, RESET_RECEIVER } =
  transactionSlice.actions;

export const selectTransactions = (state) => state.transaction.transactions;
export const selectTransactionMessage = (state) => state.transaction.message;
export const selectReceiverName = (state) => state.transaction.receiverName;

export default transactionSlice.reducer;
