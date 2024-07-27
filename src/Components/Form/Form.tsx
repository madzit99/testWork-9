import React, { useEffect, useState } from "react";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import { ApiTrans, FormTrans } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { selectCategories } from "../../Containers/categories/CategoriesSlice";
import { fetchCategories } from "../../Containers/categories/CategoriesThunks";

const initialState: FormTrans = {
  category: "",
  amount: "",
  date: "",
  type: "",
};

interface Props {
  onSubmit: (transaction: ApiTrans) => void;
  existingTrans?: ApiTrans;
  isEdit?: boolean;
  isLoading?: boolean;
  onClose: () => void;
}

const Form: React.FC<Props> = ({
  onSubmit,
  existingTrans = initialState,
  isEdit = false,
  isLoading = false,
  onClose,
}) => {
  const [trans, setTrans] = useState<FormTrans>(existingTrans);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  const changeTrans = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTrans((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    const now = new Date();
    const createdAt = now.toISOString();

    onSubmit({
      ...trans,
      date: createdAt,
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? "Edit transaction" : "Add new transaction"}</h4>
      <div className="form-group">
        <label htmlFor="type">Тип</label>
        <select
          name="type"
          id="name"
          className="form-control"
          onChange={changeTrans}
          required
        >
          <option value="">Выберите тип</option>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category">Категория</label>
        <select
          name="category"
          id="category"
          className="form-control"
          onChange={changeTrans}
          required
        >
          <option value="">Выберите категорию</option>
          {categories
            .filter((category) => category.type === trans.type)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Количество</label>
        <input
          type="number"
          name="amount"
          id="amount"
          className="form-control"
          value={trans.amount}
          onChange={changeTrans}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-danger mt-2"
        disabled={isLoading}
      >
        {isLoading && <ButtonSpinner />}
        {isEdit ? "Редактировать" : "Создать"}
      </button>
      <button className="btn btn-warning mt-2 ms-2" onClick={onClose}>
        Отменить
      </button>
    </form>
  );
};

export default Form;
