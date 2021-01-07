import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import AppContext from '../../Context/AppContext'

export default class UserDash extends React.Component {
    static contextType = AppContext

    addBGANameForm = 
    <div className="info">
        <h3>Add BGA Game Lists to Your Account</h3>
        <p>You can add any BGA game list to your account. You do not have to own the account or list.</p>
        <p>There are two ways to add lists to your account: Either enter the BGA account name that owns the list then select the list, or enter the list ID. List ID's can be found in the url of the list.</p>
        <form className="user-form" onSubmit={(e) => this.context.getBGAUserData(e)}>
            <label htmlFor="name">Your Board Game Atlas Account Name:</label>
            <br/>
            <input type="text" name="name" required onChange={e => this.context.setBGAName(e.target.value)}/>
            <br/>
            <button type="submit">Add BGA to my Account </button>
            <p>This is not permanent. You can change the BGA</p>
        </form>
    </div>


    render() {
        const userDash =
        this.context.isAuthenticated
        ?
        <div>
            {this.addBGANameForm}
        </div>
        :
        <Redirect to="/login"/>


        return(
            <>
            {userDash}
            </>
        )
    }
}