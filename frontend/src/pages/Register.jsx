import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../utils/AuthContext'

const Register = () => {
  const {register, error} = useContext(AuthContext)

  return (
    <div id='register'>
      {error && <h1>{error}</h1>}
      <h4 className='register'>Fill in this form to register</h4>
      <form onSubmit={register} method="post">
            <input type="text" autoFocus name="username" id="username" placeholder='Username' className='input' required />
            <input type="email" name="email" id="email" placeholder='Email' className='input' required/>
            <input type="password" name="password" id="password" placeholder='Password' className='input' required/>
            <input type="password" name="re_password" id="re_password" placeholder='Password again' className='input' required/>
            <input type="submit" value="Submit" className='submit'/>
        </form>
        <h4>Already have an account, login <Link className="links" to='login'>Here</Link></h4>
    </div>
  )
}

export default Register