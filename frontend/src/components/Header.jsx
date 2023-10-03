import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../utils/AuthContext'


const Header = () => {
  const {user, logout} = useContext(AuthContext)

  return (
    <div>
      <div id='header'>
            <Link to='/' className="links"><i>THIMMY</i></Link>
            <div id='loggedOut'>
            {user ? (
             <>
              <p className="links"><b>{user.username}</b></p>
              <span>|</span>
              <p onClick={logout} className="links" id='arrow'>Logout</p>
             </>
            ) : (
              <>
                <Link to='/login' className="links">Login</Link>
                <span>|</span>
                <Link to='/register' className="links">Register</Link>
              </>
            )
          }
            </div>
      </div>
      <hr />
    </div>
  )
}

export default Header