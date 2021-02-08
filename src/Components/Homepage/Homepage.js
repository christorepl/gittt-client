import React from 'react'
import { Link } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import GroupMenu from '../GroupMenu/GroupMenu'
import AppContext from '../../Context/AppContext'

class Homepage extends React.Component {
    static contextType = AppContext

    render() {

        const homepage =
        <>
        <div className="info">
            <p>Do you have so many tabletop games in your collection that it's always a hassle to choose a game? Or maybe you want your playgroup to come to a consensus on a new game to purchase? That's where Get It To The Table comes in. You and your playgroup can form a chatgroup and match on games! Once everyone swipes right on a game, the game will count as a match and everyone can see the list of matched games! You can even do this in advance if you have a game night coming up and want people to decide before they arrive!</p>

            <p>Import <a href="https://www.boardgameatlas.com/" target="_blank" rel="noopener noreferrer">BGA lists</a>, add some contacts, make a group, add a list to a group, and get to swiping!</p>
        </div>
        <Link to='/create-account'>Create account</Link>
        <div className="user-forms">
                <h3>Login</h3>
                <form className="user-form" onSubmit={(e) => this.context.onSubmitLogin(e)}>
                <label htmlFor="email">E-mail Address:</label>
                <br/>
                <input type="email" name="email" required onChange={e => this.context.setEmail(e.target.value)}/>
                <br/>
                <label htmlFor="password">Password:</label>
                <br/>
                <input type="password" name="password" required onChange={e => this.context.setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Login</button>
                <p>For testing, try using the these credentials: E-mail: test@test.com - Password: test</p>
                </form>
            </div>
            </>


        const authenticatedUserHomepage = 
        <div className="user-dash">
        <h3>Hello, {this.context.user_name}!</h3>
        <Link to='/logout'>
            <AiIcons.AiOutlineLogout/>
            <span className="nav-span">Logout</span>
        </Link>
        <p>
        -delete account page link
        </p>
        <h3>Get to swiping!</h3>
        <GroupMenu/>
        </div>

        return(
            <>
            {this.context.isAuthenticated
            ?
            authenticatedUserHomepage
            :
            homepage
            }
            </>
        )
    }
}

export default Homepage