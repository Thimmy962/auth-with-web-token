import React, { useContext, useState } from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from './AuthContext'

const LoginPrivateRoute = ({children, ...rest}) => {
    const {user} = useContext(AuthContext)
  return (
    <Route {...rest}>{user ? children : <Redirect to='/login' />}</Route>
  )
}

export default LoginPrivateRoute

// if there is not user i.e user = null or false
// redirect to login page
// else go to the normal page
// You cant use any page that requires a user without logging in