import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    activePage: "artist",
  },
  reducers: {
    updateActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateActivePage } = appSlice.actions;

export default appSlice.reducer;
