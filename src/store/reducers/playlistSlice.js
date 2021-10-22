import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        data: [
            {
                file: {},
                name: ''
            }
        ],
        img: {},
        uploadProgress: null
    },
    reducers: {
        addMp3s: (state, action) => {
            state.data = [...state.data, action.payload];
        },
        removeMp3: (state, action) => {
            state.data = [
                ...state.data.slice(0, action.payload),
                ...state.data.slice(action.payload + 1)
            ];
        },
        addImage: (state, action) => {
            state.img = action.payload;
        },
        clearPlaylist: (state, action) => {
            state.data = [];
            state.img = {};
            state.uploadProgress = null;
        },
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        }
    }
});

export const updateArtistPlaylists = (data) => async (dispatch) => {
    try {
        let percentageCompleted = null;
        const config = {
            onUploadProgress: (progressEvent) => {
                percentageCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                dispatch(setUploadProgress(percentageCompleted));
            }
        };
        const res = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/v1/artist/uploadplaylist`,
            data,
            config
        );
        console.log(res);
    } catch (error) {
        throw error;
    }
};

export const updateArtistSingleMp3 = (data) => async (dispatch) => {
    try {
        let percentageCompleted = null;
        const config = {
            onUploadProgress: (progressEvent) => {
                percentageCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                dispatch(setUploadProgress(percentageCompleted));
            }
        };
        const res = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/v1/artist/uploadmp3`,
            data,
            config
        );
        console.log(res);
    } catch (error) {
        throw error;
    }
};

export const { addMp3s, addImage, removeMp3, clearPlaylist, setUploadProgress } =
    playlistSlice.actions;

export default playlistSlice.reducer;
