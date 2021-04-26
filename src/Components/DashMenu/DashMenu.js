import React from "react";
import AppContext from "../../Context/AppContext";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as GrIcons from "react-icons/gr";
import * as RiIcons from "react-icons/ri";

export default class DashMenu extends React.Component {
  static contextType = AppContext;

  render() {
    let dashMenu = [];

    this.context.isAuthenticated
      ? (dashMenu = [
          {
            title: "Dashboard",
            path: "/home",
            icon: <RiIcons.RiDashboardLine />,
          },
          {
            title: "Collections",
            path: "/add-games",
            icon: <GrIcons.GrAdd />,
            className: "nav-text",
          },
          {
            title: "Contacts",
            path: "/contacts",
            icon: <RiIcons.RiContactsLine />,
          },
          {
            title: "Groups",
            path: "/groups",
            icon: <GrIcons.GrGroup />,
          },
        ])
      : (dashMenu = [
          {
            title: "Login",
            path: "/login",
            icon: <AiIcons.AiOutlineLogin />,
          },
          {
            title: "Create Account",
            path: "/create-account",
            icon: <AiIcons.AiOutlineUserAdd />,
          },
        ]);

    return (
      <div>
        <IconContext.Provider value={{ color: "black" }}>
          <div className="dash-menu">
            {dashMenu.map((item, i) => {
              return (
                <li key={i} className="dash-text">
                  <Link to={item.path}>
                    <span className="dash-icon">{item.icon}</span>
                    <span className="dash-title">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </div>
        </IconContext.Provider>
      </div>
    );
  }
}
