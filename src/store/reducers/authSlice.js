import { createSlice } from "@reduxjs/toolkit";
import Wallet from "../../utils/wallet";
import axios from "axios";
import localStorageService from "../../utils/localstorage";
import { Magic } from "magic-sdk";
const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);

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
      state.token = action.payload.didToken;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isAdmin = user.account_type === "admin";
      state.isArtist = user.account_type === "artist";
    },
    _logout: (state, action) => {
      Wallet.disconnect(true);
      localStorage.removeItem("persist:root");
      localStorageService.clearToken();
      // window.location.href = "/";
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
export const { setUserData, _logout, setArtist } = authSlice.actions;
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

export const logout = () => (dispatch) => {
  magic.user
    .logout()
    .then(() => {
      dispatch(_logout());
    })
    .catch((e) => {
      console.log("logout-error:", e);
    });
};

export const loginWithMagicLink =
  ({ email, account_type }) =>
  async (dispatch) => {
    try {
      // Trigger Magic link to be sent to user, it expires in 15 mins
      const didToken = await magic.auth.loginWithMagicLink({
        email,
        // redirectURI: new URL("/callback", window.location.origin).href,
      });
      // Validate didToken with server
      //TODO: need to discuss how to handle account_type.
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/v1/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "Bearer " + didToken,
          },
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        // generate new didToken which lasts far.
        const _didToken = await magic.user.getIdToken();
        // const _didToken = await magic.user.generateIdToken({
        //   lifespan: 60 * 60 * 24,
        // });

        localStorage.setItem("didToken", _didToken);
        localStorage.setItem("email", email);
        dispatch(
          setUserData({
            userData: data.userData,
            didToken: _didToken,
            isLoggedIn: true,
          })
        );
      }
    } catch (e) {
      console.log("handleRegisterWithMagic", e);
    }
  };
export default authSlice.reducer;
