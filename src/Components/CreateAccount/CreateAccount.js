import React from 'react'
import { Redirect } from 'react-router-dom'
import AppContext from '../../Context/AppContext'

export default class CreateAccount extends React.Component {
    static contextType = AppContext
    render() {


        const createAccount = 
        this.context.isAuthenticated 
        ? 
        <Redirect to="/"/>
        :
        <>
        <h3>Create Account</h3>
        <form className="user-form" onSubmit={(e) => this.context.createAccount(e)}>
            <label htmlFor="name">Name:</label>
            <br/>
            <input type="text" name="name" required onChange={e => this.context.setName(e.target.value)}/>
            <br/>
            <label htmlFor="email">E-mail Address:</label>
            <br/>
            <input type="email" name="email" required onChange={e => this.context.setEmail(e.target.value)}/>
            <br/>
            <label htmlFor="password">Password:</label>
            <br/>
            <input type="password" name="password" required onChange={e => this.context.setPassword(e.target.value)}/>
            <br/>
            <button type="submit">Create Account</button>
        </form>
        </>


        return(
            <div>
                {createAccount}
            </div>
        )
    }
}