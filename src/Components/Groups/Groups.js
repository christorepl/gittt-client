import React from 'react'
import Select from 'react-select'
import AppContext from '../../Context/AppContext'
import GroupMenu from '../GroupMenu/GroupMenu'

export default class Groups extends React.Component {
    static contextType = AppContext
    
    async componentDidMount() {
        this.context.checkAuth()
    }

    render() {
        return(
            <div className="groups">
                <form className="contact-list" onSubmit={e => this.context.addListToGroup(e)}>
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
                    <br/>
                    <h3>Select a List</h3>
                    <div className="select-box">
                        <Select
                            required
                            isMulti={false}
                            closeMenuOnSelect={true}
                            isSearchable={true}
                            options={this.context.lists}
                            value={this.context.selectedList}
                            onChange={this.context.handleListSelection}
                            onClick={() => alert('poops')}
                        />
                    </div>
                    <br/>
                    <button type="submit">Add List To Group</button>
                    <footer>Please wait a few moments to get a response from the server! The BGA API is a bit slow!</footer>
                </form>
                
                {this.context.groups.length
                ?
                <>
                <h3>Start swiping!</h3>
                <GroupMenu/>
                </>
                :
                null
                }

                
            </div>
         )
    }
}