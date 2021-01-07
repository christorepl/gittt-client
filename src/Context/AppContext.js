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
  setBGAName: () => {},
  createAccount: () => {},
  user_name: '',
  BGAName: '',
  lastDirection: '',
  userName: '',
  userEmail: '',
  userPassword: '',
  isAuthenticated: false,
  navBarToggle: false,
})

export default AppContext
