import React, { useState } from 'react'
import { useLoginMutation } from '../../app/services/auth'
import { useHistory, useLocation } from 'react-router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginAction, { isLoading, isError }] = useLoginMutation()

  const loggedIn = async () => {
    await loginAction({ email, password })
  }

  return (
    <div>
      <div>
        <input
          name="email"
          type="text"
          className="p-2 border-2 bg-yellow-400"
          onChange={({ target: { value } }) => {
            setEmail(value)
          }}
        />
      </div>
      <div>
        <input
          name="password"
          type="text"
          onChange={({ target: { value } }) => {
            setPassword(value)
          }}
        />
      </div>

      <div>
        <button onClick={loggedIn}>Login</button>
      </div>
    </div>
  )
}

export default Login
