import React, { useEffect, useState } from 'react'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'
import AuthContext from './store/auth-context'

function App() {
  const storedLoginInfo = localStorage.getItem('isLoggedIn')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (storedLoginInfo === '1') {
      setIsLoggedIn(true)
    }
  }, [])
  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ isLoggedIn, onLogout: logoutHandler }}>
        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    </React.Fragment>
  )
}

export default App
