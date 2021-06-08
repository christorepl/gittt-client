import React from "react";
import Select from "react-select";
import AppContext from "../../Context/AppContext";

export default class Contacts extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    this.context.checkAuth();
  }

  render() {
    return (
      <div className="user-dash">
        <h3>Your GittT Contact ID:</h3>
        <p>{this.context.user_id}</p>
        <p>
          Send this to another GittT user so they can add you to their contact
          list!
        </p>
        <div className="groups">
          <div className="user-forms">
            <form
              className="user-form"
              onSubmit={(e) => this.context.onSubmitNewContact(e)}
            >
              <h3>Add a Contact</h3>
              <label htmlFor="contact-id">Contact ID:</label>
              <br />
              <input
                type="text"
                name="contact-id"
                required
                onChange={(e) => this.context.setContactID(e.target.value)}
              />
              <br />
              <label htmlFor="contact-name">Contact Name:</label>
              <br />
              <input
                type="text"
                name="contact-name"
                required
                onChange={(e) => this.context.setContactName(e.target.value)}
              />
              <br />
              <button type="submit">Add Contact</button>
            </form>
          </div>
          {this.context.contacts.length > 0 ? (
            <form
              className="contact-list"
              onSubmit={(e) => this.context.createGroup(e)}
            >
              <h3>Select one or more contacts to create a group</h3>
              <div className="select-box">
                <Select
                  required
                  isMulti={true}
                  closeMenuOnSelect={false}
                  isSearchable={true}
                  options={this.context.contacts}
                  value={this.context.selectedContacts}
                  onChange={this.context.handleContactSelection}
                />
              </div>
              <br />
              <label htmlFor="group-name">Group Name:</label>
              <input
                type="text"
                name="group-name"
                required
                onChange={(e) => this.context.setNewGroupName(e.target.value)}
              />
              <button type="submit">Create Group</button>
            </form>
          ) : null}
        </div>
      </div>
    );
  }
}
