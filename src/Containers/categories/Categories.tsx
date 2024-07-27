import { useEffect } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { selectCategories, selectLoading } from "./CategoriesSlice";
import OneCategory from "./OneCategory";
import { fetchCategories } from "./CategoriesThunks";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoading);

  const onClick = () => {
    console.log("onclick");
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onDelete = () => {
    console.log("ondelete");
  };
  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <h1>Категории:</h1>
        <button className="btn btn-success" onClick={onClick}>
          Добавить новую катрегорию
        </button>
      </div>
      <div className="mt-3">
        {loading ? (
          <Spinner />
        ) : (
          categories.map((category) => (
            <OneCategory
              key={category.id}
              category={category}
              onDelete={onDelete}
              loading={loading}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Categories;
