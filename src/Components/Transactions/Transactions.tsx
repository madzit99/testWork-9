import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { fetchTransactions } from "./TransactionsThunks";
import {
  selectTransactions,
  selectTransactionsLoading,
} from "./TransactionsSlice";
import Spinner from "../Spinner/Spinner";
import OneTransaction from "./OneTransaction";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const loading = useAppSelector(selectTransactionsLoading);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <>
      <div className="d-flex justify-content-between mt-3 text-align-center">
        <h1 className="m-0">Транзакции:</h1>
        <p className="fs-2 fw-bold text-success m-0">Баланс: 0 KGS</p>
        <button className="btn btn-success" onClick={() => console.log("add")}>
          Добавить
        </button>
      </div>
      <div className="mt-3">
        {loading ? (
          <Spinner />
        ) : (
          transactions.map((transaction) => (
            <OneTransaction
              key={transaction.id}
              transaction={transaction}
              onDelete={() => console.log("delete")}
              loading={loading}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Transactions;
