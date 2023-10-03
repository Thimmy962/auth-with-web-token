import React, { useContext, useState } from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from './AuthContext'

const LogoutPrivateRoute = ({children, ...rest}) => {
    const {user} = useContext(AuthContext)
  return (
    <Route {...rest}>{user ? <Redirect to='' /> : children}</Route>
  )
}

export default LogoutPrivateRoute

// if there is a user you can`t go to login or register page
// redirect user to home page if they try to login or register while logged in