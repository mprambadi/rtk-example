import React from 'react'
import { FormEvent } from 'react'
import { useImmer } from 'use-immer'
import { Todo, useAddTodoMutation } from '../../app/services/todo'
import { Button, ErrorForm, Form, Input } from '../../components'
import Loading from '../../components/Loading'
import 'twin.macro'
import toast from 'react-hot-toast'

const TodoForm = () => {
  const [todoForm, setTodoForm] = useImmer<Partial<Todo>>({
    title: '',
    status: false,
  })

  const [addTodo, { isLoading, isError, error }] = useAddTodoMutation()
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(!todoForm.title?.trim()){
        toast("title could not empty")
        return
    }
    addTodo(todoForm)
    setTodoForm(draft => {
      draft.title = ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodoForm(draft => {
      draft.title = e.target.value
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input
        autoComplete="off"
        name="title"
        placeholder="title"
        onChange={handleChange}
        value={todoForm.title}
      />

      <Button type="submit" isLoading={isLoading} disabled={isLoading}>
        <Loading /> Add Post
      </Button>
    </Form>
  )
}

export default TodoForm
