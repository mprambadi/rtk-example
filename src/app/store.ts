import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authApi } from './services/auth'
import { todoApi } from './services/todo'

import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist'
import authSlice, { authReducer } from '../features/auth/authSlice'
import { Reducer } from 'redux';


import { createAction } from '@reduxjs/toolkit';

export const RESET_STATE_ACTION_TYPE = 'resetState';
export const resetStateAction = createAction(RESET_STATE_ACTION_TYPE, () => {
  return { payload: null };
});


/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
  }

  return next(action)
}

const reducers = {
  [todoApi.reducerPath]: todoApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [authSlice.name]: authReducer
}

const combinedReducer = combineReducers<typeof reducers>(reducers)

export type RootState = ReturnType<typeof store.getState>

export const rootReducer: Reducer = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {}
  }

  return combinedReducer(state, action)
}


export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(todoApi.middleware, authApi.middleware, rtkQueryErrorLogger),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
