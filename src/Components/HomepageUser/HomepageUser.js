import React from 'react'
import { Link } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import GroupMenu from '../GroupMenu/GroupMenu'
import AppContext from '../../Context/AppContext'

export default class HomepageUser extends React.Component {
    static contextType = AppContext

    render() {
        return(
            <div className="user-dash">
            <h3>Hello, {this.context.user_name}!</h3>
            <Link to='/delete-account'>
                <AiIcons.AiOutlineUserDelete/>
                <span className="nav-span">Delete Account Page</span>
            </Link>
            <Link to='/logout'>
                <AiIcons.AiOutlineLogout/>
                <span className="nav-span">Logout</span>
            </Link>

            {this.context.groups.length > 0 
            ?
            <>
            <h3>Get to swiping!</h3>
            <GroupMenu/>
            </>
            :
            null
            }
            </div>
        )
    }
}