import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';

//components
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import Title from '../../components/Title/Title';
import Transaction from '../../components/Transaction/Transaction';

//Slice
import { selectTransactions, selectTransactionsStatus, getTransactions } from './TransactionsSlice';
import {getAccounts, selectStatus} from '../../features/Accounts/AccountsSlice';

const Transactions = () => {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const accountStatus = useSelector(selectStatus);
  const transactionStatus = useSelector(selectTransactionsStatus);

  useEffect(() => {
    if (accountStatus === 'idle') {
      dispatch(getAccounts())
    }

    
  }, [accountStatus, dispatch])

  useEffect(()=>{
    if (transactionStatus === 'idle'){
      dispatch(getTransactions());
    }
  }, [transactionStatus, dispatch])

  


  return (
    <>
      <Title title="Transactions" />

      <ListGroup>
        {transactions.map((t)=> <Transaction transaction={t} key={t.id}/>)}
      </ListGroup>
      <Button
        onClick={() => setModalShow(true)}
        variant="info"
        className="fw-bold fs-1"
        style={{
          height: '70px',
          width: '70px',
          borderRadius: '50%',
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          color: 'white',
        }}
      >
        +
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <TransactionForm />
        
      </Modal>

    </>
  );
};

export default Transactions;
