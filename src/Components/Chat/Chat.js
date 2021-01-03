import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Chat.css'
import AppContext from '../../Context/AppContext'



export default class Chat extends React.Component {
    static contextType = AppContext


    render() {
        const chat =
        this.context.isAuthenticated
        ?
        <div className="chat">
        {this.props.match.params.name}
        <div class="bubbleWrapper">
		<div class="inlineContainer">
			<img class="inlineIcon" src="https://image.freepik.com/free-icon/cat-black-face_318-72914.jpg"/>
			<div class="otherBubble other">
				I wanna play CATAN!
			</div>
		</div><span class="other">08:41</span>
	</div>
	<div class="bubbleWrapper">
		<div class="inlineContainer own">
			<img class="inlineIcon" src="http://encoreyouthmusic.com/wp-content/uploads/2014/12/b-cat-icon.png"/>
			<div class="ownBubble own">
			 I'm over CATAN. Can we pick a new game to play?
			</div>
		</div><span class="own">08:55</span>
	</div>
	<div class="bubbleWrapper">
		<div class="inlineContainer">
			<img class="inlineIcon" src="https://image.freepik.com/free-icon/cat-black-face_318-72914.jpg"/>
			<div class="otherBubble other">
				Finnnnne, we can swipe on more games.
			</div>
		</div>
	</div><span class="other">10:13</span>
	<div class="bubbleWrapper">
		<div class="inlineContainer own">
			<img class="inlineIcon" src="http://encoreyouthmusic.com/wp-content/uploads/2014/12/b-cat-icon.png"/>
			<div class="ownBubble own">
			Ok cool, I already have swiped a lot more than you have. 
			</div>
		</div><span class="own">11:07</span>
	</div>
	<div class="bubbleWrapper">
		<div class="inlineContainer">
			<img class="inlineIcon" src="https://image.freepik.com/free-icon/cat-black-face_318-72914.jpg"/>
			<div class="otherBubble other">
				I just bought a couple new games the other day, I'll add them to the list.
			</div>
		</div><span class="other">11:11</span>
	</div>
    <input type="text" value="Type a message to send"/> <button>Send</button>
    <Link to="/swiper">Swipe on games for this group</Link>
    </div>
        :
        <Redirect to="login"/>

        return(
            <>
            {chat}
            </>
        )
    }
}