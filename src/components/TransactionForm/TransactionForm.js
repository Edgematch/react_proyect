import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { selectDarkmodeState } from '../../features/Darkmode/DarkmodeSlice';
import { selectCurrentUser } from '../../Auth/authSlice';
import { selectAccounts } from '../../features/Accounts/AccountsSlice';
import { createTransaction } from '../../features/transactions/TransactionsSlice';

const TransactionForm = () => {
  const dispatch = useDispatch();
  const dark = useSelector(selectDarkmodeState);

  const [type, setType] = useState('Income');
  const [category, setCategory] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const accounts = useSelector(selectAccounts);

  const dateRef = useRef();
  const categoryRef = useRef();
  const accountRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    const getTranasctionCategories = async () => {
      const idToken = await currentUser.getIdToken();
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/category`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      let categories = await response.json();
      setCategory(categories.data);
    };

    getTranasctionCategories();
  }, [currentUser]);

  const transactionType = (e) => {
    setType(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(dateRef.current.value === '') return;
    if(categoryRef.current.value === '') return;
    if(accountRef.current.value === '') return;
    if(amountRef.current.value === '') return;

    let cleanAmount = Number(amountRef.current.value)

    if (type === 'Expense') cleanAmount = -cleanAmount

    dispatch(createTransaction({
      amount: cleanAmount,
      category_id: categoryRef.current.value,
      account_id: accountRef.current.value,
      transaction_date: dateRef.current.value
    }));

    dateRef.current.value = '';
    categoryRef.current.value = 'Plase Select';
    accountRef.current.value = 'Please Select';
    dateRef.current.value = '';

  };

  const categoryOptions = category
    .filter((value) => value.category_type === type)
    .map((t) => {
      return (
        <option value={t.id} key={t.id}>
          {t.description}
        </option>
      );
    });

    const accountsOptions = accounts
    .map((t) => {
      return (
        <option value={t.id} key={t.id}>
          {t.description}
        </option>
      );
    });

  return (
    <>
      <Card
        bg={dark ? 'secondary' : 'primary'}
        text={dark ? 'dark' : 'white'}
        border={type === 'Income' ? 'success': 'danger'}
        className="p-4"
      >
        <Card.Title className="fw-bold">NEW TRANSACTION</Card.Title>

        <Row className="d-flex p-2 offset-xl-4">
          <Col xs={6} xl={3}>
            <Button
              variant={type === 'Income' ? 'success': 'grey'}
              value="Income"
              onClick={transactionType}
              style={{ color: 'white', width: '100%' }}
            >
              Income
            </Button>
          </Col>
          <Col xs={6} xl={3}>
            {' '}
            <Button
              variant={type === 'Expense' ? 'danger': 'grey'}
              value="Expense"
              onClick={transactionType}
              style={{ color: 'white', width: '100%' }}
            >
              Expense
            </Button>
          </Col>
        </Row>

        <Form onSubmit={onSubmitHandler}>
          <Row className={'mb-2'}>
            <Col md={6} xl={3}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type={'date'}
                  ref={dateRef}
                  placeholder={'e.g Personal Account'}
                ></Form.Control>
              </Form.Group>{' '}
            </Col>
            <Col md={6} xl={3}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select ref={categoryRef}>
                  <option>Please Select</option>
                  {categoryOptions}
                </Form.Select>
              </Form.Group>{' '}
            </Col>

            <Col md={6} xl={3}>
              <Form.Group>
                <Form.Label>Account</Form.Label>
                <Form.Select ref={accountRef}>
                  <option>Please Select</option>
                  {accountsOptions}
                </Form.Select>
              </Form.Group>{' '}
              </Col>

              <Col md={6} xl={3}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type={'number'} step="0.01" ref={amountRef}></Form.Control>
              </Form.Group>{' '}
              </Col>
          </Row>


          <Row className="mt-1">
            <Col xl={4} md={8} className="d-flex justify-content-center offset-xl-4 offset-md-2">
              <Button
                variant="info"
                type="submit"
                className="fw-bold fs-5 mt-3"
                style={{ width: '90%', color: 'white' }}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default TransactionForm;
