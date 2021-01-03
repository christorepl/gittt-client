import React from 'react'
import { Redirect } from 'react-router-dom'


class Homepage extends React.Component {
    render() {

        const homepage =
        this.context.isAuthenticated
        ?
        <Redirect to="/user-dash"/>
        :
        <div className="homepage">
            <h3>Do you have so many tabletop games in your collection that it's always a hassle to choose a game? Or maybe you want your playgroup to come to a consensus on a new game to purchase? That's where Get It To The Table comes in. You and your playgroup can form a chatgroup and match on games! Once everyone swipes right on a game, the game will count as a match and everyone can see the list of matched games! You can even do this in advance if you have a game night coming up and want people to decide before they arrive!</h3>

            <p>You can manually add games, one day import games from your <a href="https://www.boardgameatlas.com/" target="_blank" rel="noopener noreferrer">BGA account</a>, or see randomly selected games!</p>
        </div>

        return(
            <>
            {homepage}
            </>
        )
    }
}

export default Homepage