import React from 'react'
import tw from 'twin.macro'
import Login from './features/login/Login'
import TodoList from './features/todo/TodoList'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import AuthenticatedRoute from './middleware/AuthenticatedRoute'
import Dashboard from './features/dashboard'
import CheckLogin from './features/checklogin'
import { useHistory } from 'react-router-dom'
import { Button } from './components'
import { useSelector } from 'react-redux'
import { logout, selectIsAuthenticated } from './features/auth/authSlice'
import { useAppDispatch } from './app/store'
import Loading from './components/Loading'
import { Toaster } from 'react-hot-toast'

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: [tw`flex flex-col items-center justify-center h-full`],
}

const App = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const auth = useSelector(selectIsAuthenticated)
  return (
    <div css={styles.container}>

      <Toaster />
      {auth && (
        <div tw="flex flex-row">
          <Button onClick={() => history.push('/todo')} variant="secondary">
            todo
          </Button>
          <Button
            onClick={() => history.push('/dashboard')}
            variant="secondary"
          >
            dashboard
          </Button>

          <Button onClick={() => dispatch(logout())} variant="primary">
            <Loading /> logout
          </Button>
        </div>
      )}

      <Switch>
        <AuthenticatedRoute path="/login" onlyPublic>
          <Login />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/register" onlyPublic>
          <Login />
        </AuthenticatedRoute>
      </Switch>
      <Switch>
        <AuthenticatedRoute exact path="/">
          <Redirect to="dashboard" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/todo">
          <TodoList />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/dashboard">
          <Dashboard />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/check-login">
          <CheckLogin />
        </AuthenticatedRoute>
      </Switch>
    </div>
  )
}

export default App
