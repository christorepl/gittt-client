import React from "react";

const AppContext = React.createContext({
  addListToGroup: () => {},
  handleGroupSelection: () => {},
  setNewGroupName: () => {},
  createGroup: () => {},
  handleContactSelection: () => {},
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
  setBGAListName: () => {},
  setBGAListID: () => {},
  getBGAUserLists: () => {},
  getBGAList: () => {},
  createAccount: () => {},
  onSubmitNewContact: () => {},
  setContactID: () => {},
  setContactName: () => {},
  getContacts: () => {},
  checkAuth: () => {},
  goToSwipeGroup: () => {},
  getGamesForSwiper: () => {},
  onSubmitDeleteAccount: () => {},
  toggleHowTo: () => {},
  currentGame: "",
  howToToggle: false,
  matchedGames: [],
  games: [],
  selectedContacts: [],
  userGroupData: [],
  lists: [],
  selectedList: "",
  groups: [],
  selectedGroup: "",
  user_id: "",
  contacts: [],
  user_name: "",
  BGAName: "",
  lastDirection: "",
  userName: "",
  userEmail: "",
  userPassword: "",
  isAuthenticated: false,
  type: null,
  message: null,
  right: -40,
  navBarToggle: false,
});

export default AppContext;
