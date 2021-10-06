const Todo = (props: any) => {
  const {
    todo: { title, status },
  } = props
  return (
    <div>
      <div>{title}</div>
      <div>{status}</div>
    </div>
  )
}

export default Todo
