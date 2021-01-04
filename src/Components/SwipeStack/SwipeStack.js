import React, { useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import TinderCard from 'react-tinder-card'
import * as FaIcons from 'react-icons/fa'
import AppContext from '../../Context/AppContext'
import catan from '../../img/catan.jpg'
import bsg from '../../img/bsg.jpg'
import jenga from '../../img/jenga.jpg'
import morels from '../../img/morels.jpg'

const db = [
  {
    name: 'Catan',
    url: catan,
  },
  {
    name: 'Battlestar Galactica',
    url: bsg
  },
  {
    name: 'Jenga',
    url: jenga
  },
  {
    name: 'Morels',
    url: morels
  }
]

const alreadyRemoved = []
let gamesState = db // This fixes issues with updating games state forcing it to use the current state and not the state that was active when the card was created.

function SwipeStack () {
  const context = React.createContext({AppContext})
  console.log(context.games)
  const history = useHistory()
  const [games, setgames] = useState(db)
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  } 

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    gamesState = gamesState.filter(game => game.name !== name)
    setgames(gamesState)
  }

  const swipe = (dir) => {
    const cardsLeft = games.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }
  
  const navAddGames = () => {
   history.push('/add-games')
  }

  return (
    <div className="swiper" style={{overflow: 'hidden'}}>
    {games.length
    ?
    <>
      <div className='cardContainer'>
        {games.map((game, index) =>
          <TinderCard ref={childRefs[index]} className='swipe' key={game.name} onSwipe={(dir) => swiped(dir, game.name)} onCardLeftScreen={() => outOfFrame(game.name)}>
            <div style={{ backgroundImage: 'url(' + game.url + ')' }} className='card'>
              <h3>{game.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      <div className='buttons'>
        <div onClick={() => swipe('left')}><FaIcons.FaThumbsDown size={50} color={"red"}/></div>
        <div onClick={() => swipe('right')}><FaIcons.FaThumbsUp size={50} color={"green"}/></div>
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe on a game or press a button to get started!</h2>}
    </>
    :
    <div className='cardContainer'>
      <TinderCard className='swipe'onSwipe={() => navAddGames()}>
        <div className='card'>
          <h1>You have run out of games to swipe on! Swipe on me in any direction to add more games to your list to start swiping again!</h1>
        </div>
      </TinderCard>  
    </div>
    }
    </div>
  )
}

export default SwipeStack
