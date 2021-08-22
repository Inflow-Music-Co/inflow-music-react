import { createSlice } from '@reduxjs/toolkit'
import Wallet from "../../utils/wallet";
import axios from 'axios'
import localStorageService from '../../utils/localstorage'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {},
    isAdmin: true,
    isArtist: false,
  },
  reducers: {
    setUserData: (state, action) => {
      // console.log('isAdmin', state.isAdmin)
      const { userData: user } = action.payload
      state.data = action.payload.userData
      state.token = action.payload.access_token
      state.isAdmin = user.account_type === "admin"
      state.isArtist = user.account_type === "artist"
    },
    logout: () => {
      Wallet.disconnect(true);
      localStorage.removeItem("persist:root");
      localStorageService.clearToken();
      window.location.href = "/login";
    },
    setArtist: (state, action) => {
      state.isArtist = action.payload.isArtist
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData, logout, setArtist } = authSlice.actions
export const loginUser = user => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/login`, user)
    const { userData, access_token, refresh_token,} = res.data
    localStorageService.setToken({access_token, refresh_token});
    // Set current user
    dispatch(setUserData({userData, access_token}));
  } catch(e) {
    //handle error later
    console.log(e)
  }

};

export default authSlice.reducer
