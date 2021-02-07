import React from 'react'
import AppContext from '../../Context/AppContext'

export default class AddGames extends React.Component {
    static contextType = AppContext

    async componentDidMount() {
        this.context.checkAuth()
    }

    addBGANameForm = 
    <div className="info">
        <h3>Add BGA List to Your Account</h3>
        <p>You can add any BGA list to your account. You do not have to own the list. Once you have lists added to your account, you can add the list to a group. Only the first 100 game of a list will be recorded. This is a limitation of the BGA API. List ID's can be found in the url of the list between the username and list name, as seen here: <br/> https://www.boardgameatlas.com/u/get_it_to_the_table<span className="url">/YxP47UnvdB</span>/owned</p>

        <p>Try some of these lists:</p>
        <ul>
            <li key="first example">PEPG0q0gSq - large list of over 200 games</li>
        </ul>

        <form className="user-form" onSubmit={(e) => this.context.getBGAList(e)}>
            <label htmlFor="id">Board Game Atlas List ID:</label>
            <br/>
            <input type="text" name="id" required onChange={e => this.context.setBGAListID(e.target.value)}/>
            <br/>
            <label htmlFor="list_name">Name your List:</label>
            <br/>
            <input type="text" name="list_name" required onChange={e => this.context.setBGAListName(e.target.value)}/>
            <br/>
            <button type="submit">Get BGA List</button>
            <footer>The BGA server is slow at times - please wait until you receive an alert before leaving the page! The larger the list, the longer the response will take.</footer>
        </form>
    </div>


    render() {

        return(
            <div className="user-dash">
                {this.addBGANameForm}
            </div>
         )
    }
}