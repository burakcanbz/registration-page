import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer } from './userLoginSlice'; // Ensure this path is correct

export type RootState = ReturnType<typeof store.getState>;


const store = configureStore({
    reducer: {
        userLogin: userLoginReducer, // This should be a valid reducer
    },
});

export default store;
