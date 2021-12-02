import {configureStore} from '@reduxjs/toolkit';

// import authSlice from './Auth/authSlice';
// import DarkmodeSlice from './features/Darkmode/DarkmodeSlice';
// import AccountsSlice from './features/Accounts/AccountsSlice'
// import TransactionsSlice from './features/transactions/TransactionsSlice';

import {rootReducer} from './rootReducer';


export default configureStore({
    reducer: rootReducer
})