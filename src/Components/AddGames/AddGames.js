import React from 'react'

export default class AddGames extends React.Component {
    render () {
        return (
            <div className="addGames">
                Add games to your group:
                <input type="radio" id="Monopoly" name="gameName" value="Monopoly"/>
                <label for="Monopoly">Monopoly</label>
                <br/>
                <input type="radio" id="Battleship" name="gameName" value="Battleship"/>
                <label for="Battleship">Battleship</label>
                <br/>
                <input type="radio" id="Sorry!" name="gameName" value="Sorry!"/>
                <label for="Sorry!">Sorry!</label>
                <br/>
                <button onClick={() => alert('Game added.')}>Submit</button>
            </div>
        )
    }
}