import { createSlice } from "@reduxjs/toolkit";
import Wallet from "../../utils/wallet";
import axios from "axios";
import localStorageService from "../../utils/localstorage";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    data: {},
    isAdmin: false,
    isArtist: false,
  },
  reducers: {
    setUserData: (state, action) => {
      // console.log('isAdmin', state.isAdmin)
      const { userData: user } = action.payload;
      state.data = action.payload.userData;
      state.token = action.payload.access_token;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isAdmin = user.account_type === "admin";
      state.isArtist = user.account_type === "artist";
    },
    logout: (state, action) => {
      Wallet.disconnect(true);
      localStorage.removeItem("persist:root");
      localStorageService.clearToken();
      window.location.href = "/";
      state.isLoggedIn = false;
      state.token = null;
      state.data = {};
      state.isAdmin = false;
      state.isArtist = false;
    },
    setArtist: (state, action) => {
      state.isArtist = action.payload.isArtist;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, logout, setArtist } = authSlice.actions;
export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/v1/user/login`,
      user
    );
    const { userData, access_token, refresh_token } = res.data;
    localStorageService.setToken({ access_token, refresh_token });
    // Set current user
    dispatch(setUserData({ userData, access_token, isLoggedIn: true }));
  } catch (e) {
    //handle error later
    throw e;
  }
};

export default authSlice.reducer;
