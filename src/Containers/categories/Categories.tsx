import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { selectCategories, selectLoading } from "./CategoriesSlice";
import OneCategory from "./OneCategory";
import { deleteCategory, fetchCategories } from "./CategoriesThunks";
import Modal from "../../Components/Modal/Modal";
import NewCategory from "../../Components/NewCategory/NewCategory";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoading);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const removeCategory = async (id: string) => {
    await dispatch(deleteCategory(id));
    await dispatch(fetchCategories());
  };

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <h1>Категории:</h1>
        <button className="btn btn-danger" onClick={() => setModalOpen(true)}>
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
              onDelete={() => removeCategory(category.id)}
              loading={loading}
            />
          ))
        )}
      </div>
      <Modal show={modalOpen} title="Добавить категорию">
        <div className="modal-body">
          <NewCategory onClose={() => setModalOpen(false)} />
        </div>
      </Modal>
    </>
  );
};

export default Categories;
