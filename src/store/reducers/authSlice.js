import { createSlice } from "@reduxjs/toolkit";
import Wallet from "../../utils/wallet";
import axios from "axios";
import { Magic } from "magic-sdk";
import jwt_decode from "jwt-decode";
const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY_RINKEBY);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    data: {},
    isAdmin: false,
    isArtist: false,
    isFan: true
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
      Wallet.disconnect(true);
      localStorage.removeItem("persist:root");
      localStorage.removeItem("access_token");
      state.isLoggedIn = false;
      state.token = null;
      state.data = {};
      state.isAdmin = false;
      state.isArtist = false;
      state.isArtist = true;
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
    // localStorageService.setToken({ access_token, refresh_token });
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
  (email) =>
  async (dispatch) => {
    try {
      // Trigger Magic link to be sent to user, it expires in 15 mins
      const initialDidToken = await magic.auth.loginWithMagicLink({ email });
      console.log("initialDidToken", initialDidToken)
      //validate the didToken
      // await axios({
      //   url: `${process.env.REACT_APP_SERVER_URL}/v1/user/loginWithMagicLink`,
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-access-token": "Bearer " + initialDidToken,
      //   }
      // })
      // after validate the initialDidToken, create new didToken that expires far

      // 15 mins lifespan token
      // const didToken = initialDidToken;
      //very long lifespan token
      // const didToken = await magic.user.getIdToken()   
      //customized lifespan token 25 hours which is larger than JWT token lifespan: 24 hours
      const didToken = await magic.user.generateIdToken({
        lifespan: 60 * 60 * 25,
      });
      console.log("new didtoken", didToken)
      // Validate didToken with server and Create new token which includes didToken and account_type
      const { data } = await axios({
        url: `${process.env.REACT_APP_SERVER_URL}/v1/user/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "Bearer " + didToken,
        }
      })
      const { access_token } = data
      localStorage.setItem("access_token", access_token);

        dispatch(
          setUserData({
            userData: data.userData,
            access_token,
            isLoggedIn: true,
          })
        );
    } catch (e) {
      console.log("handleRegisterWithMagic", e);
    }
  };
export default authSlice.reducer;
