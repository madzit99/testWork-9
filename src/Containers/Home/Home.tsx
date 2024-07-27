import { useState } from "react";
import Transactions from "../../Components/Transactions/Transactions";
import { Modal } from "react-bootstrap";
import NewTransaction from "../../Components/NewTransaction/NewTransaction";

const Home = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Transactions onModal={() => setModalOpen(true)} />
      <Modal show={modalOpen} title="Добавить новую транзакцию">
        <div className="modal-body">
          <NewTransaction onClose={() => setModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
