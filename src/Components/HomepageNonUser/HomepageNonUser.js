import React from 'react'
import AppContext from '../../Context/AppContext'
import gitttLogo from '../../img/gittt-logo.png'

export default class HomepageNonUser extends React.Component {
    static contextType = AppContext

    render() {
        return(
            <>
            <div className="info">
                <img src={gitttLogo} alt='Get it to the Table logo'/>
                <p>Do you have so many tabletop games in your collection that it's a hassle to choose a game? Or maybe you want your playgroup to come to a consensus on a new game to purchase? That's where Get it to the Table comes in. You and your playgroup can form a group and match on games! Once everyone swipes right on a game, the game will count as a match and everyone can see the list of matched games!</p>
    
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
            </>
        )
    }
}