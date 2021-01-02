import React from 'react'
import { Link } from 'react-router-dom'

function Homepage () {
    return (
        <div>
            homepage placeholder. for logged in users, this will redirect them to their chats dash. for users not logged in, this will have some info on the purpose of the app and link to the create account page.
            <br/>
            What is the purpose of this app?
            <br/>
            Do you have so many tabletop games in your collection that it's always a hassle to choose a game? Or maybe you want your playgroup to come to a consensus on a new game to purchase? That's where Get It To The Table comes in! You and your playgroup can form a chatgroup and swipe on games! You can manually add games, import games from your BGA or BGG accounts, or see randomly selected games! Once everyone swipes right on a game, the game will count as a match and everyone can see the list of matched games! You can even do this in advance if you have a game night coming up and want people to decide before they arrive!
        </div>
    )
}

export default Homepage