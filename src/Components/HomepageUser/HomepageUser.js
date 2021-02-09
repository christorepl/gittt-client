import React from 'react'
import { Link } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import gitttLogo from '../../img/gittt-logo.png'
import GroupMenu from '../GroupMenu/GroupMenu'
import AppContext from '../../Context/AppContext'

export default class HomepageUser extends React.Component {
    static contextType = AppContext

    render() {

        const howToClass = this.context.howToToggle ? 'how-to-hidden' : 'how-to-displayed'
        console.log(howToClass)
        return(
            <div className="user-dash">
                <img src={gitttLogo} alt='Get it to the Table logo'/>
                <h3>Hello, {this.context.user_name}!</h3>
                <Link to='/delete-account'>
                    <AiIcons.AiOutlineUserDelete/>
                    <span className="nav-span">Delete Account Page</span>
                </Link>
                <Link to='/logout'>
                    <AiIcons.AiOutlineLogout/>
                    <span className="nav-span">Logout</span>
                </Link>
                <button onClick={() => this.context.toggleHowTo()}>Click here for the tutorial!</button>
                <div className={howToClass}>
                    <h4>Step 1:</h4>
                    <p>Add contacts to your account</p>
                    <h4>Step 2:</h4>
                    <p>Add a <a href="https://www.boardgameatlas.com/" target="_blank" rel="noopener noreferrer">BGA list</a> to your account</p>
                    <h4>Step 3:</h4>
                    <p>Create a group with your contacts</p>
                    <h4>Step 4:</h4>
                    <p>Add a BGA list to a group</p>
                    <h4>Step 5:</h4>
                    <p>Get to swiping and wait for matches! Matches are shown in a group's swiping page.</p>
                </div>


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