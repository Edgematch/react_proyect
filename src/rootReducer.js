import {combineReducers} from 'redux';

import authSlice from './Auth/authSlice';
import DarkmodeSlice from './features/Darkmode/DarkmodeSlice';
import AccountsSlice from './features/Accounts/AccountsSlice'
import TransactionsSlice from './features/transactions/TransactionsSlice';


const appReducer = combineReducers({
    auth: authSlice,
    darkmode: DarkmodeSlice,
    accounts: AccountsSlice,
    transactions: TransactionsSlice
});

export const rootReducer = (state, action) => {
  if (action.type === 'logout/fulfilled') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};