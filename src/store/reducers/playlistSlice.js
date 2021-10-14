import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        data: [],
        img: {}
    },
    reducers: {
        addMp3s : (state, action ) => {
            state.data = [...state.data, action.payload]
        },
        addImage : (state, action ) => {
            state.img = action.payload
        },
        clearPlaylist: (state, action) => {
            state.data = [];
            state.img = {};
        }
    }
});

export const updateArtistPlaylists = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/uploadplaylist`, data)
        
    } catch (error) {
        throw error;
    }
}

export const { addMp3s, addImage, clearPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;