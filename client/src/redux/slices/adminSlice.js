import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: null,
  token: null,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.admin = action.payload.admin
        state.error = false
        state.token = action.payload.token
    },
    loginFailed: (state, action) => {
        state.error = true
    },
    loginRoll : (state, action) => {
      state.roll = admin
    },
    logout: (state, action) => {
        state.admin = null
        state.error = false
        state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, loginFailed, logout } = adminSlice.actions

export default adminSlice.reducer