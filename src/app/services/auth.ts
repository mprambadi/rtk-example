import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { baseQuery } from '../utlis'

export interface BaseResponse<T> {
  success: boolean
  data: T
  message: string
}

export interface User {
  email: string
  password: string
}

export interface Token {
  token: string
  name: string
}

export const authApi = createApi({
  reducerPath: 'authApi', // We only specify this because there are many services. This would not be common in most applications
  baseQuery: baseQuery,
  endpoints: build => ({
    login: build.mutation<BaseResponse<Token>, User>({
      query: (credentials: any) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi

export const {
  endpoints: { login },
} = authApi
