import { useLoginMutation } from '../../app/services/auth'
import { useImmer } from 'use-immer'
import { Button, Form, Input } from '../../components'
import Loading from '../../components/Loading'
import { FormEvent } from 'react'

type LoginState = {
  email: string
  password: string
}

const Login = () => {
  const [{ email, password }, setLogin] = useImmer<LoginState>({
    email: '',
    password: '',
  })

  const [loginAction, { isLoading, isError }] = useLoginMutation()

  const loggedIn = (e: FormEvent) => {
    e.preventDefault()
    loginAction({ email, password })
  }

  return (
    <Form onSubmit={loggedIn}>
      <Input
        name="email"
        type="text"
        placeholder="email"
        className="p-2 border-2 bg-yellow-400"
        onChange={({ target: { value } }) => {
          setLogin(draft => {
            draft.email = value
          })
        }}
      />
      <Input
        name="password"
        type="password"
        placeholder="password"
        onChange={({ target: { value } }) => {
          setLogin(draft => {
            draft.password = value
          })
        }}
      />
      <Button isLoading={isLoading} type="submit">
        <Loading />
        Login
      </Button>
    </Form>
  )
}

export default Login
