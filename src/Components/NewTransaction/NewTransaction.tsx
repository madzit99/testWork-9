import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { ApiTrans } from "../../types";
import { selectTransactionsLoading } from "../Transactions/TransactionsSlice";
import Form from "../Form/Form";
import {
  createTransaction,
  fetchTransactions,
} from "../Transactions/TransactionsThunks";

interface Props {
  onClose: () => void;
}

const NewTransaction: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectTransactionsLoading);

  const onSubmit = async (transaction: ApiTrans) => {
    await dispatch(createTransaction(transaction));
    await dispatch(fetchTransactions());
    onClose();
  };

  return (
    <>
      <Form onSubmit={onSubmit} isLoading={loading} onClose={onClose} />
    </>
  );
};

export default NewTransaction;
