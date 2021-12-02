import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  accounts: [],
  status: 'idle',
  error: null,
};

export const createAccount = createAsyncThunk(
  'accounts/createAccount',
  async (account, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { currentUser },
      } = getState();
      const idToken = await currentUser.getIdToken();
      console.log(JSON.stringify(account));
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/account`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(account),
        }
      );

      await response.json();
      return account;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const getAccounts = createAsyncThunk(
  'accounts/getAccounts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { currentUser },
      } = getState();
      const idToken = await currentUser.getIdToken();
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/account`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const accounts = await response.json();
      return accounts.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { currentUser },
      } = getState();
      const idToken = await currentUser.getIdToken();
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/account/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      await response.json();
      return id;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const transferAccount = createAsyncThunk(
  'accounts/transferAccount',
  async (data, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { currentUser },
      } = getState();
      const idToken = await currentUser.getIdToken();
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/transfer`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      await response.json();
      return data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

const AccountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create account
    builder.addCase(createAccount.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.status = 'idle';
      state.error = null;
    });

    builder.addCase(createAccount.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    //getAccounts
    builder.addCase(getAccounts.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(getAccounts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.accounts = action.payload;
      state.error = null;
    });

    builder.addCase(getAccounts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    //delete

    builder.addCase(deleteAccount.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.status = 'idle';
      state.error = null;
    });

    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    //transfer

    builder.addCase(transferAccount.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(transferAccount.fulfilled, (state, action) => {
      state.status = 'idle';
      state.error = null;
    });

    builder.addCase(transferAccount.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const selectAccounts = (state) => state.accounts.accounts;
export const selectStatus = (state) => state.accounts.status;
export const selectHasError = (state) => state.accounts.error;

export default AccountsSlice.reducer;
