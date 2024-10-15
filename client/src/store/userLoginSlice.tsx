import { createSlice } from '@reduxjs/toolkit'

// Only holding name and email data for security concerns. If someone gains the app's state, passwords would be obtainable and usable easily. 
export const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        email: '',
        token: null,
        isLoggedIn: false
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.email = action.payload.email;
            state.token = action.payload.token; // Store the authentication token
            state.isLoggedIn = true;
        },  
        logout: (state) => {
            state.email = '';
            state.token = null;
            state.isLoggedIn = false;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
})

export const { loginSuccess, logout, setIsLoggedIn } = userLoginSlice.actions;

export const userLoginReducer = userLoginSlice.reducer;