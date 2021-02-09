import React from 'react'
// import { Route } from 'react-router-dom'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css';
import AppContext from '../../Context/AppContext'

export default class GroupMenu extends React.Component {
    static contextType = AppContext

    render() {

        return(
            <div className="groupMenu">
                <Menu menuButton={
                    ({ open }) =>
                        <MenuButton>{open ? 'Close Menu' : 'Select a Group'}</MenuButton>}
                        overflow={'auto'}
                        position={'anchor'}
                        >
                {this.context.groups.map((group, index) => {
                        return (
                        <MenuItem key={index} value={group.value} onClick={() => this.context.goToSwipeGroup(group.value)}>{group.label}</MenuItem>
                        )
                    })}
                </Menu>
                
            </div>
        )
    }
}