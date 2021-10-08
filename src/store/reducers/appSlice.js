import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        activePage: 'artist',
        baseUrl: ''
    },
    reducers: {
        updateActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setBaseUrl: (state, action) => {
            state.baseUrl = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { updateActivePage, setBaseUrl } = appSlice.actions;

export default appSlice.reducer;
