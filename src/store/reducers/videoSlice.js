import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        data: {}
    },
    uploadProgress: null,
    reducers: {
        setVideo: (state, action) => {
            state.data = action.payload;
        },
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        }
    }
});

export const createArtistVideo = (data) => async (dispatch) => {
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
            `${process.env.REACT_APP_SERVER_URL}/v1/artist/video`,
            data,
            config
        );
        console.log(res);
    } catch (error) {
        throw error;
    }
};

export const { setVideo, setUploadProgress } = videoSlice.actions;

export default videoSlice.reducer;
