import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "../Containers/categories/CategoriesSlice";
import { transactionsReducer } from "../Components/Transactions/TransactionsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
