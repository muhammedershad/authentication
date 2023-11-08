import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: null,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.admin = action.payload
        state.error = false
    },
    loginFailed: (state, action) => {
        state.error = true
    },
    logout: (state, action) => {
        state.user = null
        state.error = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, loginFailed, logout } = adminSlice.actions

export default adminSlice.reducer