import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { RootState } from './store'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://heroku-demo-laravel.herokuapp.com/api/',
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
});
