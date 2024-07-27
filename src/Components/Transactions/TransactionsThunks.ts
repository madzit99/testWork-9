import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../app/store";
import axiosApi from "../../axiosApi";
import { Transaction, TransactionsList } from "../../types";

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
