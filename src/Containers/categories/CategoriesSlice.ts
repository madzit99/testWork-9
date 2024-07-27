import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types";
import { RootState } from "../../app/store";
import { fetchCategories } from "./CategoriesThunks";

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload: items } ) => {
      state.loading = false;
      state.categories = items;

    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) =>
  state.categories.categories;
export const selectLoading = (state: RootState) => state.categories.loading;
