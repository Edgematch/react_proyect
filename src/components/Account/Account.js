import React from 'react';
import { CloseButton, ListGroup } from 'react-bootstrap';

import { useSelector, useDispatch} from 'react-redux';
import { selectDarkmodeState } from '../../features/Darkmode/DarkmodeSlice';
import {
    deleteAccount
  } from '../../features/Accounts/AccountsSlice';

const Account = ({ account }) => {
  const dispatch = useDispatch();
  const dark = useSelector(selectDarkmodeState);
  const theme =
    'd-flex justify-content-between align-items-start mb-2 border-3 bg-transparent';
  const { id, description, account_type, currency, amount, add_date} = account;

  const onClickHandler =()=>{
    dispatch(deleteAccount(id))
  }

  return (
    <div>
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
            {' '}
            <span className="fw-bold text-info">Account:</span> {description}
          </h5>
          <span className="fw-bold text-info">Type:</span> {account_type} |{' '}
          <span className="fw-bold text-info">{currency}</span>{' '}
          {parseFloat(amount).toFixed(2)} - {' '}
          <span className="fw-bold text-info text-right">Created: </span> {add_date}
          
        </div>
        <CloseButton  className={dark? "btn-close-white": "btn-close-black"} onClick={onClickHandler}/>
      </ListGroup.Item>
    </div>
  );
};

export default Account;
