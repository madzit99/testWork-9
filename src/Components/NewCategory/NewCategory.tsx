import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { ApiCategory } from "../../types";
import CategoryForm from "../Form/CategoryForm";
import {
  createCategory,
  fetchCategories,
} from "../../Containers/categories/CategoriesThunks";
import { selectLoading } from "../../Containers/categories/CategoriesSlice";

interface Props {
  onClose: () => void;
}

const NewCategory: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);

  const onSubmit = async (category: ApiCategory) => {
    await dispatch(createCategory(category));
    await dispatch(fetchCategories());
    onClose();
  };

  return (
    <>
      <CategoryForm onSubmit={onSubmit} isLoading={loading} onClose={onClose} />
    </>
  );
};

export default NewCategory;
