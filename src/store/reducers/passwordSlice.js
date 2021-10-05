import { createSlice } from '@reduxjs/toolkit';

export const passwordSlice = createSlice({
    name: 'password',
    initialState: {
        passwordIs: false
    },
    reducers: {
        setCorrectPassword: (state, action) => {
            state.passwordIs = action.payload;
        }
    }
});

export const { setCorrectPassword } = passwordSlice.actions;

export default passwordSlice.reducer;