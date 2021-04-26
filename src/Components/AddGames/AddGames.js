import React from "react";
import AppContext from "../../Context/AppContext";

export default class AddGames extends React.Component {
  static contextType = AppContext;

  async componentDidMount() {
    this.context.checkAuth();
  }

  addBGGNameForm = (
    <div className="info">
      <h3>Add BGG Collection to Your Account</h3>
      <p>You can add any BGG user collection to your account.</p>

      <form
        className="user-form"
        onSubmit={(e) => this.context.getBGGCollection(e)}
      >
        <label htmlFor="id">Board Game Geek Username:</label>
        <br />
        <input
          type="text"
          name="id"
          required
          onChange={(e) => this.context.setBGGUsername(e.target.value)}
        />
        <br />
        <label htmlFor="collection_name">Name your Collection:</label>
        <br />
        <input
          type="text"
          name="collection_name"
          required
          onChange={(e) => this.context.setCollectionName(e.target.value)}
        />
        <br />
        <button type="submit">Get BGG Collection</button>
      </form>
    </div>
  );

  render() {
    return <div className="user-dash">{this.addBGGNameForm}</div>;
  }
}
