import React from 'react'
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../utils/AuthContext'


const Login = () => {
  const {login, error} = useContext(AuthContext)
  return (
    <div id='login'>
        {error && <h1>{error}</h1>}
        <form onSubmit={login}>
            <input type="text" name="username" id="username" placeholder='Username' autoFocus className='input'/>
            <input type="password" name="password" id="password" placeholder='Password'className='input'/>
            <input type="submit" value="Login" className ='submit'/>
        </form>
        <h4>You don`t have an account, create an account <Link to='register' className="links">Here</Link></h4>
    </div>
  )
}

export default Login