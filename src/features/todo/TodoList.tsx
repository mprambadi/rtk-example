import { useEffect } from 'react'
import { useGetTodosQuery } from '../../app/services/todo'
import Todo from './Todo'

const TodoList: React.FC<{}> = () => {
  const { isLoading, data, isError, error, refetch } = useGetTodosQuery()

  if (isLoading) {
    return <div>Loading....................</div>
  }

  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <div>
      {data?.data?.map(todo => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  )
}

export default TodoList
