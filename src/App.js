import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import ee from "event-emitter";
import "./App.css";
import API_BASE_URL from "./config";
import AppContext from "./Context/AppContext";
import SwipeStack from "./Components/SwipeStack/SwipeStack";
import Homepage from "./Components/Homepage/Homepage";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import AddGames from "./Components/AddGames/AddGames";
import CreateAccount from "./Components/CreateAccount/CreateAccount";
import Groups from "./Components/Groups/Groups";
import Contacts from "./Components/Contacts/Contacts";
import DashMenu from "./Components/DashMenu/DashMenu";
import DeleteAccount from "./Components/DeleteAccount/DeleteAccount";
import Notification from "./Components/Notification/Notification";
import HowTo from "./Components/HowTo/HowTo";
import MatchedGames from "./Components/MatchedGames/MatchedGames";

const emitter = new ee();

class App extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      type: null,
      message: null,
      right: -40,
      currentGame: "",
      groups: [],
      isAuthenticated: false,
      groupMenuToggle: false,
      navBarToggle: false,
      lastDirection: "",
      newGroupName: "",
      BGGName: "",
      bgg_username: "",
      contactID: "",
      contactName: "",
      contacts: [],
      //user_name stores the logged in user's name, name stores the name entered into forms
      user_name: "",
      user_id: "",
      name: "",
      email: "",
      password: "",
      collections: [],
      games: [],
      matchedGames: [],
    };

    this.timeout = null;

    emitter.on("notification", (type, message) => {
      this.onRenderNotification(type, message);
    });
  }

  notify = (type, message) => {
    emitter.emit("notification", type, message);
  };

  onRenderNotification = (type, message) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.setState(
        {
          right: -40,
          type,
          message,
        },
        () => {
          this.timeout = setTimeout(() => {
            this.renderNotification(type, message);
          }, 500);
        }
      );
    } else {
      this.renderNotification(type, message);
    }
  };

  renderNotification = (type, message) => {
    this.setState(
      {
        right: 1,
        type,
        message,
      },
      () => {
        this.timeout = setTimeout(() => {
          this.setState({
            right: -40,
            type: null,
            message: null,
          });
        }, 2500);
      }
    );
  };

  async componentDidMount() {
    const {
      type,
      message,
      right,
      currentGame,
      matchedGames,
      groupMenuToggle,
      groups,
      newGroupName,
      selectedContacts,
      user_id,
      contacts,
      contactID,
      contactName,
      collections,
      bgg_username,
      BGGName,
      user_name,
      lastDirection,
      isAuthenticated,
      navBarToggle,
      games,
      userEmail,
      userPassword,
      userName,
    } = this.context;
    this.setState({
      type,
      message,
      right,
      currentGame,
      matchedGames,
      groupMenuToggle,
      groups,
      newGroupName,
      selectedContacts,
      user_id,
      contacts,
      contactID,
      contactName,
      collections,
      bgg_username,
      BGGName,
      user_name,
      lastDirection,
      isAuthenticated,
      navBarToggle,
      games,
      userEmail,
      userPassword,
      userName,
    });
    this.checkAuth();
  }

  checkAuth = async (login) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "GET",
        headers: { jwt_token: localStorage.jwt_token },
      });
      const parseRes = await response.json();
      const { user_name, user_id, groups, contacts, collections } = parseRes;

      if (login === "login") {
        return this.loginUser(
          "login",
          user_name,
          user_id,
          groups,
          contacts,
          collections
        );
      } else if (parseRes.status === true) {
        return this.loginUser(
          "checkAuth",
          user_name,
          user_id,
          groups,
          contacts,
          collections
        );
      } else {
        this.props.history.push("/");
        return this.setState({ isAuthenticated: false });
      }
    } catch (error) {
      console.error(error);
      this.notify("DANGER", error.message);
    }
  };

  setNavBarToggle = () => {
    this.setState({ navBarToggle: !this.state.navBarToggle });
  };

  onSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = this.state;
      const body = { email, password };
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      const { jwt_token, type, msg } = parseRes;
      if (parseRes.jwt_token) {
        localStorage.setItem("jwt_token", jwt_token);
        this.notify(type, msg);
        this.checkAuth("login");
      } else {
        this.notify(type, msg);
        this.loginUser(parseRes);
      }
    } catch (error) {
      console.error(error);
      this.notify("DANGER", error.message);
    }
  };

  loginUser = async (
    attempt,
    user_name,
    user_id,
    groups,
    contacts,
    collections
  ) => {
    if (attempt === "login") {
      this.setState({
        isAuthenticated: true,
        user_name,
        user_id,
        groups,
        contacts,
        collections,
      });
    } else if (attempt === "create") {
      this.setState({ isAuthenticated: true, user_name, user_id });
    } else if (attempt === "checkAuth") {
      this.setState({
        isAuthenticated: true,
        user_name,
        user_id,
        groups,
        contacts,
        collections,
      });
    } else {
      this.setState({ isAuthenticated: false });
    }
  };

  setEmail = (email) => {
    this.setState({ email });
  };

  setPassword = (password) => {
    this.setState({ password });
  };

  setName = (user_name) => {
    this.setState({ user_name });
  };

  setLastDirection = (lastDirection) => {
    this.setState({ lastDirection });
  };

  swiped = async (lastDirection, game_name, group_id) => {
    // don't do anything if a user swipes up or down
    if (lastDirection === "up" || lastDirection === "down") {
      return;
    }

    this.setState({ lastDirection });

    //swipe_direction will be r or l for shorthand
    let swipe_direction = lastDirection[0];

    try {
      const queryURL = `${API_BASE_URL}/swiper/${group_id}`;

      const response = await fetch(queryURL, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          jwt_token: localStorage.jwt_token,
          swipe_direction,
          game_name,
        },
      });

      const parseRes = await response.json();

      if (parseRes.msg) {
        this.notify(parseRes.type, parseRes.msg);
      }
    } catch (error) {
      this.notify("DANGER", error);
    }

    let filterGames = this.state.games;

    let games = filterGames.filter((game) => game.game_name !== game_name);
    let currentGame = this.state.games[0].game_name;
    this.setState({ games, currentGame });
  };

  logout = () => {
    localStorage.removeItem("jwt_token");
    this.setState({
      isAuthenticated: false,
      groups: [],
      games: [],
      newGroupName: "",
      selectedContacts: [],
      user_id: "",
      contacts: [],
      contactID: "",
      contactName: "",
      collections: [],
      bgg_username: "",
      BGGName: "",
      user_name: "",
      lastDirection: "",
      userEmail: "",
      userPassword: "",
      userName: "",
      selectedGroup: "",
      selectedCollection: "",
    });
    this.props.history.push("/home");
  };

  createAccount = async (e) => {
    e.preventDefault();

    try {
      const { email, user_name, password } = this.state;
      const body = { email, user_name, password };

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      const { new_user_name, user_id } = parseRes;

      if (parseRes.jwt_token) {
        localStorage.setItem("jwt_token", parseRes.jwt_token);
        this.notify(parseRes.type, parseRes.msg);
        this.loginUser("create", new_user_name, user_id);
      } else {
        this.loginUser(parseRes);
      }
    } catch (error) {
      console.error(error);
      this.notify("DANGER", error.message);
    }
  };

  setBGGName = (BGGName) => {
    this.setState({ BGGName });
  };

  setBGGUserCollections = (collections) => {
    this.setState({ collections });
  };

  setBGGUsername = (bgg_username) => {
    this.setState({ bgg_username });
  };

  setCollectionName = (collection_name) => {
    this.setState({ collection_name });
  };

  getBGGCollection = async (e) => {
    e.preventDefault();
    try {
      const { bgg_username, collection_name } = this.state;
      const queryURL = `${API_BASE_URL}/bgg/add-collection/`;

      const response = await fetch(queryURL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          jwt_token: localStorage.jwt_token,
          collection_name,
          bgg_username,
        },
      });

      const parseRes = await response.json();
      const { collections, type, msg } = parseRes;
      this.setBGGCollection(collections);
      this.notify(type, msg);
    } catch (error) {
      this.notify("DANGER", error);
    }
  };

  setBGGCollection = (collections) => {
    this.setState({ collections });
  };

  setContactID = (contactID) => {
    this.setState({ contactID });
  };

  setContactName = (contactName) => {
    this.setState({ contactName });
  };

  setNewGroupName = (newGroupName) => {
    this.setState({ newGroupName });
  };

  onSubmitNewContact = async (e) => {
    e.preventDefault();
    let contact_name = this.state.contactName;
    let contact_id = this.state.contactID;

    const newContactURL = `${API_BASE_URL}/contacts`;

    try {
      const body = { contact_name, contact_id };

      const response = await fetch(newContactURL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          jwt_token: localStorage.jwt_token,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      this.notify(parseRes.type, parseRes.msg);

      this.checkAuth();
    } catch (error) {
      console.error(error);
      this.notify("DANGER", error.message);
    }
  };

  handleContactSelection = (selectedContacts) => {
    this.setState({ selectedContacts });
  };

  createGroup = async (e) => {
    e.preventDefault();

    if (!this.state.selectedContacts.length) {
      this.notify(
        "WARNING",
        "You must select at least one contact to start a group."
      );
      return;
    } else {
      let newGroupData = { contact_ids: [], newGroupName: [] };
      for (const [key, val] of Object.entries(this.state.selectedContacts)) {
        if (key) {
          let contact_id = val.value;
          newGroupData["contact_ids"].push(contact_id);
        }
      }
      newGroupData["newGroupName"].push(this.state.newGroupName);
      const groupURL = `${API_BASE_URL}/group/create`;
      try {
        const response = await fetch(groupURL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            jwt_token: localStorage.jwt_token,
          },
          body: JSON.stringify(newGroupData),
        });

        const parseRes = await response.json();
        this.notify(parseRes.type, parseRes.msg);
      } catch (error) {
        console.error(error);
        this.notify("DANGER", error.message);
      }
    }
  };

  handleGroupSelection = (selectedGroup) => {
    this.setState({ selectedGroup });
  };

  addCollectionToGroup = async (e) => {
    e.preventDefault();
    if (!this.state.selectedGroup.value) {
      this.notify("WARNING", "You must select a group!");
      return;
    } else if (!this.state.selectedCollection.value) {
      this.notify("WARNING", "You must select a collection!");
    } else {
      let newGroupCollectionData = { group_id: [], bgg_username: [] };
      newGroupCollectionData["group_id"].push(this.state.selectedGroup.value);
      newGroupCollectionData["bgg_username"].push(
        this.state.selectedCollection.value
      );
      const groupURL = `${API_BASE_URL}/group/add_collection`;
      try {
        const response = await fetch(groupURL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            jwt_token: localStorage.jwt_token,
          },
          body: JSON.stringify(newGroupCollectionData),
        });

        const parseRes = await response.json();
        this.notify(parseRes.type, parseRes.msg);
      } catch (error) {
        console.error(error);
        this.notify("DANGER", error.message);
      }
    }
  };

  handleCollectionSelection = (selectedCollection) => {
    this.setState({ selectedCollection });
  };

  goToSwipeGroup = (group) => {
    this.props.history.push(`/swiper/${group}`);
  };

  getGamesForSwiper = async (group) => {
    const groupURL = `${API_BASE_URL}/swiper/${group}`;

    try {
      const response = await fetch(groupURL, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          jwt_token: localStorage.jwt_token,
        },
      });

      const parseRes = await response.json();

      if (parseRes.msg) {
        this.notify(parseRes.type, parseRes.msg);
      } else if (parseRes.data) {
        const { games, matchedGames } = parseRes.data;
        this.setState({ games, matchedGames });
      }
    } catch (error) {
      console.error(error);
      this.notify("DANGER", error.message);
    }
  };

  onSubmitDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const email = this.state.email;
      const body = { email };

      const response = await fetch(`${API_BASE_URL}/auth/delete-account`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          jwt_token: localStorage.jwt_token,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      this.notify(parseRes.type, parseRes.msg);

      this.logout();
    } catch (error) {
      console.error(error);
      this.notify("DANGER", error.message);
    }
  };

  render() {
    const value = {
      type: this.state.type,
      message: this.state.message,
      right: this.state.right,
      currentGame: this.state.currentGame,
      selectedContacts: this.state.selectedContacts,
      matchedGames: this.state.matchedGames,
      games: this.state.games,
      isAuthenticated: this.state.isAuthenticated,
      navBarToggle: this.state.navBarToggle,
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword,
      userName: this.state.userName,
      lastDirection: this.state.lastDirection,
      BGGName: this.state.BGGName,
      user_name: this.state.user_name,
      collections: this.state.collections,
      bgg_username: this.state.bgg_username,
      contacts: this.state.contacts,
      user_id: this.state.user_id,
      newGroupName: this.state.newGroupName,
      groups: this.state.groups,
      selectedGroup: this.state.selectedGroup,
      selectedCollections: this.state.selectedCollections,
      onSubmitDeleteAccount: this.onSubmitDeleteAccount,
      getGamesForSwiper: this.getGamesForSwiper,
      goToSwipeGroup: this.goToSwipeGroup,
      checkAuth: this.checkAuth,
      handleCollectionSelection: this.handleCollectionSelection,
      addCollectionToGroup: this.addCollectionToGroup,
      handleGroupSelection: this.handleGroupSelection,
      setNewGroupName: this.setNewGroupName,
      createGroup: this.createGroup,
      handleContactSelection: this.handleContactSelection,
      onSubmitNewContact: this.onSubmitNewContact,
      setContactName: this.setContactName,
      setContactID: this.setContactID,
      setCollectionName: this.setCollectionName,
      setBGGUsername: this.setBGGUsername,
      getBGGCollection: this.getBGGCollection,
      createAccount: this.createAccount,
      setBGGName: this.setBGGName,
      setLastDirection: this.setLastDirection,
      logout: this.logout,
      setName: this.setName,
      setPassword: this.setPassword,
      setEmail: this.setEmail,
      onSubmitLogin: this.onSubmitLogin,
      swiped: this.swiped,
      setNavBarToggle: this.setNavBarToggle,
    };

    return (
      <AppContext.Provider value={value}>
        <div className="app">
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/create-account" component={CreateAccount} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/groups" component={Groups} />
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/delete-account" component={DeleteAccount} />
          <Route exact path="/swiper/:groupID" component={SwipeStack} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/add-games" component={AddGames} />
          <DashMenu />
        </div>
        <Route exact path="/how-to" component={HowTo} />
        <Route exact path="/:groupID/matched-games" component={MatchedGames} />
        <Notification />
      </AppContext.Provider>
    );
  }
}

export default withRouter(App);
