import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {auth} from '../services/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';

//Initial state
const initialState = {
    currentUser: undefined,
    authenticated: undefined,
    isLoading: undefined,
    hasError: undefined,
}

//asynchronous action creators
export const login = createAsyncThunk(
    'login',
    async(userData, thunkAPI) =>{ 
        try{ 
            const {email , password} = userData
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            return userCredential.user;
        }catch(error){
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
)

export const logout = createAsyncThunk(
    'logout',
    async(_, thunkAPI) =>{
        try{
            await signOut(auth);
        }catch(error){
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
)

export const register = createAsyncThunk(
    'register',
    async(userData, thunkAPI) =>{ 
        try{ 
            const {email , password} = userData
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + idToken
                }
            });

            const data = await response.json();
            console.log(data)
            return userCredential.user;

        }catch(error){
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
)

// auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedUser: (state, action)=>{
            
            state.currentUser = action.payload
            state.loading = false       
        }
    },
    extraReducers: builder =>{ 
        builder.addCase(login.pending, (state)=>{
            state.isLoading = true;
            state.authenticated = false;
        });
        builder.addCase(login.fulfilled, (state, action)=>{ 
            state.currentUser = action.payload;
            state.isLoading = false;
            state.authenticated = true;
        });
        builder.addCase(login.rejected, (state, action)=>{
            state.hasError = action.error
            state.isLoading = false;
        }); 
        builder.addCase(logout.pending, (state)=>{
            state.isLoading = true; 
            state.authenticated = true; 
        }); 
        builder.addCase(logout.fulfilled, (state, action)=>{
            state.currentUser = initialState.currentUser;
            state.isLoading = false;
            state.authenticated = false; 
        }); 
        builder.addCase(logout.rejected, (state, action)=>{
            state.error = action.error;
            state.isLoading = false;
        }); 
        builder.addCase(register.pending, (state)=>{
            state.isLoading = true;
            state.authenticated = false;
        }); 
        builder.addCase(register.fulfilled, (state, action)=>{
            state.currentUser = action.payload;
            state.isLoading = false;
            state.authenticated = true;
        });
        builder.addCase(register.rejected, (state, action)=>{
            state.hasError = action.error
            state.isLoading = false;
        }); 
    }
    
});

//Selectors

export const selectCurrentUser = state => state.auth.currentUser;
export const selectIsAuthenticated = state => state.auth.authenticated;
export const selectIsLoading = state => state.auth.isLoading;
export const selectHasError = state => state.auth.hasError

//export actions and  reducer slice
export const {loggedUser} = authSlice.actions

export default authSlice.reducer