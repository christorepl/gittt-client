import React from "react";
import Select from "react-select";
import AppContext from "../../Context/AppContext";
import GroupMenu from "../GroupMenu/GroupMenu";

export default class Groups extends React.Component {
  static contextType = AppContext;

  async componentDidMount() {
    this.context.checkAuth();
  }

  render() {
    return (
      <div className="groups">
        <form
          className="contact-list"
          onSubmit={(e) => this.context.addCollectionToGroup(e)}
        >
          <h3>Select a Group</h3>
          <div className="select-box">
            <Select
              required
              isMulti={false}
              closeMenuOnSelect={true}
              isSearchable={true}
              options={this.context.groups}
              value={this.context.selectedGroup}
              onChange={this.context.handleGroupSelection}
            />
          </div>
          <br />
          <h3>Select a Collection</h3>
          <div className="select-box">
            <Select
              required
              isMulti={false}
              closeMenuOnSelect={true}
              isSearchable={true}
              options={this.context.collections}
              value={this.context.selectedCollection}
              onChange={this.context.handleCollectionSelection}
            />
          </div>
          <br />
          <button type="submit">Add Collection To Group</button>
        </form>

        {this.context.groups.length ? (
          <>
            <h3>Start swiping!</h3>
            <GroupMenu />
          </>
        ) : null}
      </div>
    );
  }
}
