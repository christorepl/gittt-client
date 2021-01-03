import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import './App.css'
import AppContext from './Context/AppContext'
import SwipeStack from './Components/SwipeStack/SwipeStack'
import UserDash from './Components/UserDash/UserDash'
import Homepage from './Components/Homepage/Homepage'
import NavBar from './Components/NavBar/NavBar'
import HowToPlay from './Components/HowToPlay/HowToPlay'
import HowToUse from './Components/HowToUse/HowToUse'
import Login from './Components/Login/Login'
import Logout from './Components/Logout/Logout'
import AddGames from './Components/AddGames/AddGames'
import CreateAccount from './Components/CreateAccount/CreateAccount'
import Chat from './Components/Chat/Chat'

class App extends React.Component {
  static contextType = AppContext

  state = {
    isAuthenticated: false,
    navBarToggle: false,
    userEmail: '',
    userPassword: '',
    userName: '',
    games: []
  }

  async componentDidMount () {
    const { isAuthenticated, navBarToggle, games, userEmail, userPassword, userName } = this.context
    this.setState({ isAuthenticated, navBarToggle, games, userEmail, userPassword, userName })
  }

  setNavBarToggle = () => {
    this.setState({navBarToggle: !this.state.navBarToggle})
  }

  onSubmitLogin = (e) => {
    e.preventDefault()
    console.log('logging in')
    if (this.state.userEmail === 'test@test.com' && this.state.userPassword === 'test') {
      this.setState({isAuthenticated: true})
    } else {
      alert('Invalid credentials. Please try again.')
    }
  }

  forceLogin = e => {
    console.log('forcing login')
    e.preventDefault()
    alert('No new account was created for this static client. Loggin you in and redirecting you.')
    this.setState({isAuthenticated: true})
  }

  setEmail = userEmail => {
    //updates state to reflect name written in the login field or create account field
    this.setState({userEmail})
  }
  
  setPassword = userPassword => {
    //updates state to reflect the password written in the login field or create account field
    this.setState({userPassword})
  }

  setName = userName => {
    this.setState({userName})
  }


  logout = () => {
    console.log('loggint out')
    this.setState({isAuthenticated: false})
    this.props.history.push('/')
  }

  render() {

    const value = {
      isAuthenticated: this.state.isAuthenticated,
      navBarToggle: this.state.navBarToggle,
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword,
      userName: this.state.userName,
      logout: this.logout,
      forceLogin: this.forceLogin,
      setName: this.setName,
      setPassword: this.setPassword,
      setEmail: this.setEmail,
      onSubmitLogin: this.onSubmitLogin,
      setNavBarToggle: this.setNavBarToggle
    }

    return(
      <AppContext.Provider
        value = {value}
        >
      <div className="app">
        <NavBar/>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
        <Route
          exact path="/create-account"
          component={CreateAccount}
        />
        <Route
          exact path="/home"
          component={Homepage}
        />
        <Route
          exact path="/user-dash"
          component={UserDash}
        />
        <Route
          exact path="/swiper"
          component={SwipeStack}
        />
        <Route
          exact path="/chat"
          component={Chat}
        />
        <Route
          exact path="/how-to-play"
          component={HowToPlay}
        />
        <Route
          exact path="/how-to-use"
          component={HowToUse}
        />
        <Route
          exact path="/login"
          component={Login}
        />
        <Route
          exact path="/logout"
          component={Logout}
        />
        <Route
          exact path="/add-games"
          component={AddGames}
        />
      </div>
      </AppContext.Provider>
    )
  }
}

export default withRouter(App)