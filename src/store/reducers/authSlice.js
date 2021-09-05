import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import localStorageService from "../../utils/localstorage";
import { Magic } from "magic-sdk";
import { disconnect } from "./walletSlice";
const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY_RINKEBY);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    data: {},
    isAdmin: false,
    isArtist: false,
    isFan: true,
  },
  reducers: {
    setUserData: (state, action) => {
      const { userData: user } = action.payload;
      state.data = action.payload.userData;
      state.token = action.payload.access_token;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isAdmin = user.account_type === "admin";
      state.isArtist = user.account_type === "artist";
      state.isFan = user.account_type === "user";
    },
    _logout: (state, action) => {
      // Wallet.disconnect(true);
      localStorage.removeItem("persist:root");
      localStorageService.clearToken();
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
      dispatch(disconnect());
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
      const initialDidToken = await magic.auth.loginWithMagicLink({ email });
      const didToken = await magic.user.generateIdToken({
        lifespan: 60 * 60 * 25,
      });

      // console.log("initial didToken", initialDidToken);
      // console.log("new token", didToken);

      // Validate didToken with server and Create new token which includes didToken and account_type
      const { data } = await axios({
        url: `${process.env.REACT_APP_SERVER_URL}/v1/user/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "Bearer " + didToken,
        },
        data: { account_type },
      });
      const { access_token } = data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("id", data.userData._id);
      localStorage.setItem("account_type", data.userData.account_type);
      dispatch(
        setUserData({
          userData: data.userData,
          access_token,
          isLoggedIn: true,
        })
      );

      if (data.userData.account_type === "artist") {
        dispatch(setArtist(true));
      }
    } catch (e) {
      console.log("handleRegisterWithMagic", e);
    }
  };
export default authSlice.reducer;
