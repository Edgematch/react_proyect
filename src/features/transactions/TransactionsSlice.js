import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  status: 'idle',
  error: null,
};

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transaction, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { currentUser },
      } = getState();
      const idToken = await currentUser.getIdToken();

      let createTransaction = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/transaction`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(transaction),
        }
      );

      await createTransaction.json();

      const {
        accounts: { accounts },
      } = getState();

      const account = accounts.filter(
        (value) => value.id === transaction.account_id
      );

      const amountToUpdate = Number(account[0].amount) + Number(transaction.amount);
      console.log(amountToUpdate);

      let updateAccount = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/account`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ id: account[0].id, amount: amountToUpdate }),
        }
      );

      await updateAccount.json();

      return transaction;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async(_, {getState, rejectWithValue })=>{
    try {
      const {
        auth: { currentUser },
      } = getState();
      const idToken = await currentUser.getIdToken();

      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/transaction`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          }
        }
      );
      
      const transactionData = await response.json();
      return transactionData.data

    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
)

const TransactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    //create transaction
    builder.addCase(createTransaction.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.status = 'idle';
      state.error = null;
    });

    builder.addCase(createTransaction.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    //get transactions
    builder.addCase(getTransactions.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.transactions = action.payload;
      state.error = null;
    });

    builder.addCase(getTransactions.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

//selector

// export const selectTransactions = (state) => Object.values(state.transactions).reduce((a,b) => [...a, ...b], []);
// export const selectRawTransactions = (state) => state.transactions;
export const selectTransactions = (state) => state.transactions.transactions;
export const selectTransactionsStatus = (state) => state.transactions.status;

export default TransactionsSlice.reducer;
