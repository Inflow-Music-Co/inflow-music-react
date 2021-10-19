import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const updateArtistNfts = (id, ethAddress) => async (dispatch) => {
    try {
        console.log(id, ethAddress);
        const moralisResponse = await axios({
            url: `https://deep-index.moralis.io/api/v2/${ethAddress}/nft?chain=eth&format=decimal`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'YJylRT4sbfyrQItx5s24YvIgFoQOQfMctQsvk5VC6OLE2b51mn5OLFE9x5SACXPk'
            }
        });

        console.log({ moralisResponse });
        const nftData = moralisResponse.data.result.slice(0, 20) // get first 10 token addresses for initial testing
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/nftcollection`,  { id, nftData });
  

    } catch (error) {
        throw error
        
    }
}