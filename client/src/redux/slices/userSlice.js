import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.user = action.payload
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
export const { loginSuccess, loginFailed, logout } = userSlice.actions

export default userSlice.reducer