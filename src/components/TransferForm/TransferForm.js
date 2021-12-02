import React, { useRef } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import { selectAccounts, transferAccount } from '../../features/Accounts/AccountsSlice';


const TransferForm = () => {
  const dispatch = useDispatch();
 

  const accounts = useSelector(selectAccounts);

  const fromRef = useRef();
  const toRef = useRef();
  const amountRef = useRef();




  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(fromRef.current.value === '') return;
    if(toRef.current.value === '') return;
    if(amountRef.current.value === '') return;
    if(fromRef.current.value === toRef.current.value) return

    let cleanAmount = Number(amountRef.current.value)

    dispatch(transferAccount({
      from_account_id: fromRef.current.value,
      to_account_id: toRef.current.value,
      amount: cleanAmount
    }))

    fromRef.current.value = 'Plase Select';
    toRef.current.value = 'Plase Select';
    amountRef.current.value = '';

  };

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
        bg={'grey'}
        text={'white'}
        className="p-4"
      >
        <Card.Title className="fw-bold">NEW TRANSFER</Card.Title>

        <Form onSubmit={onSubmitHandler}>
          <Row className={'mb-2'}>
            <Col md={6} xl={3}>
              <Form.Group>
                <Form.Label>From</Form.Label>
                <Form.Select ref={fromRef}>
                  <option>Please Select</option>
                  {accountsOptions}
                </Form.Select>
              </Form.Group>{' '}
            </Col>
            <Col md={6} xl={3}>
              <Form.Group>
                <Form.Label>To</Form.Label>
                <Form.Select ref={toRef}>
                  <option>Please Select</option>
                  {accountsOptions}
                </Form.Select>
              </Form.Group>{' '}
            </Col>

              <Col md={6} xl={3}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type={'number'} ref={amountRef}></Form.Control>
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
                Transfer
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default TransferForm;