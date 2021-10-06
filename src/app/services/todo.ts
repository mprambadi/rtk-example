import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../utlis'
import { BaseResponse } from './auth'

export interface Todo {
  id: number
  title: string
  body: string
}

export const todoApi = createApi({
  reducerPath: 'todosApi', // We only specify this because there are many services. This would not be common in most applications
  baseQuery,
  endpoints: build => ({
    getTodos: build.query<BaseResponse<Todo[] | []>, void>({
      query: () => ({ url: 'todos' }),
    }),
    getTodoById: build.query<BaseResponse<Todo | string>, void>({
      query: id => ({ url: `todos/${id}` }),
    }),
    getErrorProne: build.query<{ success: boolean }, void>({
      query: () => 'error-prone',
    }),
  }),
})

export const { useGetTodosQuery, useGetTodoByIdQuery, useGetErrorProneQuery } =
  todoApi
