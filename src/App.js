import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import './App.css'
import AppContext from './Context/AppContext'
import SwipeStack from './Components/SwipeStack/SwipeStack'
import Homepage from './Components/Homepage/Homepage'
import NavBar from './Components/NavBar/NavBar'
import HowToPlay from './Components/HowToPlay/HowToPlay'
import HowToUse from './Components/HowToUse/HowToUse'
import Login from './Components/Login/Login'
import AddGames from './Components/AddGames/AddGames'

class App extends React.Component {
  static contextType = AppContext

  state = {
    isAuthenticated: false,
    navBarToggle: false,
    userEmail: '',
    userPassword: '',
    games: []
  }

  async componentDidMount () {
    const { isAuthenticated, navBarToggle, games} = this.context
    this.setState({ isAuthenticated, navBarToggle, games })
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

  setEmail = userEmail => {
    //updates state to reflect name written in the login field or create account field
    this.setState({userEmail})
  }
  
  setPassword = userPassword => {
    //updates state to reflect the password written in the login field or create account field
    this.setState({userPassword})
  }


  render() {

    const value = {
      isAuthenticated: this.state.isAuthenticated,
      navBarToggle: this.state.navBarToggle,
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword,
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
          exact path="/home"
          component={Homepage}
        />
        <Route
          exact path="/swiper"
          component={SwipeStack}
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
          exact path="/add-games"
          component={AddGames}
        />
      </div>
      </AppContext.Provider>
    )
  }
}

export default App
