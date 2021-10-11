import { useImmer } from 'use-immer'
import { useGetTodosQuery } from '../../app/services/todo'
import Loading from '../../components/Loading'
import Todo from './Todo'
import TodoForm from './TodoForm'

import 'twin.macro'

const TodoList: React.FC<{}> = () => {
  const [cursor, setCursor] = useImmer<{ url: string | undefined }>({
    url: '',
  })
  const { isLoading, data, isError, error, refetch } = useGetTodosQuery(
    cursor.url,
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <div>
      <TodoForm />
      {data?.data?.map(todo => (
        <Todo todo={todo} key={todo.id} />
      ))}
      <div tw="flex flex-row justify-around ">
        <button
          disabled={!data?.links?.prev}
          tw="flex flex-1 p-2 bg-blue-300 m-1 justify-center  rounded disabled:bg-blue-100 disabled:cursor-not-allowed"
          onClick={() =>
            setCursor(draft => {
              draft.url = data?.links?.prev
            })
          }
        >
          Prev
        </button>
        <button
          disabled={!data?.links?.next}
          tw="flex flex-1 p-2 bg-blue-300 m-1 justify-center  rounded disabled:bg-blue-100 disabled:cursor-not-allowed"
          onClick={() =>
            setCursor(draft => {
              draft.url = data?.links?.next
            })
          }
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default TodoList
