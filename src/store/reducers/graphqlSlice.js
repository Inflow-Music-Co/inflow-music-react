import { createSlice } from '@reduxjs/toolkit'

export const graphqlSlice = createSlice({
  name: 'graphql',
  initialState: {
    clienturl:''
  },
  reducers: {
    setclienturl: (state, action) => {
      state.clienturl = action.payload.clienturl
    },
  },
})

// Action creators are generated for each case reducer function
export const { setclienturl } = graphqlSlice.actions

export default graphqlSlice.reducer
