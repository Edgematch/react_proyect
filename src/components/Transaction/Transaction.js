import React from 'react';
import { CloseButton, ListGroup } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { selectDarkmodeState } from '../../features/Darkmode/DarkmodeSlice';

const Transaction = ({ transaction }) => {
  const dark = useSelector(selectDarkmodeState);
  const theme =
    'd-flex justify-content-between align-items-start mb-2 border-3 bg-transparent';
  const { id, amount, currency, category, type, date, account } = transaction;
  const color =
    type === 'Expense' ? 'fw-bold text-danger' : 'fw-bold text-success';

  return (
    <>
      <ListGroup.Item
        as="li"
        className={
          theme +
          ' ' +
          (dark ? 'border-secondary text-white' : 'border-primary text-dark')
        }
        style={{ borderRadius: '20px' }}
      >
        <div className="ms-2 me-auto">
        
          <h5>
            <span className={color}>{type}: </span>
            {parseFloat(amount).toFixed(2)} {currency} {' '}
            <span className={'fw-bold text-info'}>Category: </span>
            {category}
          </h5>
          <span className={'fw-bold text-info'}>Account: </span>
          {account} |{' '}
          <span className={'fw-bold text-info'}>Transaction date: </span>
          {date}
        </div>
        <CloseButton variant={dark ? 'white' : 'primary'} />
      </ListGroup.Item>
    </>
  );
};

export default Transaction;
