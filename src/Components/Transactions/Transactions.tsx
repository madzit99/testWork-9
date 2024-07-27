import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { deleteTransaction, fetchTransactions } from "./TransactionsThunks";
import {
  selectTransactions,
  selectTransactionsLoading,
} from "./TransactionsSlice";
import Spinner from "../Spinner/Spinner";
import OneTransaction from "./OneTransaction";

interface Props {
  onModal: () => void;
}

const Transactions: React.FC<Props> = ({ onModal }) => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const loading = useAppSelector(selectTransactionsLoading);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const removeTransaction = async (id: string) => {
    await dispatch(deleteTransaction(id));
    await dispatch(fetchTransactions());
  };

    const totalAmount = transactions.reduce((total, transaction) => {
      const amount = parseFloat(transaction.amount);
      return transaction.type === "income" ? total + amount : total - amount;
    }, 0);

  return (
    <>
      <div className="d-flex justify-content-between mt-3 text-align-center">
        <h1 className="m-0">Транзакции:</h1>
        <p className="fs-2 fw-bold text-danger m-0">Баланс: {totalAmount} KGS</p>
        <button className="btn btn-danger" onClick={onModal}>
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
              onDelete={() => removeTransaction(transaction.id)}
              loading={loading}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Transactions;
