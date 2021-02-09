import React from 'react'
import AppContext from '../../Context/AppContext'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'

export default class SwipeStack extends React.Component {
  static contextType = AppContext

  componentDidMount () {
    this.context.checkAuth()
    this.context.setLastDirection(null)
    this.context.getGamesForSwiper(this.props.match.params.groupID)
  }

  componentWillUnmount () {
    //then when you exit the page, drop the classname that hides the scrollbars
    document.querySelector('body').className = ''
  }

  render() {
  // console.log(this.context.lastDirection)
  //assign a css class to the body to prevent scrollbars from appearing when you swipe
  document.querySelector('body').className = 'no-scroll'

  const games = this.context.games
  const group_id = this.props.match.params.groupID
  console.log(games)

  return (
    <>
    <div className="swiper">
      <div className="cardContainer">
        {games.length > 0
        ?
          games.map((game, index) =>
          <TinderCard className='swipe' key={index+game.game_name} preventSwipe={['up', 'down']} onSwipe={(dir) => this.context.swiped(dir, game.game_name, group_id)} >
            <div style={{ backgroundImage: 'url(' + game.game_img_url + ')' }} className="card">
              <h3><a href={game.game_bga_url} target="_blank" rel="noopener noreferrer">{game.game_name}</a></h3>
            </div>
          </TinderCard>
        )
        :
          <h3>You have no more games to swipe for this group! Any group member can add lists to the group.</h3>
        }
      </div>
      {/* placeholder for thumbs up/ thumbs down buttons
      <div className='buttons'>
        <div onClick={() => this.context.swiped('left')}><FaIcons.FaThumbsDown size={50} color={'red'}/></div>
        <div onClick={() => this.context.swiped('right')}><FaIcons.FaThumbsUp size={50} color={'green'}/></div>
      </div> */}
      

      {(this.context.lastDirection === 'right' && this.context.games.length) || (this.context.lastDirection === 'left' && this.context.games.length) ? <h2 className='infoText'>You swiped {this.context.lastDirection}</h2> : null }
      
    </div>
    {this.context.matchedGames.length
    ?
    <>
    <div className="groupSidebarHeader">
      <h3 className="mobile-header">Matched Games in this Group:</h3>
    </div>
      <div className="groupSidebar">
      <h3 className="desktop-header">Matched Games in this Group:</h3>
        <ul>
          {this.context.matchedGames.map((game, index) =>  {
            return (
              <li key={index}><a href={game.game_bga_url} target="_blank" rel="noopener noreferrer">{game.game_name}</a></li>
            )
          })}
        </ul>
    </div>
    </>
    :
    null
    }
    </>
  )
  }
}













// import React, { useState, useMemo } from 'react'
// import { useHistory } from 'react-router-dom'
// import TinderCard from 'react-tinder-card'
// import * as FaIcons from 'react-icons/fa'
// import AppContext from '../../Context/AppContext'
// // import catan from '../../img/catan.jpg'
// // import bsg from '../../img/bsg.jpg'
// // import jenga from '../../img/jenga.jpg'
// // import morels from '../../img/morels.jpg'

// // const db = [
// //   {
// //     name: 'Catan',
// //     url: catan,
// //   },
// //   {
// //     name: 'Battlestar Galactica',
// //     url: bsg
// //   },
// //   {
// //     name: 'Jenga',
// //     url: jenga
// //   },
// //   {
// //     name: 'Morels',
// //     url: morels
// //   }
// // ]

// function SwipeStack () {
//   const context = React.useContext(AppContext)
//   const db = context.games.map(game => ({
//     name: game.name,
//     url: game.url  
//   }))
//   const alreadyRemoved = []
//   let gamesState = db // This fixes issues with updating games state forcing it to use the current state and not the state that was active when the card was created.
//   console.log(db)
//   const history = useHistory()
//   const [games, setgames] = useState(db)
//   const [lastDirection, setLastDirection] = useState()

//   const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

//   const swiped = (direction, nameToDelete) => {
//     console.log('removing: ' + nameToDelete)
//     setLastDirection(direction)
//     alreadyRemoved.push(nameToDelete)
//   } 

//   const outOfFrame = (name) => {
//     console.log(name + ' left the screen!')
//     gamesState = gamesState.filter(game => game.name !== name)
//     setgames(gamesState)
//   }

//   const swipe = (dir) => {
//     const cardsLeft = games.filter(person => !alreadyRemoved.includes(person.name))
//     if (cardsLeft.length) {
//       const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
//       const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
//       alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
//       childRefs[index].current.swipe(dir) // Swipe the card!
//     }
//   }
  
//   const navAddGames = () => {
//    history.push('/add-games')
//   }

//   return (
//     <div className='swiper' style={{overflow: 'hidden'}}>
//     {games.length
//     ?
//     <>
//       <div className='cardContainer'>
//         {games.map((game, index) =>
//           <TinderCard ref={childRefs[index]} className='swipe' key={game.name} onSwipe={(dir) => swiped(dir, game.name)} onCardLeftScreen={() => outOfFrame(game.name)}>
//             <div style={{ backgroundImage: 'url(' + game.url + ')' }} className='card'>
//               <h3>{game.name}</h3>
//             </div>
//           </TinderCard>
//         )}
//       </div>
//       <div className='buttons'>
//         <div onClick={() => swipe('left')}><FaIcons.FaThumbsDown size={50} color={'red'}/></div>
//         <div onClick={() => swipe('right')}><FaIcons.FaThumbsUp size={50} color={'green'}/></div>
//       </div>
//       {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe on a game or press a button to get started!</h2>}
//     </>
//     :
//     <div className='cardContainer'>
//       <TinderCard className='swipe'onSwipe={() => navAddGames()}>
//         <div className='card'>
//           <h1>You have run out of games to swipe on! Swipe on me in any direction to add more games to your list to start swiping again!</h1>
//         </div>
//       </TinderCard>  
//     </div>
//     }
//     </div>
//   )
// }

// export default SwipeStack