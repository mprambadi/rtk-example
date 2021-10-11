import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../utlis'
import { BaseResponseList, BaseResponse } from './auth'

export interface Todo {
  id: number
  title: string
  status: boolean
}

export const todoApi = createApi({
  reducerPath: 'todosApi', // We only specify this because there are many services. This would not be common in most applications
  baseQuery,
  tagTypes: ['Todos'],
  endpoints: build => ({
    getTodos: build.query<BaseResponseList<Todo[] | []>, string | void>({
      query: cursor => {
        if (cursor) {
          const url = new URL(cursor)
          const urlParams = new URLSearchParams(url.search)
          const cursorParam = urlParams.get('cursor')
          return { url: `todos?cursor=${cursorParam}` }
        }
        return 'todos'
      },
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    getTodoById: build.query<BaseResponse<Todo | string>, void>({
      query: id => ({ url: `todos/${id}` }),
    }),
    getErrorProne: build.query<{ success: boolean }, void>({
      query: () => 'error-prone',
    }),
    addTodo: build.mutation<Todo, Partial<Todo>>({
      query: body => ({ url: 'todos', body, method: 'POST' }),
      invalidatesTags: (result, error, id) => {
        return result ? [{ type: 'Todos', id: 'LIST' }] : []
      },
    }),
  }),
})

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useGetErrorProneQuery,
  useAddTodoMutation,
} = todoApi
