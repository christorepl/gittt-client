import React from "react";
import AppContext from "../../Context/AppContext";

export default class DeleteAccount extends React.Component {
  static contextType = AppContext;
  render() {
    return (
      <>
        {this.context.isAuthenticated ? (
          <div className="user-forms">
            <form
              className="user-form"
              onSubmit={(e) => this.context.onSubmitDeleteAccount(e)}
            >
              <label htmlFor="email">E-mail Address:</label>
              <br />
              <input
                type="email"
                name="email"
                required
                onChange={(e) => this.context.setEmail(e.target.value)}
              />
              <br />
              <button type="submit">Delete Account</button>
              <p>
                This action cannot be reversed! All groups you created and
                collections you've imported will be deleted!
              </p>
            </form>
          </div>
        ) : null}
      </>
    );
  }
}
