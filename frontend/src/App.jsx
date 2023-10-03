import {BrowserRouter as Router} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Header from './components/Header'
import LoginPrivateRoute from './utils/LoginPrivateRoute'
import Register from './pages/Register'
import LogoutPrivateRoute from './utils/LogoutPrivateRoute'
import {AuthProvider} from './utils/AuthContext'
import AddNote from './pages/AddNote'
import NoteDetail from './pages/NoteDetail'

function App() {

  return (
    <>
      <Router>
          <AuthProvider>
              <Header />
              <LoginPrivateRoute component={HomePage} path='/' exact/>
              <LogoutPrivateRoute component={Login} path='/login' exact />
              <LogoutPrivateRoute component={Register} path='/register' exact />
              <LoginPrivateRoute component={AddNote} path='/new' exact />
              <LoginPrivateRoute component={NoteDetail} path='/detail/:id' exact />
          </AuthProvider>
      </Router>
    </>
  )
}

export default App
