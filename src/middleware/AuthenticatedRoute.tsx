import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../features/auth/authSlice'
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom'

export type AuthenticatedRouteProps = {
  onlyPublic?: boolean
} & RouteProps

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
  onlyPublic = false,
  ...routeProps
}) => {
  const user = useSelector(selectIsAuthenticated)

  return (
    <Route
      {...routeProps}
      render={({ location }) => {
        if (onlyPublic) {
          return !user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          )
        }

        return user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}

export default AuthenticatedRoute
