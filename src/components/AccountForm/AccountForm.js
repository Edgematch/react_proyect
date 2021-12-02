import React, { useEffect, useState, useRef } from 'react';
import { Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { selectDarkmodeState } from '../../features/Darkmode/DarkmodeSlice';
import { selectCurrentUser } from '../../Auth/authSlice';
import {
  createAccount,
  selectStatus,
} from '../../features/Accounts/AccountsSlice';

const AccountForm = () => {
  const dispatch = useDispatch();
  const dark = useSelector(selectDarkmodeState);
  const currentUser = useSelector(selectCurrentUser);
  const status = useSelector(selectStatus);

  const [currencies, setCurrencies] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const accountName = useRef();
  const accountType = useRef();
  const currency = useRef();
  const amount = useRef();

  useEffect(() => {
    const getCurrenciesAndAccountTypes = async () => {
      const idToken = await currentUser.getIdToken();
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/currency`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      let currencies = await response.json();

      response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/account-type`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      let accountTypes = await response.json();

      setCurrencies(currencies.data);
      setAccountTypes(accountTypes.data);
    };

    getCurrenciesAndAccountTypes();
  }, [currentUser]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (accountName.current.value === '') return;
    if (accountType.current.value === '') return;
    if (currency.current.value === '') return;
    if (amount.current.value === '') return;

    dispatch(createAccount({
        description: accountName.current.value,
        account_type_id: accountType.current.value,
        currency_id: currency.current.value,
        amount: amount.current.value,
      }));
    accountName.current.value = '';
    accountType.current.value = 'Please Select';
    currency.current.value = 'Please Select';
    amount.current.value = '';
  };

  const accountTypesOptions = accountTypes.map((type) => {
    return (
      <option value={type.id} key={type.id}>
        {type.description}
      </option>
    );
  });

  const currenciesOptions = currencies.map((currency) => {
    return (
      <option value={currency.id} key={currency.id}>
        {currency.description}
      </option>
    );
  });

  return (
    <Card
      bg={dark ? 'secondary' : 'primary'}
      text={dark ? 'dark' : 'white'}
      className="p-4"
      style={{ margin: '55px 5% 0 5%', borderRadius: '25px 25px 25px 25px' }}
    >
      <Card.Title className={'fw-bold fs-3'}>Create Account</Card.Title>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className={'m-3'}>
          <Form.Label>Account Name</Form.Label>
          <Form.Control
            type={'text'}
            placeholder={'e.g Personal Account'}
            ref={accountName}
          ></Form.Control>
        </Form.Group>

        <Form.Group className={'m-3'}>
          <Form.Label>Account Type</Form.Label>
          <Form.Select ref={accountType}>
            <option>Please Select</option>
            {accountTypesOptions}
          </Form.Select>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className={'m-3'}>
              <Form.Label>Currency</Form.Label>
              <Form.Select ref={currency}>
                <option>Please Select</option>
                {currenciesOptions}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className={'m-3'}>
              <Form.Label>Amount</Form.Label>
              <Form.Control type={'number'} ref={amount}></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-1">
          <Col className="d-flex justify-content-center">
            <Button
              disabled={status === 'loading' ? true : false}
              variant="info"
              type="submit"
              className="fw-bold fs-5"
              style={{ width: '90%', color: 'white' }}
            >
              {status === 'loading' && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AccountForm;
