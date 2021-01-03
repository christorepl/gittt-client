import React from 'react'
import STORE from '../STORE/STORE'

const AppContext = React.createContext({
  games: STORE.games,
  setNavBarToggle: () => {},
  swiped: () => {},
  outOfFrame: () => {},
  swipe: () => {},
  navAddGames: () => {},
  setLastDirection: () => {},
  setGames: () => {},
  loginUser: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setName: () => {},
  //temp function for static client
  forceLogin: () => {},
  userEmail: '',
  userPassword: '',
  isAuthenticated: false,
  navBarToggle: false,
})

export default AppContext
