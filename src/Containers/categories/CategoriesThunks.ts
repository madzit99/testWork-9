import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ApiCategory, CategoriesList, Category } from "../../types";
import axiosApi from "../../axiosApi";

export const fetchCategories = createAsyncThunk<
  Category[],
  undefined,
  { state: RootState }
>("categories/fetchAll", async () => {
  const categoriesResponse = await axiosApi.get<CategoriesList | null>(
    "/categories.json"
  );
  const categories = categoriesResponse.data;
  let newCategories: Category[] = [];

  if (categories) {
    newCategories = Object.keys(categories).map((key) => {
      const category = categories[key];
      return {
        ...category,
        id: key,
      };
    });
  }
  return newCategories;
});

export const createCategory = createAsyncThunk<
  void,
  ApiCategory,
  { state: RootState }
>("categories/create", async (category) => {
  await axiosApi.post("/categories.json", category);
});

export const deleteCategory = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("categories/delete", async (categoryId) => {
  await axiosApi.delete(`/categories/${categoryId}.json`);
});
