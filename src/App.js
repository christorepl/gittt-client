import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import './App.css'
import API_BASE_URL from './config'
import AppContext from './Context/AppContext'
import SwipeStack from './Components/SwipeStack/SwipeStack'
import Homepage from './Components/Homepage/Homepage'
import HowToUse from './Components/HowToUse/HowToUse'
import Login from './Components/Login/Login'
import Logout from './Components/Logout/Logout'
import AddGames from './Components/AddGames/AddGames'
import CreateAccount from './Components/CreateAccount/CreateAccount'
import Groups from './Components/Groups/Groups'
import Contacts from './Components/Contacts/Contacts'
import DashMenu from './Components/DashMenu/DashMenu'

class App extends React.Component {
  static contextType = AppContext

  state = {
    groups: [],
    isAuthenticated: false,
    groupMenuToggle: false,
    navBarToggle: false,
    lastDirection: '',
    newGroupName: '',
    BGAName: '',
    BGAListID: '',
    contactID: '',
    contactName: '',
    contacts: [],
    //user_name stores the logged in user's name, name stores the name entered into forms
    user_name: '',
    user_id: '',
    name: '',
    email: '',
    password: '',
    lists: [],
    games: [],
    matchedGames: []
  }
  
  async componentDidMount () {
    const { matchedGames, groupMenuToggle, groups, newGroupName, selectedContacts, user_id, contacts, contactID, contactName, lists, BGAListID, BGAName, user_name, lastDirection, isAuthenticated, navBarToggle, games, userEmail, userPassword, userName } = this.context
    this.setState({ matchedGames, groupMenuToggle, groups, newGroupName, selectedContacts, user_id, contacts, contactID, contactName, lists, BGAListID, BGAName, user_name, lastDirection, isAuthenticated, navBarToggle, games, userEmail, userPassword, userName })
    this.checkAuth()
  }

  checkAuth = async (login) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "GET",
        headers: {jwt_token: localStorage.jwt_token}
      })
      const parseRes = await response.json()
      const { user_name, user_id, groups, contacts, lists } = parseRes

      if(login === 'login') {
        return this.loginUser('login', user_name, user_id, groups, contacts, lists)
      } else if (parseRes.status === true){
        return this.loginUser('checkAuth', user_name, user_id, groups, contacts, lists)
      } else {
        this.props.history.push('/')
        return this.setState({isAuthenticated: false})
      }



      // if(parseRes.status === true) {
      //   this.loginUser('checkAuth', user_name, user_id, groups, contacts, lists)
      // } else if (login === 'login') {
      //   this.loginUser
      // }
      // } else {
      //   this.props.history.push('/')
      //   this.setState({isAuthenticated: false})
      // }
    } catch (error) {
      console.error(error.message)
    }
  }

  setNavBarToggle = () => {
    this.setState({navBarToggle: !this.state.navBarToggle})
  }

  onSubmitLogin = async(e) => {
    e.preventDefault()
    try {

        const { email, password } = this.state
        const body = { email, password }
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })

        const parseRes = await response.json()
        const { jwt_token } = parseRes
        
        if(parseRes.jwt_token) {
          localStorage.setItem("jwt_token", jwt_token)
          this.checkAuth('login')
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

  swiped = async (direction, game_name, group_id) => {
    // console.log(direction, 'removing: ' + nameToDelete)
    // console.log(this.state.lastDirection)
    // we don't do anything on up or down swipes so we just return
    if(direction === 'up' || direction === 'down') {
      return
    }
    let swipe_direction = direction[0]
    // console.log(swipeDirection, group_id, nameToDelete)
    // this.setLastDirection(direction)
    // let games = this.state.games
    // games.filter(game => {return (game.game_name !== nameToDelete)})

    // this.setState({games})

    try {

      const queryURL = `${API_BASE_URL}/swiper/${group_id}` 

      const response = await fetch(queryURL, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'jwt_token' : localStorage.jwt_token,
          swipe_direction,
          game_name
        }
      })

      const parseRes = await response.json()

      if(parseRes.msg) {
        alert(parseRes.msg)
      }


    } catch (error) {
      alert(error)
    }
  }

  logout = () => {
    localStorage.removeItem('jwt_token')
    this.setState({isAuthenticated: false, groups: [], games: [], newGroupName: '', selectedContacts: [], user_id: '', contacts: [], contactID: '', contactName: '', lists: [], BGAListID: '', BGAName: '', user_name: '', lastDirection: '', userEmail: '', userPassword: '', userName: ''})
    this.props.history.push('/home')
  }

  createAccount = async (e) => {
    e.preventDefault()

    try {
      const { email, user_name, password } = this.state
      const body = { email, user_name, password }
    
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()
      const { new_user_name, user_id } = parseRes
      
      // localStorage.setItem("jwt_token", parseRes.jwt_token)
      
      if(parseRes.jwt_token) {
        localStorage.setItem("jwt_token", parseRes.jwt_token)
        this.loginUser('create', new_user_name, user_id)
    }  else {
        this.loginUser(parseRes)
    }


    } catch(err) {
      console.error(err.message)
    }
  }

  loginUser = async(attempt, user_name, user_id, groups, contacts, lists) => {
    if (attempt === 'login'){
      alert('Login successful')
      this.setState({ isAuthenticated: true, user_name, user_id, groups, contacts, lists })
    } else if (attempt === 'create') {
      alert('Account creation successful! You are now logged in.')
      this.setState({ isAuthenticated: true, user_name, user_id })
    } else if (attempt === 'checkAuth') {
      this.setState({isAuthenticated: true, user_name, user_id, groups, contacts, lists})
    } else {
      alert(attempt)
      this.setState({ isAuthenticated: false })
    }
  }

  setBGAName = BGAName => {
    this.setState({BGAName})
  }

  getBGAUserLists = async (e) => {
    e.preventDefault()
    try {
      const username = this.state.BGAName
      const queryURL = `${API_BASE_URL}/bga/user-lists/search?username=${username}`

      const response = await fetch(queryURL, {
        method: "GET",
        headers: {
          'content-type': 'application/json'
        },
        params: {
          username
        }
      })

      const parseRes = await response.json()
      this.setBGAUserLists(parseRes.lists)

    } catch (error) {
      alert(error)
    }
  }

  setBGAUserLists = lists => {
    // const listNames = lists.lists.map(list => list.name)
    this.setState({lists})
  }

  setBGAListID = BGAListID => {
    this.setState({BGAListID})
  }

  setBGAListName = BGAListName => {
    this.setState({BGAListName})
  }

  getBGAList = async (e) => {
    e.preventDefault()
    try {
      const list_id = this.state.BGAListID
      const list_name = this.state.BGAListName
      const queryURL = `${API_BASE_URL}/bga/user-lists/search?list_id=${list_id}` 

      const response = await fetch(queryURL, {
        method: "GET",
        headers: {
          'content-type': 'application/json',
          'jwt_token' : localStorage.jwt_token,
          list_name
        }
      })

      const parseRes = await response.json()
      const { lists, msg } = parseRes
      this.setBGAGameList(lists)
      alert(msg)
    } catch (error) {
      alert(error)
    }
    
  }

  setBGAGameList = BGAGameList => {
    this.setState({})
  }

  setContactID = contactID => {
    this.setState({contactID})
  }

  setContactName = contactName => {
    this.setState({contactName})
  }

  setNewGroupName = newGroupName => {
    this.setState({newGroupName})
  }

  onSubmitNewContact = async (e) => {
    e.preventDefault()
    let contact_name = this.state.contactName
    let contact_id = this.state.contactID
    
    const newContactURL = `${API_BASE_URL}/contacts`

    try {
      
      const body = { contact_name, contact_id }

      const response = await fetch(newContactURL, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'jwt_token' : localStorage.jwt_token
        },
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()
      alert(parseRes.msg)
      this.checkAuth()

    } catch(error) {
      console.error(error.message)
    }
  }

  handleContactSelection = selectedContacts => {
    this.setState({selectedContacts})
  }

  createGroup = async (e) => {
    e.preventDefault()
    
    
    if(!this.state.selectedContacts.length) {
      alert('You must select at least one contact to start a group.')
      return
    } else {

      let newGroupData = {'contact_ids' : [], 'newGroupName' : []}
      for (const [key, val] of Object.entries(this.state.selectedContacts)) {
        if (key) {
        let contact_id = val.value
        newGroupData['contact_ids'].push(contact_id)
        }
      }
      newGroupData['newGroupName'].push(this.state.newGroupName)
      const groupURL = `${API_BASE_URL}/group/create`
        try {
          const response = await fetch(groupURL, {
            method: 'POST',
            headers: {
              'content-type' : 'application/json',
              'jwt_token' : localStorage.jwt_token
            },
            body: JSON.stringify(newGroupData)
          })

      const res = await response.json()
      alert(res.msg)

      // CURRENT USER GROUP -  USE THIS FILTER TO SEE MEMBERS OF A NAMED GROUP
      // const userGroups = parseRes.filter(group => group.group_name === this.state.newGroupName)
      // console.log(userGroups)
    } catch (error) {
      console.error(error.message)
    }
  }
  }

  handleGroupSelection = selectedGroup => {
    this.setState({selectedGroup})
  }

  addListToGroup = async (e) => {
    e.preventDefault()
    if(!this.state.selectedGroup.value) {
      alert('You must select a group!')
      return
    } else if (!this.state.selectedList.value) {
      alert('You must select a list!')
    } else {
      let newGroupListData = {'group_id' : [], 'list_id' : []}
      newGroupListData['group_id'].push(this.state.selectedGroup.value)
      newGroupListData['list_id'].push(this.state.selectedList.value)
      const groupURL = `${API_BASE_URL}/group/add_list`
        try {
          const response = await fetch(groupURL, {
            method: 'POST',
            headers: {
              'content-type' : 'application/json',
              'jwt_token' : localStorage.jwt_token
            },
            body: JSON.stringify(newGroupListData)
          })

      const res = await response.json()
      // console.log(res)
      alert(res.msg)

    } catch (error) {
      console.error(error.message)
    }
    }
  }

  handleListSelection = selectedList => {
    this.setState({selectedList})
  }

  goToSwipeGroup = group => {
    this.props.history.push(`/swiper/${group}`)
  }

  getGamesForSwiper = async (group) => {

    const groupURL = `${API_BASE_URL}/swiper/${group}`

    try {
      const response = await fetch(groupURL, {
        method: 'GET',
        headers: {
          'content-type' : 'application/json',
          'jwt_token' : localStorage.jwt_token
        }
      })

    const res = await response.json()
    
    if (res.msg) {
      alert(res.msg)
    } else if (res.data) {
      const { games, matchedGames } = res.data
      this.setState({games, matchedGames})
    }

    } catch (error) {
      console.error(error.message)
    }
  }

  render() {
    const value = {
      selectedContacts: this.state.selectedContacts,
      matchedGames: this.state.matchedGames,
      games: this.state.games,
      isAuthenticated: this.state.isAuthenticated,
      navBarToggle: this.state.navBarToggle,
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword,
      userName: this.state.userName,
      lastDirection: this.state.lastDirection,
      BGAName: this.state.BGAName,
      user_name: this.state.user_name,
      lists: this.state.lists,
      BGAListID: this.state.BGAListID,
      contacts: this.state.contacts,
      user_id: this.state.user_id,
      newGroupName: this.state.newGroupName,
      groups: this.state.groups,
      selectedGroup: this.state.selectedGroup,
      selectedLists: this.state.selectedLists,
      getGamesForSwiper: this.getGamesForSwiper,
      goToSwipeGroup: this.goToSwipeGroup,
      checkAuth: this.checkAuth,
      handleListSelection: this.handleListSelection,
      addListToGroup: this.addListToGroup,
      handleGroupSelection: this.handleGroupSelection,
      setNewGroupName: this.setNewGroupName,
      createGroup: this.createGroup,
      handleContactSelection: this.handleContactSelection,
      onSubmitNewContact: this.onSubmitNewContact,
      setContactName: this.setContactName,
      setContactID: this.setContactID,
      setBGAListName: this.setBGAListName,
      setBGAListID: this.setBGAListID,
      getBGAList: this.getBGAList,
      getBGAUserLists: this.getBGAUserLists,
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
        {/* <NavBar/> */}
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
          exact path="/groups"
          component={Groups}
        />
        <Route
          exact path="/contacts"
          component={Contacts}
        />
        <Route
          exact path="/swiper/:groupID"
          component={SwipeStack} 
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
        {/* {this.state.isAuthenticated
        ?
        <Route
          path="/"
          component={DashMenu}
        />
        :
        null
        } */}
        {this.state.isAuthenticated
        ?
        <div>
        <DashMenu/>
        </div>
        :
        null
        }
      </div>
      </AppContext.Provider>
    )
  }
}

export default withRouter(App)