import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setArtist } from './authSlice';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        activePage: 'artist',
        baseUrl: '',
        artistData : {}
    },
    reducers: {
        updateActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setBaseUrl: (state, action) => {
            state.baseUrl = action.payload;
        },
        setArtistData: (state, action) => {
            state.artistData = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { updateActivePage, setBaseUrl, updatePlaylist, setArtistData } = appSlice.actions;

export const getArtist = (id) => async (dispatch) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/getbyid`,  { id } );
        console.log({ res });
        dispatch(setArtistData(res.data.artist));
    } catch (e) {
        //handle error later
        throw e;
    }
}

export default appSlice.reducer;
