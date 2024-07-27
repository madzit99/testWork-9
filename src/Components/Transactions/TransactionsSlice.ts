import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../types";
import { fetchTransactions } from "./TransactionsThunks";
import { RootState } from "../../app/store";

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: boolean;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      fetchTransactions.fulfilled,
      (state, { payload: items }) => {
        state.loading = false;
        state.error = false;
        state.transactions = items;
      }
    );
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const transactionsReducer = transactionsSlice.reducer;

export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;
export const selectTransactionsLoading = (state: RootState) =>
  state.transactions.loading;
