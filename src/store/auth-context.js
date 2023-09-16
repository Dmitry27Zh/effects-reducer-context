import React from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => console.log('log out'),
})

export default AuthContext
