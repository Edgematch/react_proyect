import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup, Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import AccountForm from '../../components/AccountForm/AccountForm';
import TransferForm from '../../components/TransferForm/TransferForm'
import Title from '../../components/Title/Title';
import Account from '../../components/Account/Account';

import { selectCurrentUser } from '../../Auth/authSlice';
import { getAccounts, selectAccounts, selectStatus } from './AccountsSlice';

const Accounts = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const accounts = useSelector(selectAccounts);
  const user = useSelector(selectCurrentUser);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAccounts());
    }
  }, [status, dispatch, user]);

  return (
    <div>
      <Row>
        <Col lg={6}>
          <AccountForm />
          <Button
            onClick={() => setModalShow(true)}
            className={'mt-4'}
            variant={'grey'}
            style={{ width: '80%', color: 'white', margin: '0 10% 0 10%' }}
          >
            Transfer funds
          </Button>
        </Col>
        <Col lg={6}>
          <Title title="Accounts" />
          <ListGroup>
            {accounts.map((t) => (
              <Account account={t} key={t.id} />
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      ><TransferForm/></Modal>
    </div>
  );
};

export default Accounts;
