import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {},
    token: '',
    isAdmin: true,
    isArtist: false,
  },
  reducers: {
    login: (state, action) => {
      console.log('isAdmin', state.isAdmin)
      state.data = action.payload
      state.token = action.payload.token
      state.isAdmin = true
    },
    logout: () => {
      localStorage.removeItem("persist:root");
      window.location.href = "/login";
    },
    setArtist: (state, action) => {
      state.isArtist = action.payload.isArtist
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, setArtist } = authSlice.actions

export default authSlice.reducer
