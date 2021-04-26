import React from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import gitttLogo from "../../img/gittt-logo.png";
import GroupMenu from "../GroupMenu/GroupMenu";
import AppContext from "../../Context/AppContext";

export default class HomepageUser extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="user-dash">
        <img src={gitttLogo} alt="Get it to the Table logo" />
        <h3>{this.context.user_name}'s Dashboard</h3>
        <Link to="/delete-account">
          <AiIcons.AiOutlineUserDelete />
          <span className="nav-span">Delete Account Page</span>
        </Link>
        <Link to="/logout">
          <AiIcons.AiOutlineLogout />
          <span className="nav-span">Logout</span>
        </Link>
        <Link to="/how-to">How To Page</Link>

        {this.context.groups ? (
          <>
            <h3>Get to swiping!</h3>
            <GroupMenu />
          </>
        ) : (
          <>
            <h3>Create a group and get to swiping!</h3>
            <Link to="/contacts">Contact page</Link>
          </>
        )}
      </div>
    );
  }
}
