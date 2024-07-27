import React, { useState } from "react";
import { ApiCategory } from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const initialState: ApiCategory = {
  name: "",
  type: "",
};

interface Props {
  onSubmit: (category: ApiCategory) => void;
  existingCategory?: ApiCategory;
  isEdit?: boolean;
  isLoading?: boolean;
  onClose: () => void;
}

const CategoryForm: React.FC<Props> = ({
  onSubmit,
  existingCategory = initialState,
  isEdit = false,
  isLoading = false,
  onClose
}) => {
  const [category, setCategory] = useState<ApiCategory>(existingCategory);

  const changeCategory = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    onSubmit({
      ...category,
    });
  };


  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <h4>{isEdit ? "Редактировать категорию" : "Добавить новую категорию"}</h4>
        <div className="form-group">
          <label htmlFor="type">Тип</label>
          <select
            name="type"
            id="type"
            className="form-control"
            onChange={changeCategory}
            required
          >
            <option value="">Выберите тип </option>
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Название</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={category.name}
            onChange={changeCategory}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={isLoading}
        >
          {isLoading && <ButtonSpinner />}
          {isEdit ? "Редактировать" : "Создать"}
        </button>
        <button className="btn btn-danger mt-2 ms-2" onClick={onClose}>
          Отменить
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
