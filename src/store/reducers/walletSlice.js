import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        wallet_address: '',
        wallet_email: '',
        wallet_connected: false,
        provider: {}
    },
    reducers: {
        connected: (state, action) => {
            state.wallet_address = action.payload.address;
            state.wallet_email = action.payload.email;
            state.wallet_connected = true;
        },
        disconnect: (state) => {
            state.wallet_address = '';
            state.wallet_connected = false;
            state.provider = {};
        },
        setProvider: (state, action) => {
            state.provider = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { connected, disconnect, setProvider } = walletSlice.actions;

export default walletSlice.reducer;
