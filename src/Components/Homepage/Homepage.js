import React from 'react'
import { Redirect } from 'react-router-dom'
import API_BASE_URL from '../../config'

class Homepage extends React.Component {
    async componentDidMount() {
        try {
            const response = await fetch(API_BASE_URL + '/bga-auth')
            const allRes = await response.json()
            alert(allRes)
        } catch (error) {
            console.error(error.message)
        } 
    }
    render() {

        const homepage =
        this.context.isAuthenticated
        ?
        <Redirect to="/user-dash"/>
        :
        <div className="info">
            <p>Do you have so many tabletop games in your collection that it's always a hassle to choose a game? Or maybe you want your playgroup to come to a consensus on a new game to purchase? That's where Get It To The Table comes in. You and your playgroup can form a chatgroup and match on games! Once everyone swipes right on a game, the game will count as a match and everyone can see the list of matched games! You can even do this in advance if you have a game night coming up and want people to decide before they arrive!</p>

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