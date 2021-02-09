import React from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../Context/AppContext'

export default class HomepageNonUser extends React.Component {
    static contextType = AppContext

    render() {
        return(
            <>
            <div className="info">
    
                <p>Do you have so many tabletop games in your collection that it's a hassle to choose a game? Or maybe you want your playgroup to come to a consensus on a new game to purchase? That's where Get it to the Table comes in. You and your playgroup can form a group and match on games! Once everyone swipes right on a game, the game will count as a match and everyone can see the list of matched games!</p>
    
                <h3>Step 1:</h3>
                
                <a href="https://www.boardgameatlas.com/" target="_blank" rel="noopener noreferrer">BGA lists</a>
            <Link to='/create-account'>Create account</Link>
            <Link to='/login'>Login</Link>
            </div>
            </>
        )
    }
}