import { createSlice } from '@reduxjs/toolkit'
import { authApi, Token } from '../../app/services/auth'
import { RootState } from '../../app/store'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
  name: null,
  token: null,
  isAuthenticated: false,
} as { name: string | null; token: string | null; isAuthenticated: boolean }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (_state, _action) => {})
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.name = action.payload.data.name
        state.token = action.payload.data.token
      })
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (_state, _action) => {},
      )
  },
})

export const { logout } = slice.actions

export default slice

export const authReducer = persistReducer(
  {
    key: 'rtk:auth',
    storage,
    whitelist: ['token'],
  },
  slice.reducer,
)

export const selectIsAuthenticated = (state: RootState) => {
  return state.auth.token
}
