import React from "react";
import ButtonSpinner from "../../Components/Spinner/ButtonSpinner";
import { Category } from "../../types";

interface Props {
  category: Category;
  onDelete: React.MouseEventHandler;
  loading: boolean;
}

const OneCategory: React.FC<Props> = ({ category, onDelete, loading }) => {
  let color;
  let text;
  if (category.type === "income") {
    color = "text-success";
  } else if (category.type === "expense") {
    color = "text-danger";
    text = "Расход";
  }

  return (
    <div className="d-flex align-items-center">
      <h3 className={color}>{category.name}</h3>
      <p className="m-0 ms-3">{text}</p>
      <div className="btn-wrapper d-flex gap-3 ms-auto">
        <button className="btn btn-success">Edit</button>
        <button
          className="btn btn-danger"
          onClick={onDelete}
          disabled={loading}
        >
          {loading && <ButtonSpinner />}
          Удалить
        </button>
      </div>
    </div>
  );
};

export default OneCategory;
