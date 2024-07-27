import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import axiosApi from "../../axiosApi";
import { ApiTrans, Transaction, TransactionsList } from "../../types";

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  undefined,
  { dispatch: AppDispatch }
>("transactions/fetchAll", async () => {
  const transactionsResponse = await axiosApi.get<TransactionsList | null>(
    "/transactions.json"
  );
  const transactions = transactionsResponse.data;
  let newTransactions: Transaction[] = [];

  if (transactions) {
    newTransactions = Object.keys(transactions).map((key) => {
      const transaction = transactions[key];
      return {
        ...transaction,
        id: key,
      };
    });
  }

  return newTransactions;
});

export const createTransaction = createAsyncThunk<
  void,
  ApiTrans,
  { state: RootState }
>("transactions/create", async (transaction) => {
  await axiosApi.post("/transactions.json", transaction);
});

export const deleteTransaction = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("transactions/delete", async (transactionId) => {
  await axiosApi.delete(`/transactions/${transactionId}.json`);
});
