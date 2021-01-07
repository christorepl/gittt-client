import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import './App.css'
import API_BASE_URL from './config'
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
// import AddBGA from './Components/AddBGA/AddBGA'
// import BGAAuth from './Components/BGAAuth/BGAAuth'

class App extends React.Component {
  static contextType = AppContext

  state = {
    isAuthenticated: false,
    navBarToggle: false,
    lastDirection: null,
    BGAName: '',
    //user_name stores the logged in user's name, userName stores the name entered into forms
    user_name: '',
    userName: '',
    userEmail: '',
    userPassword: '',
    games: []
  }

  async componentDidMount () {
    const { BGAName, user_name, lastDirection, isAuthenticated, navBarToggle, games, userEmail, userPassword, userName } = this.context
    this.setState({ BGAName, user_name, lastDirection, isAuthenticated, navBarToggle, games, userEmail, userPassword, userName })
  }

  setNavBarToggle = () => {
    this.setState({navBarToggle: !this.state.navBarToggle})
  }

  onSubmitLogin = async(e) => {
    e.preventDefault()
    try {

        const { email, password } = this.state
        const body = { email, password }
        const response = await fetch(API_BASE_URL + "auth/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })

        const parseRes = await response.json()
        const user_name = parseRes.user_name
        
        if(parseRes.jwt_token) {
            localStorage.setItem("jwt_token", parseRes.jwt_token)
            this.loginUser('login', user_name)
        }  else {
            this.loginUser(parseRes)
        }

    } catch (err){
        console.error(err.message)
    }
}

  setEmail = email => {
    //updates state to reflect name written in the login field or create account field
    this.setState({email})
  }
  
  setPassword = password => {
    //updates state to reflect the password written in the login field or create account field
    this.setState({password})
  }

  setName = user_name => {
    this.setState({user_name})
  }

  setLastDirection = lastDirection => {
    this.setState({lastDirection})
  }

  swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    this.setLastDirection(direction)
  }

  logout = () => {
    this.setState({isAuthenticated: false})
    this.props.history.push('/home')
  }

  createAccount = async (e) => {
    e.preventDefault()

    try {
      const { email, user_name, password } = this.state
      const body = { email, user_name, password }
    
      const response = await fetch(API_BASE_URL + "auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()
      const new_user_name = parseRes.new_user_name
      
      // localStorage.setItem("jwt_token", parseRes.jwt_token)
      
      if(parseRes.jwt_token) {
        localStorage.setItem("jwt_token", parseRes.jwt_token)
        this.loginUser('create', new_user_name)
    }  else {
        this.loginUser(parseRes)
    }


    } catch(err) {
      console.error(err.message)
    }
  }

  loginUser = async(attempt, user_name) => {
    // logs in the user
    if (attempt === 'login'){
      alert('Login successful')
      this.setState({ isAuthenticated: true, user_name })
    } else if (attempt === 'create') {
      alert('Account creation successful! You are now logged in.')
      this.setState({ isAuthenticated: true, user_name })
    } else {
      alert(attempt)
      this.setState({ isAuthenticated: false })
    }
  }



  setBGAName = BGAName => {
    this.setState({BGAName})
  }

  render() {
    const value = {
      games: this.state.games,
      isAuthenticated: this.state.isAuthenticated,
      navBarToggle: this.state.navBarToggle,
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword,
      userName: this.state.userName,
      lastDirection: this.state.lastDirection,
      BGAName: this.state.BGAName,
      user_name: this.state.user_name,
      createAccount: this.createAccount,
      setBGAName: this.setBGAName,
      setLastDirection: this.setLastDirection,
      logout: this.logout,
      setName: this.setName,
      setPassword: this.setPassword,
      setEmail: this.setEmail,
      onSubmitLogin: this.onSubmitLogin,
      swiped: this.swiped,
      setNavBarToggle: this.setNavBarToggle
    }

    return(
      <AppContext.Provider value={value}>
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
        {/* <Route
          exact path="/add-bga"
          component={AddBGA}
        />
        <Route
          path="/bga-auth"
          component={BGAAuth}
        /> */}
        <Route
          exact path="/swiper"
          component={SwipeStack}
        />
        <Route
          exact path="/chat/:name"
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