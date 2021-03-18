import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import gitttLogo from "../../img/gittt-logo.png";

export default class HomepageNonUser extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        <div className="info">
          <img src={gitttLogo} alt="Get it to the Table logo" />
          <p>
            Do you have so many tabletop games in your collection that it's a
            hassle to choose a game? Or maybe you want your playgroup to come to
            a consensus on a new game to purchase? That's where Get it to the
            Table comes in. You and your playgroup can form a group and match on
            games! Once everyone swipes right on a game, the game will count as
            a match and everyone can see the list of matched games!
          </p>
          <p>
            Check out this <Link to="/how-to">how-to</Link> to learn how to use
            this app.
          </p>
        </div>
      </>
    );
  }
}
