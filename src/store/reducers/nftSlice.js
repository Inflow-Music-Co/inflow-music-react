import { createSlice } from '@reduxjs/toolkit';

export const nftSlice = createSlice({
    name: 'nft',
    initialState: {
        aritst_nfts: {}
    },
    reducers : {
        setArtistNfts: (state, action) => {
            state.aritst_nfts = action.payload;
        }
    }
});

export const { setArtistNfts } = nftSlice.actions;

export const updateArtistNfts = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/v1/artist/nftcollection`,  id);
        
    } catch (error) {
        throw error
        
    }
}